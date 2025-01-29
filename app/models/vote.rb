# frozen_string_literal: true

class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :post

  validates :user, uniqueness: { scope: :post_id }
  validates :is_upvote, inclusion: { in: [true, false] }
end
