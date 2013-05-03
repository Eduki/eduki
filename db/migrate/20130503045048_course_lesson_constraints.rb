class CourseLessonConstraints < ActiveRecord::Migration
  def up
    # Force things to be non null
    change_column(:courses, :title, :string, :null => false)

    change_column(:lessons, :title, :string, :null => false)
    change_column(:lessons, :body, :text, :null => false)
    change_column(:lessons, :course_id, :integer, :null => false)
  end

  def down
    change_column(:courses, :title, :string)
    change_column(:lessons, :title, :string)
    change_column(:lessons, :body, :string)
    change_column(:lessons, :course_id, :integer)
  end
end
