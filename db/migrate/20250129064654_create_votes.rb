# frozen_string_literal: true

class CreateVotes < ActiveRecord::Migration[7.0]
  def change
    create_table :votes do |t|
      t.references :user, null: false, foreign_key: true
      t.references :post, null: false, foreign_key: true
      t.boolean :is_upvote, null: false # or use enum if you prefer
      t.timestamps
    end

    add_index :votes, [:user_id, :post_id], unique: true
  end
end
