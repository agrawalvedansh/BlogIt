class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.integer :upvotes, null: false
      t.integer :downvotes, null: false
      t.boolean :is_bloggable
      t.timestamps
    end
  end
end
