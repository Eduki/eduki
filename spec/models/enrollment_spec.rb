require 'spec_helper'

describe Enrollment do
  before(:each) do
    @user = User.new
    @user.email = "user email"
    @user.save

    @course = Course.new
    @course.title = "course example"
    @course.save

    @enrollment = Enrollment.new
    @enrollment.user = @user
    @enrollment.course = @course
    @enrollment.save
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
