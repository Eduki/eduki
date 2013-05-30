# A test suite for the Courses endpoints of the API
# This is a white box test
# David Mah

require 'spec_helper'

describe Api::CoursesController do
  before(:each) do
    @course = Course.new
    @course.title = "course example"
    @course.description = "course description"
    @course.save

    @course_two = Course.new
    @course_two.title = "course_two example"
    @course_two.save

    @courses = [@course, @course_two]
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
      body[0]['title'].should == "course example"
      body[1]['title'].should == "course_two example"
    end
  end

  describe "POST #create" do
    it "creates 1 Course" do
      previous_size = Course.count
      post :create, :title => "course_three example",
        :description => "new description"
      assert_response :success

      # Response should have proper version
      body = JSON.parse(response.body)
      body['title'].should == "course_three example"
      body['description'].should == "new description"

      @course.id.should_not == body['id']
      @course_two.id.should_not == body['id']

      # DB should be updated
      Course.count.should == (previous_size + 1)
    end

    it "returns 400 if title missing" do
      post :create
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

