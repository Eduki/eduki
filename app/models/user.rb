# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  email      :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class User < ActiveRecord::Base
  has_many :enrollments

  # An object to return in the case that the given user is not found
  def self.missing_instance(id)
    {
      :error => "Resource not found",
      :message => "Could not find User with ID=#{id}"
    }
  end
end
