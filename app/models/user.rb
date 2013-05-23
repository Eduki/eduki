# == Schema Information
#
# Table name: users
#
#  id            :integer          not null, primary key
#  email         :string(255)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  password_hash :string(255)
#  password_salt :string(255)
#

class User < ActiveRecord::Base
  has_many :enrollments
  has_many :courses, :dependent => :destroy

  attr_accessible :email

  validates_presence_of :email
  validates_uniqueness_of :email

  def self.missing_instance(id)
    {
      :error => "Resource not found",
      :message => "Could not find User with ID=#{id}"
    }
  end
end
