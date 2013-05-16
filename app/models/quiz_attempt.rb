# == Schema Information
#
# Table name: quiz_attempts
#
#  id         :integer          not null, primary key
#  quiz_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class QuizAttempt < ActiveRecord::Base
  attr_accessible :quiz_id, :quiz, :user_id, :user
  has_many :problem_attempts
  belongs_to :quiz
  belongs_to :enrollment

  # An object to return in the case that the given quiz attempt is not found
  def self.missing_instance(id)
    {
      :error => "Resource not found",
      :message => "Could not find Quiz Attempt with ID=#{id}"
    }
  end
end
