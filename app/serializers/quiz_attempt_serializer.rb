class QuizAttemptSerializer < ActiveModel::Serializer
  attributes :id
  attributes :quiz_id
  attributes :enrollment_id
  has_many :problem_attempts
end
