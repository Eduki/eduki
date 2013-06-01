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
#  first_name    :string(255)
#  last_name     :string(255)
#  background    :text
#

class User < ActiveRecord::Base
  devise :database_authenticatable

  has_many :courses, :dependent => :destroy
  has_many :enrollments, :dependent => :destroy

  attr_accessible :email, :first_name, :last_name, :background

  validates_presence_of :email
  validates_uniqueness_of :email

  def self.missing_instance(id)
    {
      :error => "Resource not found",
      :message => "Could not find User with ID=#{id}"
    }
  end
end
