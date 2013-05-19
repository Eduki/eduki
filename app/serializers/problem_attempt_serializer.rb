class ProblemAttemptSerializer < ActiveModel::Serializer
  attributes :id
  attributes :quiz_attempt_id
  attributes :problem_id
  attributes :answer
  attributes :correct
end
