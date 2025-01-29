import React, { useEffect, useState } from "react";

import FileSaver from "file-saver";
import { useParams } from "react-router-dom";

import postsApi from "apis/posts";
import createConsumer from "channels/consumer";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";
import { ProgressBar } from "components/commons";

const DownloadReport = ({ onClose }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const { slug } = useParams();

  const consumer = createConsumer();

  const generatePdf = async () => {
    try {
      await postsApi.generatePdf(slug);
    } catch (error) {
      logger.error(error);
    }
  };

  const downloadPdf = async () => {
    try {
      const { data } = await postsApi.download(slug);
      FileSaver.saveAs(data, "blogit_post.pdf");
      onClose();
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    subscribeToReportDownloadChannel({
      consumer,
      setMessage,
      setProgress,
      generatePdf,
    });

    return () => {
      consumer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setMessage("Report is ready to be downloaded");
      downloadPdf();
    }
  }, [progress]);

  return (
    <div className="flex flex-col gap-y-8">
      <div className="mb-4 w-full">
        <div className="mx-auto mb-4 w-full overflow-hidden rounded-lg border border-gray-200 bg-white text-gray-800 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-2xl">
          <div className="space-y-2 p-6">
            <p className="text-xl font-semibold">{message}</p>
            <ProgressBar progress={progress} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadReport;
