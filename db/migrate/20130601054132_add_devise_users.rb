class AddDeviseUsers < ActiveRecord::Migration
  def up
    add_column :users, :encrypted_password, :string, :null => false, :default => ""
    add_column :users, :password_salt, :string
    add_index :users, :email, :unique => true

    add_column :users, :authentication_token, :string
  end
  def down
    remove_column :users, :encrypted_password
    remove_column :users, :password_salt
    remove_index :users, :email
  end
end
