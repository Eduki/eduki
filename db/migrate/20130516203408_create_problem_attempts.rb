class CreateProblemAttempts < ActiveRecord::Migration
  def change
    create_table :problem_attempts do |t|
      t.integer :quiz_attempt_id, :null => false
      t.integer :problem_id, :null => false
      t.string :answer, :null => false
      t.boolean :correct, :null => false

      t.timestamps
    end
  end
end
