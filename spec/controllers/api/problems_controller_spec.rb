# Tests for the Problem Managing Endpoints on the API
# This should fill the test driven development requirement
# David Mah
require 'spec_helper'

describe Api::ProblemsController do

  # Set up some problem examples to be used by the tests
  before(:each) do
    add_fixtures()
  end

  describe "GET #show" do

    it "returns a Problem with a HTTP 200 status code" do
      get :show, :quiz_id => @quiz.id, :id => @problem.id
      assert_response :success
      body = JSON.parse(response.body)
      body['id'].should       == @problem.id
      body['question'].should == @problem.question
      body['answer'].should   == @problem.answer
      body['quiz_id'].should  == @problem.quiz_id
    end

    it "returns 404 if id not found" do
      get :show, :id => -1
      check_failure(404)
    end
  end

  describe "GET #index" do
    it "retrieves all problems for a quiz" do
      get :index, :quiz_id => @quiz.id
      assert_response :success
      body = JSON.parse(response.body)
      body[0]['question'].should == "problem_one question"
      body[1]['question'].should == "problem_two question"
      body.size.should == 2
    end

    it "returns 404 if quiz_id not found" do
      get :index, :quiz_id => -1
      check_failure(404)
    end
  end

  describe "POST #create" do
    it "creates 1 problem" do
      previous_size = Problem.count
      post :create, :quiz_id => @quiz.id,
        :question => "problem_four question", :answer => "problem_four answer"
      assert_response :success

      # Response should have updated version
      body = JSON.parse(response.body)
      body['id'].should_not == @problem.id
      body['id'].should_not == @problem_two.id
      body['id'].should_not == @problem_three.id
      body['question'].should == "problem_four question"
      body['answer'].should   == "problem_four answer"

      # DB should be updated
      Problem.count.should == (previous_size + 1)
      Problem.last.question.should == "problem_four question"
      Problem.last.answer.should == "problem_four answer"
    end

    it "returns 400 if question missing" do
      post :create, :quiz_id => @quiz.id, :answer => "answer"
      check_failure(400)
    end

    it "returns 400 if answer missing" do
      post :create, :quiz_id => @quiz.id, :question => "question"
      check_failure(400)
    end
  end

  describe "PUT #update" do
    it "updates 1 Problem" do
      put :update, :id => @problem.id,
        :question => "problem question change",
        :answer => "problem answer change"
      assert_response :success

      # Response should have updated version
      body = JSON.parse(response.body)
      body['id'].should == @problem.id
      body['question'].should == "problem question change"
      body['answer'].should   == "problem answer change"

      # DB should be updated
      Problem.find(@problem.id).question.should == "problem question change"
      Problem.find(@problem.id).answer.should   == "problem answer change"
    end

    it "updates nothing if nothing included" do
      put :update,:id => @problem.id
      assert_response :success

      # Response should have updated version
      body = JSON.parse(response.body)
      body['question'].should == @problem.question
      body['answer'].should   == @problem.answer

      # DB should be updated
      Problem.find(@problem.id).question.should == @problem.question
      Problem.find(@problem.id).answer.should    == @problem.answer
    end

    it "returns 404 if id not found" do
      put :update, :id => -1, :title => "course title change"
      check_failure(404)
    end
  end

  describe "DELETE #destroy" do
    it "removes a problem's record" do
      delete :destroy, :id => @problem.id
      assert_response :success
      Problem.find_by_id(@problem).should be_nil
    end

    it "returns 404 if id not found" do
      delete :destroy, :id => -1
      check_failure(404)
    end
  end
end
