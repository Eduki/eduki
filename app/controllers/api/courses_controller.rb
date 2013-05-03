class Api::CoursesController < ApplicationController
  def show
    render :json => Course.find(params[:id])
  end

  def index
    render :json => Course.all
  end

  def create
    new_course = Course.new
    new_course.title = params[:title]
    new_course.save
    render :json => new_course
  end

  def update
    course = Course.find(params[:id])
    course.title = params[:title]
    course.save
    render :json => course
  end
end
