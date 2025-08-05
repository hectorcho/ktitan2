import React, { useState } from "react";
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
import type {
  CommunityCardProps,
  CommunityComponentProps,
  CommunityData,
} from "../types/interfaces";
import { useFetchCommunityData } from "../hooks/useCommunity";
import { communityDataListUrl } from "../data/urls";

const CommunityCard: React.FC<CommunityCardProps> = ({
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
      return isSelected ? colors.primary[700] : colors.primary[400];
    }
  };
  return (
    <Box sx={{ backgroundColor: bgColor }}>
      <Grid container>
        <Grid size={8}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            <Link
              href={data.url}
              target="_blank"
              rel="noopener"
              color="inherit"
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

          <Typography>{`${data.source}, ${data.categories}, ${data.date}`}</Typography>
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
            <Typography>{`${data.fakeProbability}%`}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>{data.resolved ? "Resolved" : "Unresolved"}</Typography>
            {data.resolved ? (
              <CheckCircleOutlinedIcon sx={{ color: "#008000" }} />
            ) : (
              <CancelOutlinedIcon sx={{ color: "#FF0000" }} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const CommunityComponent: React.FC<CommunityComponentProps> = ({
  onCardClick,
  isDashboard,
}) => {
  const { data, isLoading, error } =
    useFetchCommunityData(communityDataListUrl);
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
        data.map((row: CommunityData, index: number) => (
          <ListItem
            key={index}
            onClick={() => handleCardClick(row.resolutionUrl, index)}
          >
            <CommunityCard
              data={row}
              isSelected={index === isActive}
              isDashboard={isDashboard}
            />
          </ListItem>
        ))}
    </List>
  );
};

export default CommunityComponent;
