import React, { useEffect, useState } from "react";

import FileSaver from "file-saver";
import { useParams } from "react-router-dom";

import postsApi from "apis/posts";
import createConsumer from "channels/consumer";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";
import { ProgressBar } from "components/commons";

const DownloadReport = ({ onClose }) => {
  const [progress, setProgress] = useState(0);

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
      setProgress,
      generatePdf,
    });

    return () => {
      consumer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      downloadPdf();
    }
  }, [progress]);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="rounded-lg border border-gray-200 bg-white p-10">
        <p className="mb-6 text-xl font-semibold">Downloading blog post</p>
        <ProgressBar progress={progress} />
      </div>
    </div>
  );
};

export default DownloadReport;
