# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: %i[show update destroy]

  def index
    @posts = policy_scope(Post)
  end

  def my_posts
    @posts = current_user.posts
    render template: "posts/index"
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

  def update
    # authorize @post
    @post.update!(post_params)
    render_notice(t("successfully_updated", entity: "Post")) unless params.key?(:quiet)
  end

  def destroy
    authorize @post
    @post.destroy!
    render_notice(t("successfully_deleted", entity: "Post")) unless params.key?(:quiet)
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :status, category_ids: [])
    end

    def load_post!
      @post = Post.find_by!(slug: params[:slug])
    end
end
