# == Schema Information
#
# Table name: courses
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  description :text
#

class Course < ActiveRecord::Base
  attr_accessible :title, :description, :lessons, :quizzes, :user, :user_id
  has_many :lessons
  has_many :quizzes
  has_many :enrollments
  belongs_to :user

  # An object to return in the case that the given course is not found
  def self.missing_instance(id)
    {
      :error => "Resource not found",
      :message => "Could not find Course with ID=#{id}"
    }
  end
end
