class Api::CoursesController < ApplicationController

  api :GET, '/courses/:id', "Retrieve a course"
  param :id, :number, :required => true
  example <<-EOF
            $ curl <eduki-website>/api/courses/1
            {"id":1,"title":"Bear Recipes 101"}
             EOF
  def show
    course = Course.find_by_id(params[:id])
    if course.nil?
      render :json => Course.missing_course(params[:id])
    else
      render :json => course
    end
  end

  api :GET, '/courses', "Retrieve all courses"
  def index
    render :json => Course.all
  end

  api :POST, '/courses', "Create a course"
  param :title, String, :required => true
  def create
    new_course = Course.new
    new_course.title = params[:title]
    new_course.save
    render :json => new_course
  end

  api :PUT, '/courses', "Update a course"
  param :id, :number, :required => true
  param :title, String, :required => false
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
