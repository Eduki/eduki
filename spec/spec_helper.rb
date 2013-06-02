# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'
require 'rspec/autorun'

# Requires supporting ruby files with custom matchers and macros, etc,
# in spec/support/ and its subdirectories.
Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

RSpec.configure do |config|
  # ## Mock Framework
  #
  # If you prefer to use mocha, flexmock or RR, uncomment the appropriate line:
  #
  # config.mock_with :mocha
  # config.mock_with :flexmock
  # config.mock_with :rr

  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  config.use_transactional_fixtures = true

  # If true, the base class of anonymous controllers will be inferred
  # automatically. This will be the default behavior in future versions of
  # rspec-rails.
  config.infer_base_class_for_anonymous_controllers = false

  # Run specs in random order to surface order dependencies. If you find an
  # order dependency and want to debug it, you can fix the order by providing
  # the seed, which is printed after each run.
  #     --seed 1234
  config.order = "random"
end

# Fails the test if the HTTP code does not match the given code
# Also checks that the 'error' key exists in the text response
def check_failure(code)
  assert_response code
  body = JSON.parse(response.body)
  body['error'].should_not == nil
end

# @user
#   @course
#     @quiz
#       @problem
#       @problem_two
#     @quiz_two
#       @problem_three
#     @lesson
#     @lesson_two
#   @course_two
#     @lesson_three
#   @enrollment(@course)
#     @quiz_attempt(@quiz)
#       @problem_attempt
# @user_two
#   @course_three
def add_fixtures
    @user = User.new
    @user.email = "user email"
    @user.password = "user password"
    @user.save

    @course = Course.new
    @course.title = "course example"
    @course.user  = @user
    @course.description = "course description"
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

    @lesson = Lesson.new
    @lesson.title = "lesson_one title"
    @lesson.body = "lesson_one body"
    @lesson.course = @course
    @lesson.save

    @lesson_two = Lesson.new
    @lesson_two.title = "lesson_two title"
    @lesson_two.body = "lesson_two body"
    @lesson_two.course = @course
    @lesson_two.save

    @course_two = Course.new
    @course_two.title = "course_two example"
    @course_two.user = @user
    @course_two.save

    @lesson_three = Lesson.new
    @lesson_three.title = "lesson_three title"
    @lesson_three.body = "lesson_three body"
    @lesson_three.course = @course_two
    @lesson_three.save

    @user_two = User.new
    @user_two.email = "user_two email"
    @user_two.password = "user_two password"
    @user_two.save

    @course_three = Course.new
    @course_three.title = "course_three example"
    @course_three.user = @user_two
    @course_three.save
end
