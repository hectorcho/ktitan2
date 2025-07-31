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
          `https://raw.githubusercontent.com/jglsnu12/k_titan/main/final_analysis_report.txt`
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

interface ReportComponentProps {
  content: string;
  isLoading: boolean;
  loadingError: string | null;
};

const ReportComponent: React.FC = () => {
  const { content, isLoading, loadingError } = useLoadFinalReport();
  return (
    <div
      style={{
        padding: '15px',
        overflowY: 'auto',
        height: '100%'
      }}
      className="report-markdown-container"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>

  )
};

export default ReportComponent;

