# == Schema Information
#
# Table name: quiz_attempts
#
#  id            :integer          not null, primary key
#  quiz_id       :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  enrollment_id :integer          not null
#

require 'spec_helper'

describe QuizAttempt do
  before(:each) do
    add_fixtures()
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
