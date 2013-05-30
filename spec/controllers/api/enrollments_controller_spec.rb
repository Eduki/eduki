# A test suite for the Courses endpoints of the API
# This is a white box test
# David Mah

require 'spec_helper'

describe Api::EnrollmentsController do
  before(:each) do
    add_fixtures()
  end

  describe "GET #show" do

    it "returns 1 Enrollment with a HTTP 200 status code" do
      get :show, :id => @enrollment.id
      assert_response :success
      body = JSON.parse(response.body)
      body['id'].should == @enrollment.id
      body['user_id'].should == @user.id
      body['course_id'].should == @course.id
    end

    it "returns 404 if id not found" do
      get :show, :id => -1
      check_failure(404)
    end
  end

  describe "GET #index" do
    it "shows all enrollments for a user" do
      get :index, :user_id => @user.id
      assert_response :success

      # Response should have proper version
      body = JSON.parse(response.body)
      body[0]['id'].should        == @enrollment.id
      body[0]['user_id'].should   == @user.id
      body[0]['course_id'].should == @course.id
    end
  end

  describe "POST #create" do
    it "creates 1 Enrollment" do
      previous_size = Enrollment.count
      post :create, :user_id => @user.id, :course_id => @course.id
      assert_response :success

      # Response should have proper version
      body = JSON.parse(response.body)
      body['user_id'].should   == @user.id
      body['course_id'].should == @course.id

      # DB should be updated
      Enrollment.count.should == (previous_size + 1)
    end

    it "returns 404 if user_id missing" do
      post :create, :user_id => -1, :course_id => @course.id
      check_failure(404)
    end

    it "returns 404 if course_id missing" do
      post :create, :user_id => @user.id, :course_id => -1
      check_failure(404)
    end
  end
end
