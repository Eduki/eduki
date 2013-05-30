class UserSerializer < ActiveModel::Serializer
  attributes :id
  attributes :email
  attributes :first_name
  attributes :last_name
  attributes :background
end
