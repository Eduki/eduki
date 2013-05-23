class AddMarkdownToLessons < ActiveRecord::Migration
  def up
    add_column :lessons, :body_markdown, :text
    change_column :lessons, :body_markdown, :text, :null => false
  end

  def down
    remove_column :lessons, :body_markdown
  end
end
