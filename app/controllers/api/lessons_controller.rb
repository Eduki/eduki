# A controller to handle lessons endpoints on the API
#
# David Mah
class Api::LessonsController < Api::ApiController

  # For all methods, assume that
  # @course and @lesson have been retrieved if applicable
  before_filter :get_course_or_404, :only => [:index, :create]
  before_filter :get_lesson_or_404, :only => [:show, :update, :destroy]

  resource_description do
    description <<-EOS
    A lesson has the following fields
    * id:integer
    * course_id:integer
    * title:string
    * body:string
    EOS
  end

  api :GET, '/lessons/:id', "Retrieve a lesson"
  param :course_id, Fixnum, :required => true
  param :id,        Fixnum, :required => true
  def show
    render :json => @lesson
  end

  api :GET, '/courses/:course_id/lessons', "Retrieve a list of lessons"
  param :course_id, Fixnum, :required => true
  def index
    render :json => Lesson.find_all_by_course_id(@course.id)
  end

  api :POST, '/courses/:course_id/lessons', "Create a lesson"
  param :course_id, Fixnum, :required => true
  param :title    , String, :required => true
  param :body     , String, :required => true
  def create
    if params[:title].nil? or params[:body].nil?
      err = error_object
      err[:message] = "Either :title or :body missing"
      render :json => err, :status => 400
    else
      @lesson = Lesson.new
      @lesson.title     = params[:title]
      @lesson.body      = params[:body]
      @lesson.course_id = params[:course_id]
      @lesson.save
      render :json => @lesson
    end
  end

  api :PUT, '/lessons/:id', "Update a lesson"
  param :course_id, Fixnum, :required => true
  param :id       , Fixnum, :required => true
  param :title    , String
  param :body     , String
  def update
    @lesson.title = params[:title] if not params[:title].nil?
    @lesson.body  = params[:body] if not params[:body].nil?
    @lesson.save
    render :json => @lesson
  end

  api :DELETE, '/lessons/:id', "Delete a lesson"
  param :id,    Fixnum, :required => true
  def destroy
    @lesson.destroy
    render :json => success_object
  end

private
  def get_course_or_404
    super(params[:course_id])
  end

  def get_lesson_or_404
    super(params[:id])
  end
end
