json.votes do
  json.array!(@votes) do |vote|
    json.extract! vote, :is_upvote
    json.extract! vote.post, :id
  end
end
