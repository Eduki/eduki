class AddMarkdownToProblem < ActiveRecord::Migration
  def change
    add_column :problems, :question_markdown, :text
    change_column :problems, :question_markdown, :text, :null => false
  end

  def down
    remove_column :problems, :question_markdown
  end
end
