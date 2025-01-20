# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    association :user, factory: :user
    association :organization, factory: :organization
    title { Faker::Lorem.sentence[0..10] }
    description { Faker::Lorem.sentence[0..49] }
    is_bloggable { true }
    status { "published" }
  end
end
