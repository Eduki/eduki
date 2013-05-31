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

require 'spec_helper'

describe Enrollment do
  before(:each) do
    add_fixtures
  end

  it "should delete enrollment upon course delete" do
    @course.destroy
    Enrollment.find_by_id(@enrollment.id).should be_nil
  end

  it "should delete enrollment upon user delete" do
    @user.destroy
    Enrollment.find_by_id(@enrollment.id).should be_nil
  end
end
