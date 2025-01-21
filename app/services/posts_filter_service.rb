# frozen_string_literal: true

class PostsFilterService
  attr_reader :user, :params

  def initialize(user, params = {})
    @user = user
    @params = params
  end

  def process!
    posts = user.posts
    posts = filter_by_title(posts)
    posts = filter_by_status(posts)
    posts = filter_by_categories(posts)
    posts
  end

  private

    def filter_by_title(posts)
      return posts if params[:title].blank?

      posts.where("title LIKE ?", "%#{params[:title]}%")
    end

    def filter_by_status(posts)
      return posts if params[:status] == "undefined"

      posts.where(status: params[:status])
    end

    def filter_by_categories(posts)
      return posts if params[:category_ids].blank?

      posts.joins(:categories)
        .where("categories.id IN (?)", params[:category_ids])
        .distinct
    end
end
