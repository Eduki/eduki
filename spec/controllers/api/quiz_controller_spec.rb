# Tests for the Quiz Managing Endpoints on the API
# This should fill the test driven development requirement
# David Mah
require 'spec_helper'

describe Api::QuizController do

  # Set up some quiz examples to be used by the tests
  before(:each) do
    @course = Course.new
    @course.title = "course example"
    @course.save

    @course_two = Course.new
    @course_two.title = "course_two example"
    @course_two.save

    @courses = [@course, @course_two]

    @quiz = Quiz.new
    @quiz.title = "quiz_one title"
    @quiz.course = @course
    @quiz.save

    @quiz_two = Quiz.new
    @quiz_two.title = "quiz_two title"
    @quiz_two.course = @course
    @quiz_two.save

    @quiz_three = Quiz.new
    @quiz_three.title = "quiz_three title"
    @quiz_three.course = @course_two
    @quiz_three.save
  end

  describe "GET #show" do

    it "returns a Quiz with a HTTP 200 status code" do
      get :show, :course_id => @course.id, :id => @quiz.id
      assert_response :success
      body = JSON.parse(response.body)
      body['id'].should        == @quiz.id
      body['title'].should     == @quiz.title
      body['course_id'].should == @quiz.course_id
    end

    it "returns 404 if course_id not found" do
      get :show, :course_id => -1, :id => @quiz.id
      check_failure(404)
    end

    it "returns 404 if id not found" do
      get :show, :course_id => @course.id, :id => -1
      check_failure(404)
    end

    it "returns 404 if course_id and id don't correspond" do
      get :show, :course_id => @course.id, :id => @quiz_three.id
      check_failure(404)
    end
  end

  describe "GET #index" do
    it "retrieves all quizzes for a course" do
      get :index, :course_id => @course.id
      assert_response :success
      body = JSON.parse(response.body)
      body[0]['title'].should == "quiz_one title"
      body[1]['title'].should == "quiz_two title"
      body.size.should == 2
    end

    it "returns 404 if course_id not found" do
      get :index, :course_id => -1
      check_failure(404)
    end
  end

  describe "POST #create" do
    it "creates 1 quiz" do
      previous_size = Quiz.count
      post :create, :course_id => @course.id,
        :title => "quiz_four title"
      assert_response :success
      body = JSON.parse(response.body)
      body['id'].should_not == @quiz.id
      body['id'].should_not == @quiz_two.id
      body['id'].should_not == @quiz_three.id
      body['title'].should == "quiz_four title"
      Quiz.count.should == (previous_size + 1)
      Quiz.last.title.should == "quiz_four title"
    end

    it "returns 404 if course_id not found" do
      post :create, :course_id => -1, :title => "this course has a bad course_id"
      check_failure(404)
    end

    it "returns 400 if title missing" do
      post :create, :course_id => @course.id
      check_failure(400)
    end
  end

  describe "PUT #update" do
    it "updates 1 Quiz" do
      put :update, :course_id => @course.id, :id => @quiz.id,
        :title => "quiz title change"
      assert_response :success
      body = JSON.parse(response.body)
      body['id'].should == @quiz.id
      body['title'].should == "quiz title change"
      Quiz.find(@quiz.id).title.should == "quiz title change"
    end

    it "updates nothing if nothing included" do
      put :update, :course_id => @course.id, :id => @quiz.id
      assert_response :success
      body = JSON.parse(response.body)
      body['title'].should == @quiz.title
      Quiz.find(@quiz.id).title.should == @quiz.title
    end

    it "returns 404 if course_id not found" do
      put :update, :course_id => -1, :id => @quiz.id, :title => "course title change"
      check_failure(404)
    end

    it "returns 404 if id not found" do
      put :update, :course_id => @course.id, :id => -1, :title => "course title change"
      check_failure(404)
    end

    it "returns 404 if course_id and id don't correspond" do
      put :update, :course_id => @course.id, :id => @quiz_three.id, :title => "course title change"
      check_failure(404)
    end

  end
end
