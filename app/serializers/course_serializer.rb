class CourseSerializer < ActiveModel::Serializer
  attributes :id
  attributes :title
  attributes :user_id
end
