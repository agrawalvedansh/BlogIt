import { getFromLocalStorage } from "utils/storage";

export const subscribeToReportDownloadChannel = ({
  consumer,
  setProgress,
  generatePdf,
}) => {
  const userId = getFromLocalStorage("authUserId");
  const reportDownloadSubscription = consumer.subscriptions.create(
    {
      channel: "ReportDownloadChannel",
      pubsub_token: userId,
    },
    {
      connected() {
        generatePdf();
      },
      received(data) {
        const { progress } = data;
        setProgress(progress);
      },
    }
  );

  return reportDownloadSubscription;
};
