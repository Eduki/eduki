# == Schema Information
#
# Table name: quizzes
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  course_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

# Tests for the Quiz Model
# This should fill the test driven development requirement
# David Mah
require 'spec_helper'

describe Quiz do
  before(:each) do
    add_fixtures()
  end

  it "should have all fields persist after saving" do
    # Make some problems to be hosted by the quiz
    @quiz.problems.each { |problem| problem.destroy }
    @quiz.save

    @problems = []
    5.times do |t|
      @problem = Problem.new
      @problem.question = "problem#{t} question"
      @problem.answer = "problem#{t} answer"
      @problem.quiz = @quiz
      @problem.save
      @problems << @problem
    end

    id = @quiz.id
    @quiz = Quiz.find_by_id(id)
    @quiz.title.should == "quiz_one title"
    @quiz.course.should == @course
    @quiz.problems.should == @problems
  end

  it "should disallow saving a quiz with no title" do
    @new_quiz = Quiz.new
    # @new_quiz.title = "new quiz title" Omitted
    @new_quiz.course = @course
    expect { @new_quiz.save }.to raise_error
  end

  it "should disallow saving a quiz with no course" do
    @new_quiz = Quiz.new
    @new_quiz.title = "new quiz title"
    # @new_quiz.course = @course Omitted
    expect { @new_quiz.save }.to raise_error
  end

  it "should delete all problem instance upon quiz delete" do
    @problems = @quiz.problems
    @quiz.destroy
    Quiz.find_by_id(@quiz.id).should be_nil
    @problems.each do |problem|
      Problem.find_by_id(problem.id).should be_nil
    end
  end

  it "should delete the quiz instance upon course delete" do
    @problems = @quiz.problems
    @course.destroy
    Quiz.find_by_id(@quiz.id).should be_nil
    @problems.each do |problem|
      Problem.find_by_id(problem.id).should be_nil
    end
  end
end
