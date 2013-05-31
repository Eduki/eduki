# A controller to handle Enrollments endpoints
#
# David Mah
class Api::EnrollmentsController < Api::ApiController

  resource_description do
    description <<-EOS
    An enrollment represents an association between a user and a course.
    A student can only take quizzes for courses that the student is
    enrolled in.

    An enrollment has the following fields
    * id:integer
    * user_id:integer
    * course_id:integer
    EOS
  end

  # For all methods, assume that
  # @enrollment has been retrieved if applicable
  before_filter :get_enrollment_or_404, :only => [:show, :destroy]
  before_filter :get_user_or_404, :only => [:index, :create]
  before_filter :get_course_or_404, :only => [:create]

  api :GET, '/enrollments/:id', "Retrieve an enrollment"
  param :id, Fixnum, :required => true
  def show
    render :json => @enrollment
  end

  api :GET, '/user/:user_id/enrollments', "Retrieve a list of enrollments for a user"
  param :user_id, Fixnum, :required => true
  def index
    render :json => @user.enrollments
  end

  api :POST, '/user/:user_id/enrollments', "Enroll a user in a course"
  param :user_id, Fixnum, :required => true
  param :course_id, Fixnum, :required => true
  def create
    @enrollment = Enrollment.new
    @enrollment.user = @user
    @enrollment.course = @course
    @enrollment.save
    render :json => @enrollment
  end

  api :DELETE, '/enrollments/:id', "Delete a enrollment"
  param :id,    Fixnum, :required => true
  def destroy
    @enrollment.destroy
    render :json => success_object
  end

private
  def get_enrollment_or_404
    super(params[:id])
  end

  def get_course_or_404
    super(params[:course_id])
  end

  def get_user_or_404
    super(params[:user_id])
  end

end
