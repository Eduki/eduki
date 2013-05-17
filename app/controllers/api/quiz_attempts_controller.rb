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

    When creating a new QuizAttempt, the amount of entries in problem_attempts
    must be equivalent to the amount of problems on the quiz that is being
    referenced. Take note that when creating a new QuizAttempt, problem_attempts
    only need the "answer" field filled, and all others will be filled upon
    generation.
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

  api :GET, '/enrollments/:enrollment_id/quiz_attempts',
    "Retrieve all Quiz Attempts for the given enrollment"
  param :enrollment_id, Fixnum, :required => true
  def index
    render :json => @enrollment.quiz_attempts
  end

  api :POST, '/enrollments/:enrollment_id/quiz_attempts', "Submit a Quiz Attempt"
  param :enrollment_id, Fixnum, :required => true
  param :quiz_id, Fixnum, :required => true
  param :problem_attempts, Array, :required => true
  def create
    problem_attempt_hashes = JSON.parse(params[:problem_attempts])

    # Return 400 if problem count mismatch
    if @quiz.problems.size != problem_attempt_hashes.size
      err = error_object
      err['message'] = ("There were #{problem_attempt_hashes.size} given"
                        " answers to problems, but there were #{@quiz.problems.size}"
                        " many problems.")
      render :json => error_object, :status => 400
      return false
    end

    # Create the quiz attempt object
    @quiz_attempt = QuizAttempt.construct(@enrollment, @quiz, problem_attempt_hashes)

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
