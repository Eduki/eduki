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

    @quiz = Quiz.new
    @quiz.title = "quiz example"
    @quiz.course = @course
    @quiz.save

    @quiz_two = Quiz.new
    @quiz_two.title = "quiz example"
    @quiz_two.course = @course
    @quiz_two.save

    @quizzes = [@quiz, @quiz_two
  end

  describe "GET 'show'" do
    it "returns 1 Quiz with a HTTP 200 status Code"
      get 'show', :id => @quiz.id
      response.should be_success
      body = JSON.parse(response.body)
      @quiz.id.should == body['id']
      @quiz.title.should == body['title']
      @quiz.course_id.should == body['course_id']
    end
  end
end
