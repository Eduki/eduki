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
    @course = get_or_404(Course, id)
  end

  # Retrieves the lesson with the given id and assigns it to the
  # instance variable @lesson. Returns false and renders 404 if not found
  # Meant to be used in before_filters
  def get_lesson_or_404(id)
    @lesson = get_or_404(Lesson, id)
  end

  # Retrieves the quiz with the given id and assigns it to the
  # instance variable @quiz. Returns false and renders 404 if not found
  # Meant to be used in before_filters
  def get_quiz_or_404(id)
    @quiz = get_or_404(Quiz, id)
  end

  # Retrieves the problem with the given id and assigns it to the
  # instance variable @problem. Returns false and renders 404 if not found
  # Meant to be used in before_filters
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

  def get_or_404(type, id)
    obj = type.find_by_id(id)
    if obj.nil?
      render :json => type.missing_instance(id), :status => 404
      return nil
    end
    return obj
  end

end
