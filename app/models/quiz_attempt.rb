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
  attr_accessible :quiz_id, :quiz, :enrollment_id, :enrollment
  has_many :problem_attempts, :dependent => :destroy
  belongs_to :quiz
  belongs_to :enrollment

  # An object to return in the case that the given quiz attempt is not found
  def self.missing_instance(id)
    {
      :error => "Resource not found",
      :message => "Could not find Quiz Attempt with ID=#{id}"
    }
  end

  # Creates and returns a new QuizAttempt Object
  # Returns nil in the case of failure, probably bad input
  def self.construct(enrollment, quiz, problem_attempt_hashes)
    problems = quiz.problems.clone
    quiz_attempt = QuizAttempt.new({:enrollment => enrollment, :quiz => quiz})

    # Generate a ProblemAttempt object and attach it to
    # quiz_attempt for every entry in problem_attempt_hashes
    problem_attempt_hashes.each do |attempt_hash|
      problem_attempt = ProblemAttempt.create_from_hash(attempt_hash)
      problem_attempt.problem = problems.shift
      problem_attempt.correct =
        (problem_attempt.answer == problem_attempt.problem.answer)
      quiz_attempt.problem_attempts << problem_attempt
    end

    return quiz_attempt
  end
end
