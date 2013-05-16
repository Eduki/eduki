# Tests for the Quiz Managing Endpoints on the API
# This should fill the test driven development requirement
# David Mah
require 'spec_helper'

describe Api::QuizAttemptsController do

  # Set up some quiz examples to be used by the tests
  before(:each) do
    @course = Course.new
    @course.title = "course example"
    @course.save

    @quiz = Quiz.new
    @quiz.title = "quiz_one title"
    @quiz.course = @course
    @quiz.save

    @quiz_two = Quiz.new
    @quiz_two.title = "quiz_two title"
    @quiz_two.course = @course
    @quiz_two.save

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

    ############

    # TODO get a real user in here later
    @user = User.new
    @user.save

    @quiz_attempt = QuizAttempt.new
    @quiz_attempt.quiz = @quiz
    @quiz_attempt.user_id = @user.id
    @quiz_attempt.save

    @problem_attempt = ProblemAttempt.new
    @problem_attempt.quiz_attempt = @quiz_attempt
    @problem_attempt.problem = @problem
    @problem_attempt.answer = "problem_one answer"
    @problem_attempt.correct = true
    @problem_attempt.save

  end

  describe "GET #show" do

    it "returns a Quiz Attempt with a HTTP 200 status code" do
      get :show, :id => @quiz_attempt.id
      assert_response :success
      body = JSON.parse(response.body)
      body['id'].should      == @quiz_attempt.id
      body['quiz_id'].should == @quiz_attempt.quiz_id
      body['user_id'].should == @quiz_attempt.user_id
      body['problems'][0].id.should         == @problem_attempt.id
      body['problems'][0].correct.should    == @problem_attempt.correct
      body['problems'][0].problem_id.should == @problem_attempt.problem.id
    end

    it "returns 404 if id not found" do
      get :show, :id => -1
      check_failure(404)
    end
  end

  describe "GET #index" do
    it "retrieves all quiz attempts for a user/quiz" do
      get :index, :user_id => @user.id, :quiz_id => @quiz.id
      assert_response :success
      body = JSON.parse(response.body)
      body[0]['id'].should      == @quiz_attempt.id
      body.size.should == 1
    end

    it "returns 404 if quiz_id not found" do
      get :index, :user_id => @user.id, :quiz_id => -1
      check_failure(404)
    end

    it "returns 404 if user_id not found" do
      get :index, :user_id => -1, :quiz_id => @quiz.id
      check_failure(404)
    end
  end

  describe "POST #create" do
    it "creates 1 quiz attempt" do
      previous_size = QuizAttempt.count
      post :create, :user_id => @user.id, :quiz_id => @quiz.id,
        :problem_attempts => {
          :answer => "incorrect answer"
        }
      assert_response :success

      # Response should have updated version
      body = JSON.parse(response.body)
      body['quiz_id'].should == @quiz.id
      body['user_id'].should == @user.id
      body['problem_attempts'][0]['answer'].should == "incorrect answer"
      body['problem_attempts'][0]['correct'].should be_false
      body['problem_attempts'][0]['quiz_attempt_id'].should == body['id']

      # DB should be updated
      Quiz.count.should == (previous_size + 1)
    end

    it "returns 404 if quiz_id not found" do
      get :index, :user_id => @user.id, :quiz_id => -1
      check_failure(404)
    end

    it "returns 404 if user_id not found" do
      get :index, :user_id => -1, :quiz_id => @quiz.id
      check_failure(404)
    end
  end
end
