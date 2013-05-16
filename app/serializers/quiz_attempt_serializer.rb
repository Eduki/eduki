class QuizAttemptSerializer < ActiveModel::Serializer
  attributes :id
  attributes :quiz_id
  attributes :enrollment_id
  attributes :problem_attempts
end
