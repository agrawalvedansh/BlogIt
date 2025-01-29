# frozen_string_literal: true

class Posts::ReportsController < ApplicationController
  def create
    ReportsJob.perform_async(params[:post_slug], report_path)
    render_notice("Report generation in progress")
  end

  def download
    if File.exist?(report_path)
      send_file(
        report_path,
        type: "application/pdf",
        filename: pdf_file_name,
        disposition: "attachment"
      )
    else
      render_error(t("not_found", entity: "report"), :not_found)
    end
  end

  private

    def report_path
      @_report_path ||= Rails.root.join("tmp/#{pdf_file_name}")
    end

    def pdf_file_name
      "blogit_post.pdf"
    end
end
