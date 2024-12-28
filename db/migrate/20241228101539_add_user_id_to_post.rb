# frozen_string_literal: true

class AddUserIdToPost < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :user_id, :integer
    add_foreign_key :posts, :users, column: :user_id, on_delete: :cascade
  end
end
