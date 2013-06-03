# Handles all logic surrounding parsing and outputting html from markdown
# David Mah
module MarkdownWriter
  def self.format_as_markdown(text)
    markdown_configuration = {
      :autolink => true,
      :space_after_headers => true,
      :filter_html => true,
      :no_styles => true,
      :safe_links_only => true,
      :prettify => true
    }
    markdown_formatter = Redcarpet::Markdown.new(Redcarpet::Render::XHTML, markdown_configuration)
    formatted_body = markdown_formatter.render(text)
    return formatted_body
  end
end
