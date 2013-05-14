# Tests for the Quiz Model
# This should fill the test driven development requirement
# David Mah
require 'spec_helper'

describe Quiz do
  before(:each) do
    # Create a course to host this quiz
    @course = Course.new
    @course.title = 'course title'
    @course.save

    # Create a quiz that tests can use
    @quiz = Quiz.new
    @quiz.title = "quiz title"
    @quiz.course = @course
    @quiz.save

    # Make some problems to be hosted by the quiz
    @problems = []
    5.times do |t|
      @problem = Problem.new
      @problem.question = "problem#{t} question"
      @problem.answer = "problem#{t} answer"
      @problem.quiz = @quiz
      @problem.save
      @problems << @problem
    end
  end

  it "should have all fields persist after saving" do
    id = @quiz.id
    @quiz = Quiz.find_by_id(id)
    @quiz.title.should == "quiz title"
    @quiz.course.should == @course
    @quiz.problems.should == @problems
  end

  it "should disallow saving a quiz with no title" do
    @new_quiz = Quiz.new
    # @new_quiz.title = "new quiz title"
    @new_quiz.course = @course
    @new_quiz.save.should == nil
  end

  it "should disallow saving a quiz with no course" do
    @new_quiz = Quiz.new
    @new_quiz.title = "new quiz title"
    # @new_quiz.course = @course
    @new_quiz.save.should == nil
  end
end
