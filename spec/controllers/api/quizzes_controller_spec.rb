# Tests for the Quiz Managing Endpoints on the API
# This should fill the test driven development requirement
# David Mah
require 'spec_helper'

describe Api::QuizzesController do

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

    @problem = Problem.new
    @problem.question = "problem_one question"
    @problem.answer = "problem_one answer"
    @problem.quiz = @quiz
    @problem.save

    @problem_two = Problem.new
    @problem_two.question = "problem_two question"
    @problem_two.answer = "problem_two answer"
    @problem_two.quiz = @quiz
    @problem_two.save

    @problem_three = Problem.new
    @problem_three.question = "problem_three question"
    @problem_three.answer = "problem_three answer"
    @problem_three.quiz = @quiz_two
    @problem_three.save
  end

  describe "GET #show" do

    it "returns a Quiz with a HTTP 200 status code" do
      get :show, :id => @quiz.id
      assert_response :success
      body = JSON.parse(response.body)
      body['id'].should        == @quiz.id
      body['title'].should     == @quiz.title
      body['course_id'].should == @quiz.course_id
    end

    it "includes nested problems" do
      get :show, :id => @quiz.id
      assert_response :success
      body = JSON.parse(response.body)
      problems = body['problems']
      problems.size.should == 2
      problems[0]['id'] = @problem.id
      problems[1]['id'] = @problem_two.id
    end

    it "returns 404 if id not found" do
      get :show, :id => -1
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

    it "should not include nested problems" do
      get :index, :course_id => @course.id
      assert_response :success
      body = JSON.parse(response.body)
      body['problems'].should be_nil
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

      # Response should have updated version
      body = JSON.parse(response.body)
      body['id'].should_not == @quiz.id
      body['id'].should_not == @quiz_two.id
      body['id'].should_not == @quiz_three.id
      body['title'].should    == "quiz_four title"
      body['problems'].should == []

      # DB should be updated
      Quiz.count.should == (previous_size + 1)
      Quiz.last.title.should == "quiz_four title"
    end

    it "creates problems if problems are included" do
      post :create, :course_id => @course.id,
        :title => "quiz_four title",
        :problems => [{:question=>"question_one", :answer=>"answer_one"},
                      {:question=>"question_two", :answer=>"question_two"}]
      assert_response :success
      body = JSON.parse(response.body)

      # Response should have updated version
      body['problems'][0]['question'].should == "question_one"
      body['problems'][1]['question'].should == "question_two"
      body['problems'][0]['answer'].should   == "answer_one"
      body['problems'][1]['answer'].should   == "answer_two"

      # DB should be updated
      Quiz.last.problems.size.should == 2
      Quiz.last.problems[0].question.should == "question_one"
      Quiz.last.problems[1].question.should == "question_two"
      Quiz.last.problems[0].answer.should == "answer_one"
      Quiz.last.problems[1].answer.should == "answer_two"
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
      put :update, :id => @quiz.id,
        :title => "quiz title change"
      assert_response :success
      body = JSON.parse(response.body)
      body['id'].should == @quiz.id
      body['title'].should == "quiz title change"
      Quiz.find(@quiz.id).title.should == "quiz title change"
    end

    it "updates nothing if nothing included" do
      put :update, :id => @quiz.id
      assert_response :success
      body = JSON.parse(response.body)
      body['title'].should == @quiz.title
      Quiz.find(@quiz.id).title.should == @quiz.title
    end

    it "replaces the full problem set if problems are included" do
      put :update, :id => @quiz_two.id,
        :problems => [{:question=>"question_one", :answer=>"answer_one"},
                      {:question=>"question_two", :answer=>"question_two"}]
      assert_response :success

      # Response should have updated version
      body = JSON.parse(response.body)
      body['problems'][0]['question'].should == "question_one"
      body['problems'][1]['question'].should == "question_two"
      body['problems'][0]['answer'].should   == "answer_one"
      body['problems'][1]['answer'].should   == "answer_two"

      # DB should be updated
      Quiz.last.problems.size.should == 2
      Quiz.last.problems[0].question.should == "question_one"
      Quiz.last.problems[1].question.should == "question_two"
      Quiz.last.problems[0].answer.should == "answer_one"
      Quiz.last.problems[1].answer.should == "answer_two"

      # Old problem records should be destroyed
      expect { Problem.find_by_id(@problem_three.id) }.to raise_error
    end

    it "returns 404 if id not found" do
      put :update, :id => -1, :title => "course title change"
      check_failure(404)
    end

  end
end
