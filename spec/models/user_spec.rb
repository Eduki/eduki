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

require 'spec_helper'

describe User do

  before(:each) do
    add_fixtures()
  end

  it "should be able to have many courses" do
    User.find_by_id(@user.id).courses.include?(@course).should be_true
    Course.find_by_id(@course.id).user.should == @user
  end

  it "should destroy owned courses if destroyed" do
    @user.destroy

    User.find_by_id(@user).should be_nil
    Course.find_by_id(@course.id).should be_nil
  end
end
