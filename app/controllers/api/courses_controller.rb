class Api::CoursesController < ApplicationController

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
    course = Course.find_by_id(params[:id])
    if course.nil?
      render :json => Course.missing_course(params[:id]), :status => 404
    else
      render :json => course
    end
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
      new_course = Course.new
      new_course.title = params[:title]
      new_course.save
      render :json => new_course
    end
  end

  api :PUT, '/courses/:id', "Update a course"
  param :id, Fixnum, :required => true
  param :title, String
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
