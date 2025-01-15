# frozen_string_literal: true

require "test_helper"

class PostTest < ActiveSupport::TestCase
  def setup
    @organization = build(:organization)
    @user = create(:user)
    @post = create(:post)
  end

  def test_post_should_not_be_valid_without_user
    @post.user = nil
    assert_not @post.save
    assert_includes @post.errors.full_messages, "User must exist"
  end

  def test_post_should_not_be_valid_without_title
    @post.title = ""
    assert_not @post.valid?
  end

  def test_post_title_should_not_exceed_maximum_length
    @post.title = "a" * (Post::MAX_TITLE_LENGTH + 1)
    assert_not @post.valid?
  end

  def test_post_should_not_be_valid_without_description
    @post.description = ""
    assert_not @post.valid?
  end

  def test_post_description_should_not_exceed_maximum_length
    @post.description = "a" * (Post::MAX_DESCRIPTION_LENGTH + 1)
    assert_not @post.valid?
  end

  def test_post_should_not_be_valid_without_is_bloggable
    @post.is_bloggable = nil
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Is bloggable is not included in the list"
  end

  def test_post_count_increases_on_saving
    assert_difference ["Post.count"] do
      create(:post)
    end
  end

  def test_post_slug_is_parameterized_title
    title = @post.title
    @post.save!
    assert_equal title.parameterize, @post.slug
  end

  def test_incremental_slug_generation_for_posts_with_duplicate_titles
    first_post = Post.create!(
      title: "test post", user: @post.user, organization: @post.organization,
      description: @post.description, is_bloggable: true)
    second_post = Post.create!(
      title: "test post", user: @post.user, organization: @post.organization,
      description: @post.description, is_bloggable: true)

    assert_equal "test-post", first_post.slug
    assert_equal "test-post-2", second_post.slug
  end

  def test_error_raised_for_duplicate_slug
    another_test_post = Post.create!(
      title: "another test post", user: @post.user, organization: @post.organization,
      description: @post.description, is_bloggable: true)

    assert_raises ActiveRecord::RecordInvalid do
      another_test_post.update!(slug: @post.slug)
    end

    error_msg = another_test_post.errors.full_messages.to_sentence
    assert_match I18n.t("post.slug.immutable"), error_msg
  end

  def test_updating_title_does_not_update_slug
    assert_no_changes -> { @post.reload.slug } do
      updated_post_title = "updated post title"
      @post.update!(title: updated_post_title)
      assert_equal updated_post_title, @post.title
    end
  end

  def test_slug_suffix_is_maximum_slug_count_plus_one_if_two_or_more_slugs_already_exist
    title = "test-post"
    first_post = Post.create!(
      title:, user: @post.user, organization: @post.organization,
      description: @post.description, is_bloggable: true)
    second_post = Post.create!(
      title:, user: @post.user, organization: @post.organization,
      description: @post.description, is_bloggable: true)
    third_post = Post.create!(
      title:, user: @post.user, organization: @post.organization,
      description: @post.description, is_bloggable: true)
    fourth_post = Post.create!(
      title:, user: @post.user, organization: @post.organization,
      description: @post.description, is_bloggable: true)

    assert_equal "#{title.parameterize}-4", fourth_post.slug

    third_post.destroy

    expected_slug_suffix_for_new_post = fourth_post.slug.split("-").last.to_i + 1

    new_post = Post.create!(
      title:, user: @post.user, organization: @post.organization, description: @post.description,
      is_bloggable: true)
    assert_equal "#{title.parameterize}-#{expected_slug_suffix_for_new_post}", new_post.slug
  end
end
