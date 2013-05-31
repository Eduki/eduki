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

require 'MarkdownWriter'

class Lesson < ActiveRecord::Base
  include MarkdownWriter

  attr_accessible :title, :body, :course, :course_id
  belongs_to :course

  before_save :write_markdown

  # An object to return in the case that the given lesson is not found
  def self.missing_instance(id)
    {
      :error => "Resource not found",
      :message => "Could not find Lesson with ID=#{id}"
    }
  end

  # Parses body as markdown text and stores outputted html into
  # self.body_markdown
  def write_markdown
    self.body_markdown = MarkdownWriter.format_as_markdown(self.body)
  end
end
