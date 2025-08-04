import React, { useState, useEffect } from "react";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  Box,
  Typography,
  useTheme,
  List,
  ListItem,
  Grid,
  Link,
} from "@mui/material";
import { tokens } from "../theme";

interface CommunityCardProps {
  title: string;
  summary: string;
  source: string;
  date: string;
  fake_probability: number;
  url: string;
  resolved: boolean;
  countermeasure_url: string;
  isSelected: boolean;
  isDashboard: boolean;
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  title,
  summary,
  source,
  date,
  fake_probability,
  url,
  resolved,
  countermeasure_url,
  isSelected,
  isDashboard,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const bgColor = () => {
    if (isDashboard) {
      return colors.primary[400];
    } else {
      return isSelected ? colors.primary[700] : colors.primary[400];
    }
  };
  return (
    <Box sx={{ backgroundColor: bgColor }}>
      <Grid container>
        <Grid size={8}>
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
        </Grid>

        <Grid
          size={4}
          sx={{
            padding: "10px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>{`Fake`}</Typography>
            <Typography>{`${fake_probability}%`}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>{resolved ? 'Resolved' : 'Unresolved'}</Typography>
            {resolved ? <CheckCircleOutlinedIcon sx={{color: '#008000'}} /> : <CancelOutlinedIcon sx={{color: '#FF0000'}}/>}
          </Box>
        </Grid>
      </Grid>
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

interface CommunityComponentProps {
  onCardClick: (url: string | null) => void;
  isDashboard: boolean;
}

const CommunityComponent: React.FC<CommunityComponentProps> = ({
  onCardClick,
  isDashboard,
}) => {
  const newsUrl =
    "https://raw.githubusercontent.com/hectorcho/ktitan-public/b9eba8782611f033d75f2b671f6dd9e81e4afaa4/fake_cm.json";
  const { data, isLoading, error } =
    useFetchData<CommunityCardProps[]>(newsUrl);
  const [isActive, setIsActive] = useState<number | null>(null);

  const handleCardClick = (url: string, index: number) => {
    if (isActive === index) {
      setIsActive(null);
      onCardClick(null);
    } else {
      setIsActive(index);
    }

    onCardClick(url);
  };

  return (
    <List>
      {!isLoading &&
        !error &&
        data &&
        data.map((row: CommunityCardProps, index: number) => (
          <ListItem
            key={index}
            onClick={() => handleCardClick(row.countermeasure_url, index)}
          >
            <CommunityCard
              title={row.title}
              summary={row.summary}
              source={row.source}
              date={row.date}
              fake_probability={row.fake_probability}
              resolved={row.resolved}
              url={row.url}
              countermeasure_url={row.countermeasure_url}
              isSelected={index === isActive}
              isDashboard={isDashboard}
            />
          </ListItem>
        ))}
    </List>
  );
};

export default CommunityComponent;
