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

# A queston is a block of text that should be presented to a user
# An answer is an exact string that needs to be sent for the problem
# in order to be confirmed as a correct answer

class Problem < ActiveRecord::Base
  attr_accessible :question, :answer, :quiz, :quiz_id
  belongs_to :quiz

  # Given a HashWithIndifferentAccess containing :question and :answer
  # Return a Problem object. Does not save the record to the database
  def self.create_from_hash(hash)
    hash = HashWithIndifferentAccess.new(hash)
    return nil if (hash[:question].nil? or hash[:answer].nil?)
    problem = Problem.new
    problem.question = hash[:question]
    problem.answer   = hash[:answer]
    return problem
  end

  def self.missing_instance(id)
    {
      :error => "Resource not found",
      :message => "Could not find Problem with ID=#{id}"
    }
  end
end
