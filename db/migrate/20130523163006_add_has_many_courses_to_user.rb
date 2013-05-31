class AddHasManyCoursesToUser < ActiveRecord::Migration
  def up
    # Creating, then changing to add the constraint is a
    # hack that gets around a constraint of SQLite3. This works
    # for all other major SQL-like DBs
    add_column :courses, :user_id, :integer
    change_column :courses, :user_id, :integer, :null => false
  end

  def down
    remove_column :courses, :user_id
  end
end
