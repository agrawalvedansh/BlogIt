# frozen_string_literal: true

class AddEmailAndPasswordDigestToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :email, :string, index: { unique: true }
    add_column :users, :password_digest, :string
  end
end
