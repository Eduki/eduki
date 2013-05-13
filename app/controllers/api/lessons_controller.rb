class Api::LessonsController < ApplicationController

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
  param :id, Fixnum, :required => true
  def show
    course = Course.find_by_id(params[:course_id])
    lesson = Lesson.find_by_id(params[:id])
    if course.nil?
      render :json => Course.missing_course(params[:course_id]), :status => 404
    elsif lesson.nil?
      render :json => Lesson.missing_lesson(params[:id]), :status => 404
    elsif lesson.course != course
      err = error_object
      err[:message] =
        "Lesson of ID=#{lesson.id} not a member of Course of ID=#{course.id}"
      render :json => err, :status => 404
    else
      render :json => lesson
    end
  end

  api :GET, '/courses/:course_id/lessons', "Retrieve a list of lessons"
  param :course_id, Fixnum, :required => true
  def index
    course = Course.find_by_id(params[:course_id])
    if course.nil?
      render :json => Course.missing_course(params[:course_id]), :status => 404
    else
      render :json => Lesson.find_all_by_course_id(params[:course_id])
    end
  end

  api :POST, '/courses/:course_id/lessons', "Create a lesson"
  param :course_id , Fixnum, :required => true
  def create
    course = Course.find_by_id(params[:course_id])
    if course.nil?
      render :json => Course.missing_course(params[:course_id]), :status => 404
    elsif params[:title].nil? or params[:body].nil?
      err = error_object
      err[:message] = "Either :title or :body missing"
      render :json => err, :status => 400
    else
      lesson = Lesson.new
      lesson.title = params[:title]
      lesson.body  = params[:body]
      lesson.course_id = params[:course_id]
      lesson.save
      render :json => lesson
    end
  end

  api :PUT, '/courses/:course_id/lessons/:id', "Update a lesson"
  param :course_id , Fixnum, :required => true
  param :id , Fixnum, :required => true
  def update
    course = Course.find_by_id(params[:course_id])
    lesson = Lesson.find_by_id(params[:id])
    if course.nil?
      render :json => Course.missing_course(params[:course_id]), :status => 404
    elsif lesson.nil?
      render :json => Lesson.missing_lesson(params[:id]), :status => 404
    elsif lesson.course != course
      err = error_object
      err[:message] =
        "Lesson of ID=#{lesson.id} not a member of Course of ID=#{course.id}"
      render :json => err, :status => 404
    else
      lesson.title = params[:title] if not params[:title].nil?
      lesson.body  = params[:body] if not params[:body].nil?
      lesson.save
      render :json => lesson
    end
  end

end
