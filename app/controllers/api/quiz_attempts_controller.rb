class Api::QuizAttemptsController < Api::ApiController

  resource_description do
    description <<-EOS
    A QuizAttempt has the following fields
    * id:integer
    * enrollment_id:integer
    * quiz_id:integer
    * problem_attempts: List of ProblemAttempts, where a ProblemAttempt is:
      {
      * id:integer
      * quiz_attempt_id:integer
      * problem_id:integer
      * answer:string
      * correct:boolean
      }
    EOS
  end

  # For all methods, assume that
  # @enrollment, @quiz_attempt, and @quiz have been retrieved if applicable
  before_filter :get_quiz_attempt_or_404, :only => [:show]
  before_filter :get_quiz_or_404, :only => [:create]
  before_filter :get_enrollment_or_404, :only => [:index, :create]

  api :GET, '/quiz_attempts/:id', 'Retrieve a Quiz Attempt'
  param :id, Fixnum, :required => true
  def show
    render :json => @quiz_attempt
  end

  api :GET, '/enrollments/:enrollment_id/quiz_attempts', "Retrieve all Quiz Attempts for the given enrollment"
  param :enrollment_id, Fixnum, :required => true
  def index
    render :json => @enrollment.quiz_attempts
  end

  api :POST, '/enrollments/:enrollment_id/quiz_attempts', "Submit a Quiz Attempt"
  param :enrollment_id, Fixnum, :required => true
  param :quiz_id, Fixnum, :required => true
  param :problem_attempts, Array, :required => true
  def create
    @quiz_attempt = QuizAttempt.new
    @quiz_attempt.quiz = @quiz
    @quiz_attempt.enrollment = @enrollment
    @quiz_attempt.problem_attempts = []
    problems = @quiz.problems

    # Generate a ProblemAttempt object and attach it to
    # @quiz_attempt for every entry in problem_attempts
    problem_hashes = params[:problem_attempts]
    problem_hashes.each do |problem_hash|
      # Return 400 if problem count mismatch
      if problems.size == 0
        render :json => error_object, :status => 400
        return false
      end
      problem_attempt = ProblemAttempt.create_from_hash(problem_hash)
      problem_attempt.quiz_attempt = @quiz_attempt
      problem_attempt.problem = problems.shift
      problem_attempt.correct =
        (problem_attempt.answer == problem_attempt.problem.answer)
      @quiz_attempt.problem_attempts << problem_attempt
    end

    # Return 400 if problem count mismatch
    if problems.size > 0
      render :json => error_object, :status => 400
      return false
    end

    @quiz_attempt.save
    render :json => @quiz_attempt
  end


private
  def get_quiz_attempt_or_404
    super(params[:id])
  end

  def get_enrollment_or_404
    super(params[:enrollment_id])
  end

  def get_quiz_or_404
    super(params[:quiz_id])
  end
end
