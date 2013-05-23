# == Schema Information
#
# Table name: lessons
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  body       :text(255)        not null
#  course_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'spec_helper'
describe Lesson do
  before(:each) do
    # add_fixtures()
    @course = Course.new
    @course.title = "course example"
    @course.save

    @lesson = Lesson.new
    @lesson.title = "lesson_one title"
    @lesson.body = "lesson_one body"
    @lesson.course = @course
    @lesson.save
  end

  it "should write markdown before being created" do
    lesson = Lesson.new
    lesson.course = @course
    lesson.title = "example title"
    lesson.body = "example body"
    lesson.save
    Lesson.find_by_id(lesson).body_markdown.should_not be_nil
  end

  it "should rewrite markdown when saved again" do
    body_markdown = @lesson.body_markdown
    @lesson.body = "#{@lesson.body}\n\ntest"
    @lesson.save
    # Do not pick a particular output of the markdown because it
    # can vary depending on configuration
    Lesson.find_by_id(@lesson.id).body_markdown.should_not == body_markdown
  end
end
