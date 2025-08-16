// src/components/NewsComponent.tsx

import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, List, ListItem, Link } from "@mui/material";
import { tokens } from "../theme";
import { getKstDate } from "../hooks/useMapDialog";
import type {
  NewsData,
  NewsCardProps,
  NewsComponentProps,
} from "../types/interfaces";
import { newsDataListUrl } from "../data/urls";

const translateSource = (source: string) => {
  if (source == "chosun") {
    return "조선일보";
  } else if (source == "yna") {
    return "연합뉴스";
  }
};

const NewsCard: React.FC<NewsCardProps> = ({
  data,
  isSelected,
  isDashboard,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const bgColor = () => {
    if (isDashboard) {
      return colors.primary[400];
    } else {
      return isSelected ? colors.primary[900] : colors.primary[400];
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: bgColor,
        width: "100%",
        height: "100%",
        borderRadius: 3,
        padding: "10px",
        border: isDashboard ? '1px solid black' : ''
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        <Link
          href={data.url}
          target="_blank"
          rel="noopener"
          color="inherit"
          sx={{
            
            "&:hover": {
              color: colors.blueAccent[400],
            },
          }}
        >
          {data.title}
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
        {data.summary}
      </Typography>

      <Typography>{`${translateSource(data.source)}, ${data.date}`}</Typography>
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
        console.error(errMessage);
        setError(errMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

const NewsComponent: React.FC<NewsComponentProps> = ({
  onCardClick,
  isDashboard,
}) => {
  const currDate = getKstDate();
  const dailyNewsUrl = `${newsDataListUrl}/${currDate}/daily_news.json`;
  const { data, isLoading, error } = useFetchData<NewsData[]>(dailyNewsUrl);
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
    <List sx={{ padding: "0px" }}>
      {!isLoading &&
        !error &&
        data &&
        data.map((row: NewsData, index: number) => (
          <ListItem
            key={index}
            onClick={() => handleCardClick(row.reportUrl, index)}
          >
            <NewsCard
              data={row}
              isSelected={activeIndex === index}
              isDashboard={isDashboard}
            />
          </ListItem>
        ))}
    </List>
  );
};

export default NewsComponent;
