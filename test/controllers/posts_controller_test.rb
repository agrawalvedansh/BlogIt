# frozen_string_literal: true

require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @user_2 = create(:user)
    @post = create(:post, user: @user, organization: @organization)
    @user_headers = headers(@user)
    @user_2_headers = headers(@user_2)
  end

  def test_should_list_all_posts_for_valid_user
    create_list(:post, 3, user: @user, organization: @organization)

    get posts_path, headers: @user_headers
    assert_response :success

    response_json = response.parsed_body
    all_posts = response_json["posts"]
    actual_posts_ids = all_posts.pluck("id").sort
    expected_posts_ids = Post.where(organization: @organization).pluck(:id).sort

    assert_equal expected_posts_ids, actual_posts_ids
  end

  def test_should_create_valid_post
    post_params = {
      post: {
        title: "New Post Title",
        description: "New Post Description",
        category_ids: []
      }
    }

    post posts_path, params: post_params, headers: @user_headers
    assert_response :success

    response_json = response.parsed_body
    assert_equal I18n.t("successfully_created", entity: "Post"), response_json["notice"]
  end

  def test_should_not_create_post_without_title
    post_params = {
      post: {
        title: "",
        description: "New Post Description",
        category_ids: []
      }
    }

    assert_no_difference("Post.count") do
      post posts_path, params: post_params, headers: @user_headers
    end

    assert_response :unprocessable_entity
  end

  def test_should_not_create_post_without_description
    post_params = {
      post: {
        title: "New Post Title",
        description: "",
        category_ids: []
      }
    }

    assert_no_difference("Post.count") do
      post posts_path, params: post_params, headers: @user_headers
    end

    assert_response :unprocessable_entity
  end

  def test_should_not_show_post_for_invalid_user
    get post_path(slug: @post.slug), headers: @user_2_headers
    assert_response :forbidden

    response_json = response.parsed_body
    assert_equal I18n.t("authorization.denied"), response_json["error"]
  end

  def test_not_found_error_rendered_for_invalid_post_slug
    invalid_slug = "invalid-slug"

    get post_path(slug: invalid_slug), headers: @user_headers
    assert_response :not_found

    response_json = response.parsed_body
    assert_equal I18n.t("not_found", entity: "Post"), response_json["error"]
  end
end
