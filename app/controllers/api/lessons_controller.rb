class Api::LessonsController < ApplicationController
  def show
    render :json => Lesson.find(params[:id])
  end

  def index
    render :json => Lesson.find_all_by_course_id(params[:course_id])
  end

  def create
    lesson = Lesson.new
    lesson.title = params[:title]
    lesson.body  = params[:body]
    lesson.course_id = params[:course_id]
    lesson.save
    render :json => lesson
  end

  def update
    lesson = Lesson.find(params[:id])
    lesson.title = params[:title]
    lesson.body  = params[:body]
    lesson.save
    render :json => lesson
  end
end
