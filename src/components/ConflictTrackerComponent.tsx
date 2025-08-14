import React, { useState } from "react";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
// import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import {
  Box,
  Typography,
  useTheme,
  List,
  ListItem,
  Grid,
  Link,
  Divider,
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
      if (data.fakeProbability >= 50) {
        return colors.redAccent[900];
      } else {
        return colors.primary[400];
      }
    } else {
      if (data.fakeProbability >= 50) {
        return isSelected ? colors.redAccent[800] : colors.redAccent[900];
      } else {
        return isSelected ? colors.primary[800] : colors.primary[400];
      }
    }
  };
  return (
    <Box sx={{ backgroundColor: bgColor, width: "100%" }}>
      <Grid container>
        <Grid size={8}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            <Link
              href={data.url}
              target="_blank"
              rel="noopener"
              color="inherit"
            >
              [{data.source}] {data.title}
            </Link>
          </Typography>

          <Typography
            
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 1, // <-- Number of lines to show
              WebkitBoxOrient: "vertical",
            }}
          >
            {data.summary}
          </Typography>
          <Box sx={{ padding: "3px"}}>
            <Grid container>
              <Grid size={4}>
                <Typography variant="h5">
                  <VisibilityIcon
                    sx={{ fontWeight: "bold", verticalAlign: "middle" }}
                  />{" "}
                  {data.views}
                </Typography>
              </Grid>

              <Grid size={4}>
                <Typography variant="h5" sx={{}}>
                  <FavoriteIcon
                    sx={{ fontWeight: "bold", verticalAlign: "middle", color: "#FF0000" }}
                  />{" "}
                  {data.likes}
                </Typography>
              </Grid>

              <Grid size={4}>
                <Typography variant="h5">
                  <CommentIcon
                    sx={{ fontWeight: "bold", verticalAlign: "middle" }}
                  />{" "}
                  {data.comments}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Typography>{`${data.categories}, ${data.date}`}</Typography>
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
            <Typography variant="h4" fontWeight={"bold"}>{`Fake`}</Typography>
            <Typography variant="h4" fontWeight={"bold"}>{`${data.fakeProbability}%`}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">{data.resolved ? "조치완료" : "미조치"}</Typography>
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
    <>
      <List sx={{padding: '0px'}}>
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
        <Divider />
      </List>
    </>
  );
};

export default CommunityComponent;
