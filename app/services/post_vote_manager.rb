# frozen_string_literal: true

class PostVoteManager
  attr_reader :post, :old_vote, :vote_params

  def initialize(post, old_vote, vote_params)
    @post = post
    @old_vote = old_vote
    @vote_params = vote_params
  end

  def process!
    update_post()
  end

  private

    def update_post
      if old_vote.nil?
        if vote_params[:is_upvote]
          post.increment!(:upvotes)
        else
          post.increment!(:downvotes)
        end
        update_post_is_bloggable(post)
      else
        if old_vote != vote_params[:is_upvote]
          if vote_params[:is_upvote]
            post.decrement!(:downvotes)
            post.increment!(:upvotes)
          else
            post.decrement!(:upvotes)
            post.increment!(:downvotes)
          end
          update_post_is_bloggable(post)
        end
      end
    end

    def update_post_is_bloggable(post)
      net_votes = post.upvotes - post.downvotes

      if net_votes > 5
        post.update!(is_bloggable: true)
      else
        post.update!(is_bloggable: false)
      end
    end
end
