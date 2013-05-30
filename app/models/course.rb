# == Schema Information
#
# Table name: courses
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Course < ActiveRecord::Base
  attr_accessible :title, :lessons, :quizzes
  has_many :lessons, :dependent => :destroy
  has_many :quizzes, :dependent => :destroy
  has_many :enrollments, :dependent => :destroy

  # An object to return in the case that the given course is not found
  def self.missing_instance(id)
    {
      :error => "Resource not found",
      :message => "Could not find Course with ID=#{id}"
    }
  end
end
