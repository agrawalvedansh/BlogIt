# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  constraints(lambda { |req| req.format == :json }) do
    resources :posts, only: %i[index create show], param: :slug
    resources :categories, only: %i[index create]
    resources :users, only: :create
    resources :organizations, only: [:index]
    resource :session, only: %i[create destroy]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
