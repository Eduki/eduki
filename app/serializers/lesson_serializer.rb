class LessonSerializer < ActiveModel::Serializer
  attributes :id
  attributes :title
  attributes :course_id
  attributes :body
  attributes :body_markdown
end
