# A class for all Api controllers to inherit from. All shared code
# should go in here.
#
# David Mah
class Api::ApiController < ApplicationController

protected

  # Retrieves the course with the given id and assigns it to the
  # instance variable @course. Returns false and renders 404 if not found
  # Meant to be used in before_filters
  def get_course_or_404(id)
    @course = Course.find_by_id(id)
    if @course.nil?
      render :json => Course.missing_course(id), :status => 404
      return false
    end
  end

  # Retrieves the lesson with the given id and assigns it to the
  # instance variable @lesson. Returns false and renders 404 if not found
  # Meant to be used in before_filters
  def get_lesson_or_404(id)
    @lesson = Lesson.find_by_id(id)
    if @lesson.nil?
      render :json => Lesson.missing_lesson(id), :status => 404
      return false
    end
  end

  # A hash that is the base for any errors
  # All errors should have the :error key
  def error_object
    {:error => "Error encountered"}
  end

  # Finds a user with the specified id and assigns it to an instance
  # variable.  Returns false and renders a 404 error if a user
  # cannot be found with the specified id
  def get_user_or_404(id)
    @user = User.find_by_id(id)
    if @user.nil?
      render :json => User.missing_user(id), :status => 404
      return false
    end
  end

end
