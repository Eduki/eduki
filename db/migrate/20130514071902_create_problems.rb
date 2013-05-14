class CreateProblems < ActiveRecord::Migration
  def change
    create_table :problems do |t|
      t.string "question", :null => false
      t.string "answer", :null => false
      t.integer "quiz_id", :null => false
      t.timestamps
    end
  end
end
