class QuizAttemptSerializer < ActiveModel::Serializer
  attributes :id
  attributes :quiz_id
  attributes :user_id
  attributes :problem_attempts
end
