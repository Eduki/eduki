class CreateQuizAttempts < ActiveRecord::Migration
  def change
    create_table :quiz_attempts do |t|
      t.integer :quiz_id, :null => false
      t.integer :user_id, :null => false

      t.timestamps
    end
  end
end
