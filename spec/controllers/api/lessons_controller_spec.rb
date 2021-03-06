# A test suite for the Lessons endpoints of the API
# This is a white box test
# David Mah

require 'spec_helper'

describe Api::LessonsController do

  # Set up some lesson examples to be used by the tests
  before(:each) do
    add_fixtures()
  end

  describe "GET #show" do

    it "returns a Lesson with a HTTP 200 status code" do
      get :show, :id => @lesson.id
      assert_response :success
      body = JSON.parse(response.body)
      body['id'].should        == @lesson.id
      body['title'].should     == @lesson.title
      body['body'].should      == @lesson.body
      # Exact processed body might vary on markdown config. It is enough
      # here to ensure that the value is set
      body['body_markdown'].should_not be_nil
      body['course_id'].should == @lesson.course_id
    end

    it "returns 404 if id not found" do
      get :show, :id => -1
      check_failure(404)
    end
  end


  describe "GET #index" do
    it "retrieves no lessons of there are none" do
      get :index, :course_id => @course_three.id
      assert_response :success
      body = JSON.parse(response.body)
      body.size.should == 0
    end

    it "retrieves all lessons for a course" do
      get :index, :course_id => @course.id
      assert_response :success
      body = JSON.parse(response.body)
      body[0]['title'].should == "lesson_one title"
      body[1]['title'].should == "lesson_two title"
      body.size.should == 2
    end

    it "returns 404 if course not found" do
      get :index, :course_id => -1
      check_failure(404)
    end
  end

  describe "POST #create" do
    it "creates 1 lesson" do
      previous_size = Lesson.count
      post :create, :course_id => @course.id,
        :title => "lesson_four title", :body => "lesson_four body"
      assert_response :success

      # Response should have updated version
      body = JSON.parse(response.body)
      body['id'].should_not == @lesson.id
      body['id'].should_not == @lesson_two.id
      body['id'].should_not == @lesson_three.id
      body['title'].should == "lesson_four title"
      body['body'].should == "lesson_four body"

      # DB Should be updated
      Lesson.count.should == (previous_size + 1)
      Lesson.last.title.should == "lesson_four title"
      Lesson.last.body.should == "lesson_four body"
    end

    it "returns 404 if course not found" do
      get :index, :course_id => -1
      check_failure(404)
    end

    it "returns 400 if title missing" do
      post :create, :course_id => @course.id, :body => "lesson_four body"
      check_failure(400)
    end

    it "returns 400 if body missing" do
      post :create, :course_id => @course.id, :title => "lesson_four title"
      check_failure(400)
    end
  end

  describe "PUT #update" do
    it "updates 1 Lesson" do
      put :update, :id => @lesson.id,
        :title => "lesson title change", :body => "lesson body change"

      # Response should have updated version
      assert_response :success
      body = JSON.parse(response.body)
      body['id'].should == @lesson.id
      body['title'].should == "lesson title change"
      body['body'].should == "lesson body change"

      # DB Should be updated
      Lesson.find(@lesson.id).title.should == "lesson title change"
      Lesson.find(@lesson.id).body.should == "lesson body change"
    end

    it "updates nothing if nothing included" do
      put :update, :id => @lesson.id
      assert_response :success

      # Response should have updated version
      body = JSON.parse(response.body)
      body['title'].should == @lesson.title
      body['body'].should == @lesson.body

      # DB Should be updated
      Lesson.find(@lesson.id).title.should == @lesson.title
      Lesson.find(@lesson.id).body.should == @lesson.body
    end

    it "returns 404 if id not found" do
      put :update, :id => -1, :title => "course title change"
      check_failure(404)
    end
  end

  describe "DELETE #destroy" do
    it "deletes 1 lesson" do
      delete :destroy, :id => @lesson.id
      assert_response :success
      JSON.parse(response.body)['success'].should be_true
      Lesson.find_by_id(@lesson.id).should be_nil
    end

    it "returns 404 if lesson not found" do
      delete :destroy, :id => -1
      check_failure(404)
    end
  end
end

