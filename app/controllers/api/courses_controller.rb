# A controller to handle Courses endpoints
#
# David Mah
class Api::CoursesController < Api::ApiController

  # For all methods, assume that
  # @course and has been retrieved if applicable
  before_filter :get_course_or_404, :only => [:show, :update]

  resource_description do
    description <<-EOS
    A course has the following fields
    * id:integer
    * title:string
    EOS
  end

  api :GET, '/courses/:id', "Retrieve a course"
  param :id, Fixnum, :required => true
  def show
    render :json => @course
  end

  api :GET, '/courses', "Retrieve a list of courses"
  def index
    render :json => Course.all
  end

  api :POST, '/courses', "Create a course"
  param :title, String, :required => true
  def create
    if params[:title].nil?
      render :json => error_object, :status => 400
    else
      @course = Course.new
      @course.title = params[:title]
      @course.save
      render :json => @course
    end
  end

  api :PUT, '/courses/:id', "Update a course"
  param :id,    Fixnum, :required => true
  param :title, String
  def update
    @course.title = params[:title] if not params[:title].nil?
    @course.save
    render :json => @course
  end

private
  def get_course_or_404
    super(params[:id])
  end

end
