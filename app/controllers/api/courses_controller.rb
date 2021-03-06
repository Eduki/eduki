# A controller to handle Courses endpoints
#
# David Mah
class Api::CoursesController < Api::ApiController

  # For all methods, assume that
  # @course and has been retrieved if applicable
  before_filter :get_course_or_404, :only => [:show, :update, :destroy]
  before_filter :get_user_or_404, :only => [:index_by_user, :create]

  resource_description do
    description <<-EOS
    ==Long description
    A course has the following fields
    * id:integer
    * title:string
    * description:string

    ===JSON Example
      {
        "id":1,
        "title":"Introduction to Competitive Security Competitions",
        "description":null,
        "user_id":1
      }
    EOS
  end

  api :GET, '/courses/:id', "Retrieve a course"
  param :id, Fixnum, :required => true
  def show
    render :json => @course
  end

  api :GET, '/courses', "Retrieve a list of courses"
  param :query, String, :required => false
  def index
    if params[:query].nil?
      render :json => Course.all
    else
      render :json => Course.where("title LIKE ?", '%'+params[:query]+'%')
    end
  end

  api :GET, '/users/:user_id/courses', "Retrieve a list of courses owned by the given user"
  param :user_id, Fixnum, :required => true
  def index_by_user
    render :json => Course.find_all_by_user_id(@user.id)
  end

  api :POST, '/api/users/:user_id/courses', "Create a course"
  param :user_id, Fixnum, :required => true
  param :title, String, :required => true
  param :description, String
  def create
    if params[:title].nil?
      render :json => error_object, :status => 400
    else
      @course = Course.new
      @course.title = params[:title]
      @course.description = params[:description]
      @course.user = @user
      @course.save
      render :json => @course
    end
  end

  api :PUT, '/courses/:id', "Update a course"
  param :id,    Fixnum, :required => true
  param :title, String
  param :description, String
  def update
    @course.title = params[:title] if not params[:title].nil?
    @course.description = params[:description] if not params[:description].nil?
    @course.save
    render :json => @course
  end

  api :DELETE, '/courses/:id', "Delete a course"
  param :id,    Fixnum, :required => true
  def destroy
    @course.destroy
    render :json => success_object
  end

private
  def get_course_or_404
    super(params[:id])
  end

  def get_user_or_404
    super(params[:user_id])
  end

end
