# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @organization = build(:organization)
  end

  def test_organization_should_not_be_valid_and_saved_without_name
    @organization.name = ""
    assert_not @organization.valid?
    assert_includes @organization.errors.full_messages, "Name can't be blank"
  end
end
