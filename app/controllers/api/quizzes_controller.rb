class Api::QuizzesController < Api::ApiController

  # For all methods, assume that
  # @course and @quiz have been retrieved if applicable
  before_filter :get_course_or_404, :only => [:index, :create]
  before_filter :get_quiz_or_404,   :only => [:show, :update]

  resource_description do
    description <<-EOS
    A quiz has the following fields
    * id:integer
    * course_id:integer
    * title:string
    * problems:List of  {
      * question:string
      * answer:string
      }

    Note that problems will not be shown on an index
    EOS
  end

  api :GET, '/quizzes/:id'
  param :id, Fixnum, :required => true
  def show
    render :json => @quiz
  end

  api :GET, '/courses/:course_id/quizzes'
  param :course_id, Fixnum, :required => true
  def index
    render :json => Quiz.find_all_by_course_id(@course.id), :each_serializer => QuizListingSerializer
  end

  api :POST, '/courses/:course_id/quizzes'
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
      new_problems = []

      # If problems were included (they're optional), take each problem hash, create a problem object
      # Stuff all of these problem objects into the quiz
      if not params[:problems].nil?
        problem_hashes = params[:problems]
        problem_hashes.each do |problem_hash|
          problem = Problem.create_from_hash(problem_hash)
          problem.quiz = @quiz

          # Fail if a problem is invalidly formatted
          if problem.nil?
            err = error_object
            err[:message] = "A problem hash was invalid"
            render :json => err, :status => 400
            return false
          end

          new_problems << problem
        end
      end
      @quiz.problems = new_problems
      @quiz.save
      render :json => @quiz
    end
  end

  api :PUT, '/quizzes/:id'
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
      problem_hashes = params[:problems]
      new_problems = []
      problem_hashes.each do |problem_hash|
        problem = Problem.create_from_hash(problem_hash)
        problem.quiz = @quiz

        # Fail if a problem is invalidly formatted
        if problem.nil?
          err = error_object
          err[:message] = "A problem hash was invalid"
          render :json => err, :status => 400
          return false
        end

        new_problems << problem
      end

      old_problems   = @quiz.problems
      old_problems.each { |problem| problem.destroy }
      @quiz.problems = new_problems
      new_problems.each { |problem| problem.save }
    end
    @quiz.save
    render :json => @quiz
  end

private
  def get_course_or_404
    super(params[:course_id])
  end

  def get_quiz_or_404
    super(params[:id])
  end

end
