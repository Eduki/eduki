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

    @user = User.new
    @user.email = "user email"
    @user.save

    @enrollment = Enrollment.new
    @enrollment.user = @user
    @enrollment.course = @course
    @enrollment.save

    @quiz_attempt = QuizAttempt.new
    @quiz_attempt.quiz = @quiz
    @quiz_attempt.enrollment = @enrollment
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
      body['enrollment_id'].should == @quiz_attempt.enrollment_id
      body['problem_attempts'][0]['id'].should         == @problem_attempt.id
      body['problem_attempts'][0]['correct'].should    == @problem_attempt.correct
      body['problem_attempts'][0]['problem_id'].should == @problem_attempt.problem.id
    end

    it "returns 404 if id not found" do
      get :show, :id => -1
      check_failure(404)
    end
  end

  describe "GET #index" do
    it "retrieves all quiz attempts for a enrollment" do
      get :index, :enrollment_id => @enrollment.id
      assert_response :success
      body = JSON.parse(response.body)
      body[0]['id'].should == @quiz_attempt.id
      body.size.should == 1
    end

    it "returns 404 if enrollment_id not found" do
      get :index, :enrollment_id => -1
      check_failure(404)
    end
  end

  describe "POST #create" do
    it "creates 1 quiz attempt" do
      previous_size = QuizAttempt.count
      previous_problem_attempt_count = ProblemAttempt.count
      post :create, :enrollment_id => @enrollment.id, :quiz_id => @quiz.id,
        :problem_attempts => [{
          :answer => "incorrect answer"
        },
        {
          :answer => "problem_two answer"
        },
      ]
      assert_response :success

      # Response should have updated version
      body = JSON.parse(response.body)
      body['quiz_id'].should == @quiz.id
      body['enrollment_id'].should == @enrollment.id
      # First problem
      body['problem_attempts'][0]['answer'].should == "incorrect answer"
      body['problem_attempts'][0]['correct'].should be_false
      body['problem_attempts'][0]['problem_id'].should == @problem.id
      body['problem_attempts'][0]['quiz_attempt_id'].should == body['id']
      # Second problem
      body['problem_attempts'][1]['answer'].should == "problem_two answer"
      body['problem_attempts'][1]['correct'].should be_true
      body['problem_attempts'][1]['problem_id'].should == @problem_two.id
      body['problem_attempts'][1]['quiz_attempt_id'].should == body['id']

      # DB should be updated
      Quiz.count.should == (previous_size + 1)
      ProblemAttempt.count.should == (previous_problem_attempt_count + 2)
    end

    it "creates 1 quiz attempt even if content type not labelled json" do
      previous_size = QuizAttempt.count
      previous_problem_attempt_count = ProblemAttempt.count
      post :create, :enrollment_id => @enrollment.id, :quiz_id => @quiz.id,
        :problem_attempts => [{
          :answer => "incorrect answer"
        },
        {
          :answer => "problem_two answer"
        },
      ].to_json
      assert_response :success

      # Response should have updated version
      body = JSON.parse(response.body)
      body['quiz_id'].should == @quiz.id
      body['enrollment_id'].should == @enrollment.id
      # First problem
      body['problem_attempts'][0]['answer'].should == "incorrect answer"
      body['problem_attempts'][0]['correct'].should be_false
      body['problem_attempts'][0]['problem_id'].should == @problem.id
      body['problem_attempts'][0]['quiz_attempt_id'].should == body['id']
      # Second problem
      body['problem_attempts'][1]['answer'].should == "problem_two answer"
      body['problem_attempts'][1]['correct'].should be_true
      body['problem_attempts'][1]['problem_id'].should == @problem_two.id
      body['problem_attempts'][1]['quiz_attempt_id'].should == body['id']

      # DB should be updated
      Quiz.count.should == (previous_size + 1)
      ProblemAttempt.count.should == (previous_problem_attempt_count + 2)

    end

    it "returns 400 if too few questions have been answered" do
      post :create, :enrollment_id => @enrollment.id, :quiz_id => @quiz.id,
        :problem_attempts => [{
          :answer => "incorrect answer"
        }
      ].to_json
      check_failure(400)
    end

    it "returns 400 if too many questions have been answered" do
      post :create, :enrollment_id => @enrollment.id, :quiz_id => @quiz.id,
        :problem_attempts => [{
          :answer => "incorrect answer"
        },{
          :answer => "incorrect answer"
        },{
          :answer => "incorrect answer"
        }
      ].to_json
      check_failure(400)
    end

    it "returns 404 if quiz_id not found" do
      post :create, :enrollment_id => @enrollment.id, :quiz_id => -1,
        :problem_attempts => [{
          :answer => "incorrect answer"
        }].to_json
      check_failure(404)
    end

    it "returns 404 if enrollment_id not found" do
      get :index, :enrollment_id => -1, :quiz_id => @quiz.id
      check_failure(404)
    end
  end
end
