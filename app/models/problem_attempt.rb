# == Schema Information
#
# Table name: problem_attempts
#
#  id              :integer          not null, primary key
#  quiz_attempt_id :integer
#  problem_id      :integer
#  answer          :string(255)
#  correct         :boolean
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class ProblemAttempt < ActiveRecord::Base
  attr_accessible :quiz_attempt_id, :quiz_attempt, :problem_id, :problem,
                  :answer, :correct
  belongs_to :quiz_attempt
end
