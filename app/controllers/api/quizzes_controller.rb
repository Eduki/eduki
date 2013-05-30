class Api::QuizzesController < Api::ApiController

  # For all methods, assume that
  # @course and @quiz have been retrieved if applicable
  before_filter :get_course_or_404, :only => [:index, :create]
  before_filter :get_quiz_or_404,   :only => [:show, :update, :destroy]

  resource_description do
    description <<-EOS
    A quiz has the following fields
    * id:integer
    * course_id:integer
    * title:string
    * problems: List of Problems, where each problem is:
      {
      * id:integer
      * quiz_id:integer
      * question:string
      * answer:string
      }

    Note that problems will not be shown in an `index` of multiple quizzes.

    Including problems in a `create` or `update` call is optional.
    If you do, problem objects will be generated for you. Beware
    of filling in problems in update, for all old problems will be destroyed.
    EOS
  end

  api :GET, '/quizzes/:id', "Retrieve a quiz"
  param :id, Fixnum, :required => true
  def show
    render :json => @quiz
  end

  api :GET, '/courses/:course_id/quizzes', "Retrieve a list of quizzes (no problems)"
  param :course_id, Fixnum, :required => true
  def index
    render :json => Quiz.find_all_by_course_id(@course.id), :each_serializer => QuizListingSerializer
  end

  api :POST, '/courses/:course_id/quizzes', "Create a quiz"
  param :course_id, Fixnum, :required => true
  param :title, String, :required => true
  param :problems, Array, :desc => "A list of JSON objects of { question:string, answer:string }"
  def create
    if params[:title].nil?
      err = error_object
      err[:message] = "title missing"
      render :json => err, :status => 400
    else
      @quiz = Quiz.new
      @quiz.title = params[:title]
      @quiz.course = @course

      # If problems were included (they're optional), take each problem hash, create a problem object
      # Stuff all of these problem objects into the quiz
      new_problems = create_new_problems_list(params[:problems])
      return false if new_problems.nil?
      @quiz.problems = new_problems
      @quiz.save
      render :json => @quiz
    end
  end

  api :PUT, '/quizzes/:id', "Update a quiz"
  param :id,        Fixnum, :required => true
  param :course_id, Fixnum
  param :title,     String
  param :problems,  Array, :desc => "A list of JSON objects of { question:string, answer:string }"
  def update
    @quiz.title = params[:title] if not params[:title].nil?
    @quiz.course_id = params[:course_id] if not params[:course_id].nil?

    # If problems were included (they're optional), take each problem hash, create a problem object
    # Stuff all of these problem objects into the quiz
    if not params[:problems].nil?
      new_problems = create_new_problems_list(params[:problems])
      return false if new_problems.nil?

      # Destroy the old problems
      old_problems   = @quiz.problems
      old_problems.each { |problem| problem.destroy }

      @quiz.problems = new_problems
      new_problems.each { |problem| problem.save }
    end
    @quiz.save
    render :json => @quiz
  end

  api :DELETE, '/quizzes/:id', "Delete a quiz"
  param :id,    Fixnum, :required => true
  def destroy
    @quiz.destroy
    render :json => success_object
  end

private
  def get_course_or_404
    super(params[:course_id])
  end

  def get_quiz_or_404
    super(params[:id])
  end

  # Creates and returns a list of problem objects given the problems data
  # Problem objects are not saved to the database
  # Format of problems_data is a list of hashes, where each hash is
  # {'question':string, 'answer':string}
  # Returns nil if input is incorrectly formatted
  def create_new_problems_list(problem_hash_data)
    new_problems = []
    if not problem_hash_data.nil?

      # Parse the JSON if it has not already been parsed
      if problem_hash_data.instance_of? String
        problem_hashes = JSON.parse(problem_hash_data)
      else
        problem_hashes = problem_hash_data
      end
      problem_hashes.each do |problem_hash|
        problem = Problem.create_from_hash(problem_hash)
        problem.quiz = @quiz

        # Fail if a problem is invalidly formatted
        if problem.nil?
          err = error_object
          err[:message] = "A problem hash was invalid"
          render :json => err, :status => 400
          return nil
        end

        new_problems << problem
      end
    end
    return new_problems
  end
end
