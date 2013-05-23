require 'spec_helper'

describe Lesson do

  # Set up some lesson examples to be used by the tests
  before(:each) do
    @course = Course.new
    @course.title = "course example"
    @course.save

    @lesson = Lesson.new
    @lesson.title = "lesson_one title"
    @lesson.body = "lesson_one body"
    @lesson.course = @course
    @lesson.save

  end

  it "should delete the lesson instance upon course delete" do
    @course.destroy
    Lesson.find_by_id(@lesson.id).should be_nil
  end
end
