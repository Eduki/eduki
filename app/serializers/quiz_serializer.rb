class QuizSerializer < ActiveModel::Serializer
  attributes :id
  attributes :course_id
  attributes :title
  has_many :problems
end
