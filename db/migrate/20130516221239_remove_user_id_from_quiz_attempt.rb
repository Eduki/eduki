class RemoveUserIdFromQuizAttempt < ActiveRecord::Migration
  def up
    remove_column :quiz_attempts, :user_id
  end

  def down
    add_column :quiz_attempts, :user_id, :integer
  end
end
