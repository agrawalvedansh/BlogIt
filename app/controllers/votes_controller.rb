# frozen_string_literal: true

class VotesController < ApplicationController
  before_action :load_vote!, only: %i[update]

  def index
    @votes = current_user.votes
  end

  def create
    vote = current_user.votes.new(vote_params)
    vote.save!
    update_post_vote_counts(vote.post)
    render_json
  end

  def update
    old_vote = @vote.is_upvote

    @vote.update!(vote_params)
    update_post_vote_counts(@vote.post, old_vote)
    render_json
  end

  private

    def vote_params
      params.require(:vote).permit(:post_id, :is_upvote)
    end

    def load_vote!
      @vote = Vote.find(params[:id])
    end

    def update_post_vote_counts(post, old_vote = nil)
      if old_vote.nil?
        if vote_params[:is_upvote]
          post.increment!(:upvotes)
        else
          post.increment!(:downvotes)
        end
      else
        if old_vote != vote_params[:is_upvote]
          if vote_params[:is_upvote]
            post.decrement!(:downvotes)
            post.increment!(:upvotes)
          else
            post.decrement!(:upvotes)
            post.increment!(:downvotes)
          end
        end
      end
    end
end
