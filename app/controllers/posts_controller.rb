# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.all.as_json(include: { user: { only: [:name] }, categories: { only: [:id, :name] } })
    render status: :ok, json: { posts: }
  end

  def create
    post = Post.new(post_params)
    post.save!
    render_notice(t("post.successfully_created"))
  end

  def show
    post = Post.find_by!(slug: params[:slug]).as_json(
      include: {
        user: { only: [:name] },
        categories: { only: [:id, :name] }
      })
    render_json({ post: })
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, category_ids: [])
    end
end
