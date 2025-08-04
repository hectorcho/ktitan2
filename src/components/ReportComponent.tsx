// src/components/ReportComponent.tsx

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// hook for loading final analysis report from server
const useLoadFinalReport = () => {
  const [content, setContent] = useState<string>("Loading report...");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    const loadReport = async () => {
      setIsLoading(true);
      setLoadingError(null);
      setContent("Fetching report...");

      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/hectorcho/ktitan-public/refs/heads/main/daily_report_2025-08-04.md`
        );

        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const data = await response.text();
        setContent(data);
      } catch (err) {
        const errMessage = `ERROR: Failed to fetch final report. ${err}`;

        setLoadingError(errMessage);
        setContent(errMessage);
        console.error(errMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadReport();
  }, []);

  return { content, isLoading, loadingError };
};

const ReportComponent: React.FC = () => {
  const { content, isLoading, loadingError } = useLoadFinalReport();
  return (
    <div
      style={{
        padding: "15px",
      }}
      className="report-markdown-container"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};

export default ReportComponent;
