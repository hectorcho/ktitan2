// src/components/NewsComponent.tsx

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Box, Typography, useTheme, List, ListItem } from "@mui/material";
import { tokens } from "../theme";

interface NewsCardProps {
  title: string;
  summary: string;
  source: string;
  time: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  summary,
  source,
  time,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{ backgroundColor: colors.primary[400] }}>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>

      <Typography
        sx={{
          width: "70%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2, // <-- Number of lines to show
          WebkitBoxOrient: "vertical",
        }}
      >
        {summary}
      </Typography>

      <Typography>{`${source}, ${time}`}</Typography>
    </Box>
  );
};

interface FetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

const useFetchData = <T extends any[]>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const result = await response.json();
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

const NewsComponent: React.FC = () => {
  const newsUrl =
    "https://raw.githubusercontent.com/hectorcho/ktitan-public/refs/heads/main/chosun_politics.json";
  const { data, isLoading, error } = useFetchData<NewsCardProps[]>(newsUrl);

  return (
    
      <List>
      {!isLoading &&
        !error &&
        data &&
        data.map((row: NewsCardProps) => (
          <ListItem>
            <NewsCard
              title={row.title}
              summary={row.summary}
              source={row.source}
              time={row.time}
            />
          </ListItem>
        ))}
    </List>
    
    
  );
};

export default NewsComponent;
