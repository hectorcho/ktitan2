// src/components/ResolutionComponent.tsx

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from 'rehype-raw';
import { useFetchResolutionData } from "../hooks/useResolution";
import type { ResolutionComponentProps } from "../types/interfaces";

const ResolutionComponent: React.FC<ResolutionComponentProps> = ({
  resolutionUrl,
}) => {
  const { data, isLoading, error } = useFetchResolutionData(resolutionUrl);

  return (
    <div
      style={{
        padding: "15px",
      }}
      className="resolution-markdown-container"
    >
      {!isLoading && !error && data && (
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{data}</ReactMarkdown>
      )}
    </div>
  );
};

export default ResolutionComponent;
