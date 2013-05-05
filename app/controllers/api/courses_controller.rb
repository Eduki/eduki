class Api::CoursesController < ApplicationController
  def show
    # begin
    course = Course.find_by_id(params[:id])
    if course.nil?
      render :json => Course.missing_course(params[:id]), :status => 404
    else
      render :json => course
    end
  end

  def index
    render :json => Course.all
  end

  def create
    if params[:title].nil?
      render :json => error_object, :status => 400
    else
      new_course = Course.new
      new_course.title = params[:title]
      new_course.save
      render :json => new_course
    end
  end

  def update
    course = Course.find_by_id(params[:id])
    if course.nil?
      render :json => Course.missing_course(params[:id]), :status => 404
    else
      course.title = params[:title] if not params[:title].nil?
      course.save
      render :json => course
    end
  end

end
