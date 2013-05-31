# == Schema Information
#
# Table name: problems
#
#  id         :integer          not null, primary key
#  question   :string(255)      not null
#  answer     :string(255)      not null
#  quiz_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

# Tests for the Problem Model
# This should fill the test driven development requirement
# David Mah
require 'spec_helper'

describe Problem do
  before(:each) do
    add_fixtures()
  end

  it "should have all fields persist after saving" do
    id = @problem.id
    @problem = Problem.find_by_id(id)
    @problem.question.should == "problem_one question"
    @problem.answer.should == "problem_one answer"
    @problem.quiz.should == @quiz
  end

  it "should disallow saving a problem with no question field" do
    @new_problem = Problem.new
    # @new_problem.question = "new_problem question"
    @new_problem.answer = "new_problem answer"
    @new_problem.quiz = @quiz
    expect { @new_problem.save }.to raise_error
  end

  it "should disallow saving a problem with no answer field" do
    @new_problem = Problem.new
    @new_problem.question = "new_problem question"
    # @new_problem.answer = "new_problem answer"
    @new_problem.quiz = @quiz
    expect { @new_problem.save }.to raise_error
  end

  it "should disallow saving a problem with no quiz field" do
    @new_problem = Problem.new
    @new_problem.question = "new_problem question"
    @new_problem.answer = "new_problem answer"
    # @new_problem.quiz = @quiz
    expect { @new_problem.save }.to raise_error
  end

  describe "hash constructor" do
    it "should be able to build a proper Problem object from a hash" do
      previous_count = Problem.count
      problem = Problem.create_from_hash({:question => "question", :answer => "answer"})
      problem.quiz = @quiz
      problem.save

      # DB should be updated
      Problem.count.should == (previous_count + 1)
      Problem.last.question.should == "question"
      Problem.last.answer.should   == "answer"
    end

    it "should nil if question is missing" do
      Problem.create_from_hash({:answer => "answer"}).should be_nil
    end

    it "should nil if answer is missing" do
      Problem.create_from_hash({:question => "question"}).should be_nil
    end
  end
end
