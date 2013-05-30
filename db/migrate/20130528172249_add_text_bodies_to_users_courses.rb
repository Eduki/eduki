class AddTextBodiesToUsersCourses < ActiveRecord::Migration
  def change
    add_column :courses, :description, :text
    add_column :users,   :first_name,  :string
    add_column :users,   :last_name,   :string
    add_column :users,   :background,  :text
  end
end
