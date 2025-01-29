json.posts do
  json.array!(@posts) do |post|
    json.extract! post, :id, :slug, :title, :description, :updated_at, :status, :upvotes, :downvotes, :is_bloggable

    json.user do
      json.extract! post.user, :name
    end

    json.categories post.categories do |category|
      json.extract! category, :id, :name
    end
  end
end
