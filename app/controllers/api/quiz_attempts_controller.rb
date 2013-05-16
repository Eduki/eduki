class Api::QuizAttemptsController < Api::ApiController

  before_filter :get_quiz_attempt_or_404, :only => [:show]
  before_filter :get_quiz_or_404, :only => [:index, :create]
  before_filter :get_user_or_404, :only => [:index, :create]

  api :GET, '/quiz_attempts/:id', 'Retrieve a Quiz Attempt'
  param :id, Fixnum, :required => true
  def show
    render :json => @quiz_attempt
  end

  # TODO
  # api :GET, '/enrollments/:enrollment_id/'
  def index

  end

  # TODO This NEEDS TO CHANGE to use enrollments
  # api :POST '/enrollments/:enrollment_id/quiz_attempts', "Submit a Quiz Attempt"
  api :POST, '/quizzes/:quiz_id/quiz_attempts', "Submit a Quiz Attempt"
  param :quiz_id, Fixnum, :required => true
  param :user_id, Fixnum, :required => true
  param :problem_attempts, Array, :required => true
  def create
    # TODO Error handling
    @quiz_attempt = QuizAttempt.new
    @quiz_attempt.quiz = @quiz
    @quiz_attempt.user_id = -1 # TODO
    @quiz_attempt.problem_attempts = []
    problems = @quiz.problems

    problem_hashes = params[:problem_attempts]
    problem_hashes.each do |problem_hash|
      problem_attempt = ProblemAttempt.create_from_hash(problem_hash)
      problem_attempt.quiz_attempt = @quiz_attempt
      problem_attempt.problem = problems.shift
      @quiz_attempt << problem_attempt
    end
    @quiz_attempt.save
    # error if still are problems left
    render :json => @quiz_attempt
  end


private
  def get_quiz_attempt_or_404
    super(params[:id])
  end
end
