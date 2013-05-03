class Api::LessonsController < ApplicationController

  api :GET, '/courses/:course_id/lessons/:id', "Retrieve a lesson"
  param :course_id, :number, :required => true
  param :id, :number, :required => true
  example %Q[{'id':2,'title':'Fighting wild bears','course_id':1}]
  def show
    course = Course.find_by_id(params[:course_id])
    lesson = Lesson.find_by_id(params[:id])
    if course.nil?
      render :json => Course.missing_course(params[:course_id])
    elsif lesson.nil?
      render :json => Lesson.missing_lesson(params[:id])
    elsif lesson.course != course
      err = error_object
      err[:message] =
        "Lesson of ID=#{lesson.id} not a member of Course of ID=#{course.id}"
      render :json => err
    else
      render :json => lesson
    end
  end

  api :GET, '/courses/:course_id/lessons', "Retrieve all of a course's lessons"
  param :course_id, :number, :required => true
  example <<-EOF
            [
              {'id':2,'title':'Fighting wild bears','course_id':1},
              {'id':4,'title':'Eating wild bears','course_id':1}
            ]
            EOF
  def index
    course = Course.find_by_id(params[:course_id])
    if course.nil?
      render :json => Course.missing_course(params[:course_id])
    else
      render :json => Lesson.find_all_by_course_id(params[:course_id])
    end
  end

  api :POST, '/courses/:course_id/lessons', "Create a lesson"
  param :course_id, :number, :required => true
  param :title, String, :required => true
  param :body, String, :required => false
  def create
    course = Course.find_by_id(params[:course_id])
    if course.nil?
      render :json => Course.missing_course(params[:course_id])
    else
      lesson = Lesson.new
      lesson.title = params[:title]
      lesson.body  = params[:body]
      lesson.course_id = params[:course_id]
      lesson.save
      render :json => lesson
    end
  end

  api :POST, '/courses/:course_id/lessons', "Update a lesson"
  param :course_id, :number, :required => true
  param :id, :number, :required => true
  param :title, String, :required => false
  param :body, String, :required => false
  # example %Q[
  def update
    course = Course.find_by_id(params[:course_id])
    lesson = Lesson.find(params[:id])
    if course.nil?
      render :json => Course.missing_course(params[:course_id])
    elsif lesson.nil?
      render :json => Lesson.missing_lesson(params[:id])
    elsif lesson.course != course
      err = error_object
      err[:message] =
        "Lesson of ID=#{lesson.id} not a member of Course of ID=#{course.id}"
      render :json => err
    else
      lesson.title = params[:title]
      lesson.body  = params[:body]
      lesson.save
      render :json => lesson
    end
  end

end
