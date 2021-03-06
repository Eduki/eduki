# == Schema Information
#
# Table name: enrollments
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  course_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

# An enrollment represents an association between a user and a course.
# A student can only take quizzes for courses that the student is
# enrolled in.

class Enrollment < ActiveRecord::Base
  belongs_to :user
  belongs_to :course
  has_many :quiz_attempts, :dependent => :destroy
  attr_accessible :user_id, :user, :course_id, :course, :quiz_attempts

  # An object to return in the case that the given enrollment is not found
  def self.missing_instance(id)
    {
      :error => "Resource not found",
      :message => "Could not find Enrollment with ID=#{id}"
    }
  end
end
