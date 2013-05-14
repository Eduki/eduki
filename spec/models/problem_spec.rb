require 'spec_helper'

describe Problem do
  before(:each) do
    @quiz = Quiz.new
    @quiz.title = "quiz title"
    @quiz.save

    @problem = Problem.new
    @problem.question = "problem question"
    @problem.answer = "problem answer"
    @problem.quiz = @quiz
    @problem.save
  end

  it "should have all fields persist after saving" do
    id = @problem.id
    @problem = Problem.find_by_id(id)
    @problem.question.should == "problem question"
    @problem.answer.should == "problem answer"
    @problem.quiz.should == @quiz
  end

  it "should disallow saving a quiz with no question field" do
    @new_problem = Problem.new
    # @new_problem.question = "new_problem question"
    @new_problem.answer = "new_problem answer"
    @new_problem.quiz = @quiz
    @new_problem.save.should == nil
  end

  it "should disallow saving a quiz with no answer field" do
    @new_problem = Problem.new
    @new_problem.question = "new_problem question"
    # @new_problem.answer = "new_problem answer"
    @new_problem.quiz = @quiz
    @new_problem.save.should == nil
  end

  it "should disallow saving a quiz with no quiz field" do
    @new_problem = Problem.new
    @new_problem.question = "new_problem question"
    @new_problem.answer = "new_problem answer"
    # @new_problem.quiz = @quiz
    @new_problem.save.should == nil
  end
end
