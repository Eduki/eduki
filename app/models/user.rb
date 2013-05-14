# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  email      :string		not null, unique
#  password   :string		only valid when user auth required
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class User < ActiveRecord::Base
  attr_accessible :email

  validates_presence_of :email
  validates_uniqueness_of :email

  # For user not found
  def self.missing_user(id)
    {
      :error => "Resource not found",
      :message => "Could not find User with ID=#{id}"
    }
  end
end
