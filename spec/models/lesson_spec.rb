# == Schema Information
#
# Table name: lessons
#
#  id            :integer          not null, primary key
#  title         :string(255)      not null
#  body          :text(255)        not null
#  course_id     :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  body_markdown :text             not null
#

require 'spec_helper'
describe Lesson do
  before(:each) do
    add_fixtures()
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

  it "should delete the lesson instance upon course delete" do
    @course.destroy
    Lesson.find_by_id(@lesson.id).should be_nil
  end
end
