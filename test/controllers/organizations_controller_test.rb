# frozen_string_literal: true

require "test_helper"

class OrganizationsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization1 = create(:organization, name: "Organization One")
    @organization2 = create(:organization, name: "Organization Two")
  end

  def test_should_list_all_organizations
    get organizations_path, as: :json
    assert_response :success

    response_json = response.parsed_body

    organizations = response_json["organizations"]
    assert_equal 2, organizations.length

    organization_names = organizations.map { |org| org["name"] }
    assert_includes organization_names, "Organization One"
    assert_includes organization_names, "Organization Two"
  end
end
