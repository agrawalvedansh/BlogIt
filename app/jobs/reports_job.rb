# frozen_string_literal: true

class ReportsJob
  include Sidekiq::Job

  def perform(slug, report_path)
    post = Post.find_by(slug:)
    html_report = ApplicationController.render(
      assigns: {
        post:
      },
      template: "posts/report/download",
      layout: "pdf"
    )
    pdf_report = WickedPdf.new.pdf_from_string html_report
    if post.report.attached?
      post.report.purge_later
    end
    post.report.attach(
      io: StringIO.new(pdf_report), filename: "report.pdf",
      content_type: "application/pdf")
    post.save
  end
end
