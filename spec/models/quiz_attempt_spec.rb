require 'spec_helper'

describe QuizAttempt do
  before(:each) do
    @course = Course.new
    @course.title = "course example"
    @course.save

    @quiz = Quiz.new
    @quiz.title = "quiz_one title"
    @quiz.course = @course
    @quiz.save

    @quiz_two = Quiz.new
    @quiz_two.title = "quiz_two title"
    @quiz_two.course = @course
    @quiz_two.save

    @problem = Problem.new
    @problem.question = "problem_one question"
    @problem.answer = "problem_one answer"
    @problem.quiz = @quiz
    @problem.save

    @problem_two = Problem.new
    @problem_two.question = "problem_two question"
    @problem_two.answer = "problem_two answer"
    @problem_two.quiz = @quiz
    @problem_two.save

    @problem_three = Problem.new
    @problem_three.question = "problem_three question"
    @problem_three.answer = "problem_three answer"
    @problem_three.quiz = @quiz_two
    @problem_three.save

    ############

    @user = User.new
    @user.email = "user email"
    @user.save

    @enrollment = Enrollment.new
    @enrollment.user = @user
    @enrollment.course = @course
    @enrollment.save

    @quiz_attempt = QuizAttempt.new
    @quiz_attempt.quiz = @quiz
    @quiz_attempt.enrollment = @enrollment
    @quiz_attempt.save

    @problem_attempt = ProblemAttempt.new
    @problem_attempt.quiz_attempt = @quiz_attempt
    @problem_attempt.problem = @problem
    @problem_attempt.answer = "problem_one answer"
    @problem_attempt.correct = true
    @problem_attempt.save
  end

  it "should delete all problem attempts upon quiz attempt delete" do
    @quiz_attempt.destroy
    QuizAttempt.find_by_id(@quiz_attempt.id).should be_nil
    ProblemAttempt.find_by_id(@problem_attempt.id).should be_nil
  end

  it "should delete the quiz attempt upon enrollment delete" do
    @enrollment.destroy
    QuizAttempt.find_by_id(@quiz_attempt.id).should be_nil
  end

  it "should delete the quiz attempt upon quiz delete" do
    @quiz.destroy
    QuizAttempt.find_by_id(@quiz_attempt.id).should be_nil
  end
end
