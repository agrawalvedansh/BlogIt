# frozen_string_literal: true

class PostFilterJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # Do something later
  end
end
