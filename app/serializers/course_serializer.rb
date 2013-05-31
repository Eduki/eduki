class CourseSerializer < ActiveModel::Serializer
  attributes :id
  attributes :title
  attributes :description
  attributes :user_id
end
