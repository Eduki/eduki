class Api::CoursesController < ApplicationController
  def show
    # begin
    course = Course.find_by_id(params[:id])
    if course.nil?
      render :json => Course.missing_course(params[:id])
    else
      render :json => course
    end
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
    course = Course.find_by_id(params[:id])
    if course.nil?
      render :json => Course.missing_course(params[:id])
    else
      course.title = params[:title]
      course.save
      render :json => course
    end
  end

end
