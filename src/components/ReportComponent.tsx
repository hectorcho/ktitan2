// src/components/ReportComponent.tsx

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// hook for loading final analysis report from server
const useLoadFinalReport = (date: string) => {
  const [content, setContent] = useState<string>("Loading report...");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    const loadReport = async () => {
      setIsLoading(true);
      setLoadingError(null);
      setContent("Fetching report...");

      console.log(date);

      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/hectorcho/ktitan-public/refs/heads/main/country_reports/${date}/kr_report.md`
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
  }, [date]);

  return { content, isLoading, loadingError };
};

interface ReportComponentProps {
  date: string;
};

const ReportComponent: React.FC<ReportComponentProps> = ({date}) => {
  const { content } = useLoadFinalReport(date);
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
