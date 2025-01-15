# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @category1 = create(:category, name: "Category One")
    @category2 = create(:category, name: "Category Two")
    @user_headers = headers(@user)
  end

  def test_should_list_all_categories
    get categories_path, headers: @user_headers
    assert_response :success

    response_json = response.parsed_body

    categories = response_json["categories"]
    assert_equal 2, categories.length,

      # category_names = categories.map { |category| category["name"] }
      category_names = categories.pluck("name")
    assert_includes category_names, "Category One"
    assert_includes category_names, "Category Two"
  end
end
