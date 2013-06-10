class CreateProblems < ActiveRecord::Migration
  def change
    create_table :problems do |t|
      t.text "question", :null => false
      t.text "answer", :null => false
      t.integer "quiz_id", :null => false
      t.timestamps
    end
  end
end
