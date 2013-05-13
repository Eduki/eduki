class Api::ApiController < ApplicationController

protected

  # Retrieves the course with the given id and assigns it to the
  # instance variable @course. Returns false and renders 404 if not found
  # Meant to be used in before_filters
  def get_course_or_404(id)
    @course = Course.find_by_id(id)
    if @course.nil?
      render :json => Course.missing_course(:id), :status => 404
      return false
    end
  end

  # Retrieves the lesson with the given id and assigns it to the
  # instance variable @lesson. Returns false and renders 404 if not found
  # Meant to be used in before_filters
  def get_lesson_or_404(id)
    @lesson = Lesson.find_by_id(id)
    if @lesson.nil?
      render :json => Lesson.missing_lesson(:id), :status => 404
      return false
    end
  end

  # A hash that is the base for any errors
  # All errors should have the :error key
  def error_object
    {:error => "Error encountered"}
  end
end
