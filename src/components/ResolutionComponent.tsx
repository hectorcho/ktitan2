// src/components/ResolutionComponent.tsx

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface FetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

const useFetchData = (url: string | null): FetchResult<string> => {
  const [data, setData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      if (!url) {
        setIsLoading(false);
        setData(null);
        setError(null);
        return;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const result = await response.text();
        console.log('Resolution Fetched');
        setData(result);
      } catch (err: any) {
        const errMessage = `ERROR: Failed to fetch final report. ${err.errMessage}`;
        setError(errMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

interface Props {
  cmUrl: string | null;
};


const ResolutionComponent: React.FC<Props> = ({cmUrl}) => {
  console.log(cmUrl);
  const { data, isLoading, error } = useFetchData(cmUrl);
  
  return (
    <div
      style={{
        padding: "15px",
      }}
      className="resolution-markdown-container"
    >
      {!isLoading && !error && data &&
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{data}</ReactMarkdown>
      }
      
    </div>
  );
};

export default ResolutionComponent;
