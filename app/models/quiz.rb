# == Schema Information
#
# Table name: quizzes
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  course_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Quiz < ActiveRecord::Base
  belongs_to :course
  has_many :problems
end
