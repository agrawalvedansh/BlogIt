# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: [:show]

  def index
    posts = Post.where(organization: current_user.organization).all.as_json(
      include: {
        user: { only: [:name] },
        categories: {
          only: [:id,
          :name]
        }
      })
    render status: :ok, json: { posts: }
  end

  def create
    post = current_user.posts.new(post_params)
    post.organization = current_user.organization
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
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
