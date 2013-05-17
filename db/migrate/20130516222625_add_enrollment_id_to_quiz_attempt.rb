class AddEnrollmentIdToQuizAttempt < ActiveRecord::Migration
  def up
    add_column :quiz_attempts, :enrollment_id, :integer
    change_column :quiz_attempts, :enrollment_id, :integer, :null => false
  end

  def down
    remove_column :quiz_attempts, :enrollment_id
  end
end
