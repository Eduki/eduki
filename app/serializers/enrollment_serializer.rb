class EnrollmentSerializer < ActiveModel::Serializer
  attributes :id
  attributes :course_id
  attributes :user_id
end
