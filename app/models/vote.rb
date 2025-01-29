# frozen_string_literal: true

class Vote < ApplicationRecord
  IS_BLOGGABLE_THRESHOLD = 5

  belongs_to :user
  belongs_to :post

  validates :user_id, uniqueness: { scope: :post_id }
  validates :is_upvote, inclusion: { in: [true, false] }
end
