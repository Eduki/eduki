class CreateLessons < ActiveRecord::Migration
  def change
    create_table :lessons do |t|
      t.string :title
      t.string :body
      t.references :course
      t.timestamps
    end
  end
end
