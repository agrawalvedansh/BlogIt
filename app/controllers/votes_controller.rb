# frozen_string_literal: true

class VotesController < ApplicationController
  before_action :load_vote!, only: %i[update]

  def index
    @votes = current_user.votes
  end

  def create
    vote = current_user.votes.new(vote_params)
    vote.save!
    PostVoteManager.new(vote.post, nil, vote_params).process!
    render_json
  end

  def update
    old_vote = @vote.is_upvote
    @vote.update!(vote_params)
    PostVoteManager.new(@vote.post, old_vote, vote_params).process!
    render_json
  end

  private

    def vote_params
      params.require(:vote).permit(:post_id, :is_upvote)
    end

    def load_vote!
      @vote = Vote.find_by(post_id: params[:id])
    end
end
