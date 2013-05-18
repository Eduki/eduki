class CreateQuizzes < ActiveRecord::Migration
  def change
    create_table :quizzes do |t|
      t.string "title", :null => false
      t.integer "course_id", :null => false
      t.timestamps
    end
  end
end
