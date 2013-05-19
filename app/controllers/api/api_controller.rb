# A class for all Api controllers to inherit from. All shared code
# should go in here.
#
# David Mah
class Api::ApiController < ApplicationController

protected

  # All of these getters retrieve their matching
  # instance and assigns it to a instance variable
  # of a corresponding name 
  def get_user_or_404(id)
    @user = get_or_404(User, id)
  end

  def get_course_or_404(id)
    @course = get_or_404(Course, id)
  end

  def get_enrollment_or_404(id)
    @enrollment = get_or_404(Enrollment, id)
  end

  def get_lesson_or_404(id)
    @lesson = get_or_404(Lesson, id)
  end

  def get_quiz_or_404(id)
    @quiz = get_or_404(Quiz, id)
  end

  def get_problem_or_404(id)
    @problem = get_or_404(Problem, id)
  end

  def get_quiz_attempt_or_404(id)
    @quiz_attempt = get_or_404(QuizAttempt, id)
  end

  # A hash that is the base for any errors
  # All errors should have the :error key
  def error_object
    {:error => "Error encountered"}
  end

private
  # Finds a member of `type` with the specified id returns it.
  # Returns nil and renders a 404 error if one cannot be found with the specified id
  # Meant to be used in before_filters
  def get_or_404(type, id)
    obj = type.find_by_id(id)
    if obj.nil?
      render :json => type.missing_instance(id), :status => 404
      return nil
    end
    return obj
  end

end
