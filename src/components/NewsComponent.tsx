// src/components/NewsComponent.tsx

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Box, Typography, useTheme, List, ListItem, Link } from "@mui/material";
import { tokens } from "../theme";

interface NewsCardProps {
  title: string;
  summary: string;
  source: string;
  date: string;
  url: string;
  reportUrl: string;
  isSelected: boolean;
  isDashboard: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  summary,
  source,
  date,
  url,
  isSelected,
  isDashboard
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const bgColor = () => {
    if (isDashboard) {
      return colors.primary[400];
    } else {
      return isSelected ? colors.primary[700] : colors.primary[400];
    }
  }
  return (
    <Box sx={{ backgroundColor: bgColor }}>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        <Link href={url} target="_blank" rel="noopener" color="inherit">
          {title}
        </Link>
      </Typography>

      <Typography
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2, // <-- Number of lines to show
          WebkitBoxOrient: "vertical",
        }}
      >
        {summary}
      </Typography>

      <Typography>{`${source}, ${date}`}</Typography>
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
        const errMessage = `ERROR: Failed to fetch final report. ${err.message}`;
        setError(errMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

interface NewsComponentProps {
  onCardClick: (url: string | null) => void;
  isDashboard: boolean;
}

const NewsComponent: React.FC<NewsComponentProps> = ({onCardClick, isDashboard}) => {
  const newsUrl =
    "https://raw.githubusercontent.com/hectorcho/ktitan-public/refs/heads/main/news_2025-08-03.json";
  const { data, isLoading, error } = useFetchData<NewsCardProps[]>(newsUrl);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleCardClick = (url: string, index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
      onCardClick(null);
    } else {
      setActiveIndex(index);
      onCardClick(url);
    }
  };


  return (
    
      <List>
      {!isLoading &&
        !error &&
        data &&
        data.map((row: NewsCardProps, index: number) => (
          <ListItem key={index} onClick={() => handleCardClick(row.reportUrl, index)}>
            <NewsCard
              title={row.title}
              summary={row.summary}
              source={row.source}
              date={row.date}
              url={row.url}
              reportUrl={row.reportUrl}
              isSelected={activeIndex === index}
              isDashboard={isDashboard}
            />
          </ListItem>
        ))}
    </List>
    
    
  );
};

export default NewsComponent;
