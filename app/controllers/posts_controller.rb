# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: [:show]

  def index
    @posts = policy_scope(Post)
  end

  def create
    post = current_user.posts.new(post_params)
    post.organization = current_user.organization
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
    authorize @post
    render
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, category_ids: [])
    end

    def load_post!
      @post = Post.find_by!(slug: params[:slug])
    end
end
