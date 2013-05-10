require 'spec_helper'



describe Api::CoursesController do
  before(:each) do
    @course = Course.new
    @course.title = "course example"
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
      @course.id.should ==  body['id']
      @course.title.should ==  body['title']
    end

    it "returns 404 if id not found" do
      get :show, :id => -1
      assert_response 404
      body = JSON.parse(response.body)
      body['error'].should_not == nil
    end
  end

  describe "GET #index" do
    it "shows all courses" do
      get :index
      assert_response :success
      body = JSON.parse(response.body)
      body[0]['title'].should == "course example"
      body[1]['title'].should == "course_two example"
    end
  end

  describe "POST #create" do
    it "creates 1 Course" do
      previous_size = Course.count
      post :create, :title => "course_three example"
      assert_response :success
      body = JSON.parse(response.body)
      @course.id.should_not == body['id']
      @course_two.id.should_not == body['id']
      Course.count.should == (previous_size + 1)
    end

    it "returns 400 if title missing" do
      post :create
      assert_response 400
      body = JSON.parse(response.body)
      body['error'].should_not == nil
    end
  end

  describe "PUT #update" do

    it "updates 1 Course" do
      put :update, :id => @course.id, :title => "course title change"
      assert_response :success
      body = JSON.parse(response.body)
      @course.id.should == body['id']
      body['title'].should == "course title change"
      Course.find(@course.id).title.should == "course title change"
    end

    it "updates nothing if nothing included" do
      put :update, :id => @course.id, :id => @course.id
      assert_response :success
      body = JSON.parse(response.body)
      body['title'].should == @course.title
      Course.find(@course.id).title.should == @course.title
    end

    it "returns 404 if id not found" do
      put :update, :id => -1, :title => "course title change"
      assert_response 404
      body = JSON.parse(response.body)
      body['error'].should_not == nil
    end

  end
end

