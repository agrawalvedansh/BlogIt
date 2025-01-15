json.posts do
  json.array!(@posts) do |post|
    json.extract! post, :id, :slug, :title, :description, :created_at

    json.user do
      json.extract! post.user, :name
    end

    json.categories post.categories do |category|
      json.extract! category, :id, :name
    end
  end
end
