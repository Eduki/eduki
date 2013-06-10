class Api::ProblemsController < Api::ApiController

  # For all methods, assume that
  # @quiz and @problem have been retrieved if applicable
  before_filter :get_quiz_or_404, :only => [:index, :create]
  before_filter :get_problem_or_404, :only => [:show, :update, :destroy]

  resource_description do
    description <<-EOS
    ==Long description
    A problem has the following fields:
    * id:integer
    * quiz_id:integer
    * question:string
    * answer:string

    A queston is a block of text that should be presented to a user

    An answer is an exact string that needs to be sent for the problem
    in order to be confirmed as a correct answer
    ===JSON Example
      {
        "id":1,
        "quiz_id":1,
        "question":"Example Question 1",
        "answer":"A"
      }
    EOS
  end

  api :GET, '/problems/:id', "Retrieve a Problem"
  param :id, Fixnum, :required => true
  def show
    render :json => @problem
  end

  api :GET, '/quizzes/:quiz_id/problems', "Retrieve a list of problems"
  param :quiz_id, Fixnum, :required => true
  def index
    render :json => @quiz.problems
  end

  api :POST, '/quizzes/:quiz_id/problems', "Create a problem"
  param :quiz_id, Fixnum, :required => true
  param :question, String, :required => true
  param :answer, String, :required => true
  def create
    if (params[:question].nil? or params[:answer].nil?)
      err = error_object
      err[:message] = "either question or answer missing"
      render :json => error_object, :status => 400
    else
      @problem = Problem.new
      @problem.quiz = @quiz
      @problem.question = params[:question]
      @problem.answer   = params[:answer]
      @problem.save
      render :json => @problem
    end
  end

  api :PUT, '/problems/:id', "Update a problem"
  param :id, Fixnum, :required => true
  param :quiz_id, Fixnum
  param :question, String
  param :answer, String
  def update
    @problem.question = params[:question] if not params[:question].nil?
    @problem.answer   = params[:answer] if not params[:answer].nil?
    @problem.save
    render :json => @problem
  end

  api :DELETE, '/problems/:id', "Delete a problem"
  param :id,    Fixnum, :required => true
  def destroy
    @problem.destroy
    render :json => success_object
  end

private
  def get_quiz_or_404
    super(params[:quiz_id])
  end

  def get_problem_or_404
    super(params[:id])
  end
end
