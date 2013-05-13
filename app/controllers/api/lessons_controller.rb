# A controller to handle lessons endpoints on the API
#
# David Mah
class Api::LessonsController < Api::ApiController

  # For all methods, assume that
  # @course and @lesson have been retrieved if applicable
  before_filter :get_course_or_404
  before_filter :get_lesson_or_404, :only => [:show, :update]
  before_filter :check_course_matches_lesson, :only => [:show, :update]

  resource_description do
    description <<-EOS
    A lesson has the following fields
    * id:integer
    * course_id:integer
    * title:string
    * body:string
    EOS
  end

  api :GET, '/courses/:course_id/lessons/:id', "Retrieve a lesson"
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

  api :PUT, '/courses/:course_id/lessons/:id', "Update a lesson"
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

private
  def get_course_or_404
    super(params[:course_id])
  end

  def get_lesson_or_404
    super(params[:id])
  end

  # Checks of @lesson is indeed a member of @course
  # Returns false and renders 404 if that isn't the case.
  # Meant to be used in before_filters
  def check_course_matches_lesson
    if @lesson.course != @course
      err = error_object
      err[:message] =
        "Lesson of ID=#{@lesson.id} not a member of Course of ID=#{@course.id}"
      render :json => err, :status => 404
      return false
    end
  end
end
