# A test suite for the Courses endpoints of the API
# This is a white box test
# David Mah

require 'spec_helper'

describe Api::CoursesController do
  before(:each) do
    add_fixtures()
  end

  describe "GET #show" do

    it "returns 1 Course with a HTTP 200 status code" do
      get :show, :id => @course.id
      assert_response :success
      body = JSON.parse(response.body)
      @course.id.should == body['id']
      @course.title.should == body['title']
      @course.description.should == body['description']
    end

    it "returns 404 if id not found" do
      get :show, :id => -1
      check_failure(404)
    end
  end

  describe "GET #index" do
    it "shows all courses" do
      get :index
      assert_response :success

      # Response should have proper version
      body = JSON.parse(response.body)
      body.size.should == 3
      body[0]['title'].should == "course example"
      body[1]['title'].should == "course_two example"
      body[2]['title'].should == "course_three example"
    end
  end

  describe "GET #index_by_user" do
    it "shows all courses owned by a specific user" do
      get :index_by_user, :user_id => @user_two.id
      assert_response :success

      # Response should have proper version
      body = JSON.parse(response.body)
      body[0]['title'].should == "course_three example"
      body.size.should == 1
    end
    it "returns 404 if user_id invalid" do
      get :index_by_user, :user_id => -1
      check_failure(404)
    end
  end

  describe "POST #create" do
    it "creates 1 Course" do
      previous_size = Course.count
      post :create, :user_id => @user.id, :title => "new_course example",
        :description => "new description"
      assert_response :success

      # Response should have proper version
      body = JSON.parse(response.body)
      body['id'].should_not == @course.id
      body['id'].should_not == @course_two.id
      body['user_id'].should == @user.id
      body['title'].should == "new_course example"
      body['description'].should == "new description"

      # DB should be updated
      Course.count.should == (previous_size + 1)
    end

    it "returns 404 if user_id invalid" do
      post :create, :user_id => -1, :title => "new_course example"
      check_failure(404)
    end

    # It's not possible to have a user_id_missing because it is constrained
    # by the URL, thus a test for that case isn't necessary

    it "returns 400 if title missing" do
      post :create, :user_id => @user.id
      check_failure(400)
    end
  end

  describe "PUT #update" do

    it "updates 1 Course" do
      put :update, :id => @course.id, :title => "course title change",
        :description => "new description"
      assert_response :success

      # Response should have proper version
      body = JSON.parse(response.body)
      @course.id.should == body['id']
      body['title'].should == "course title change"
      body['description'].should == "new description"

      # DB should be updated
      Course.find(@course.id).title.should == "course title change"
      Course.find(@course.id).description.should == "new description"
    end

    it "updates nothing if nothing included" do
      put :update, :id => @course.id, :id => @course.id

      # Response should have proper version
      assert_response :success
      body = JSON.parse(response.body)
      body['title'].should == @course.title

      # DB should be updated
      Course.find(@course.id).title.should == @course.title
    end

    it "returns 404 if id not found" do
      put :update, :id => -1, :title => "course title change"
      check_failure(404)
    end

  end
end

