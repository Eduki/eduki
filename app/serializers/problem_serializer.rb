class ProblemSerializer < ActiveModel::Serializer
  attributes :id
  attributes :quiz_id
  attributes :question
  attributes :question_markdown
  attributes :answer
end
