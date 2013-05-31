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

class Lesson < ActiveRecord::Base
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

  def write_markdown
    markdown_configuration = {
      :autolink => true,
      :space_after_headers => true,
      :filter_html => true,
      :no_styles => true,
      :safe_links_only => true,
      :prettify => true
    }
    markdown_formatter = Redcarpet::Markdown.new(Redcarpet::Render::XHTML, markdown_configuration)
    formatted_body = markdown_formatter.render(self.body)
    self.body_markdown = formatted_body
  end
end
