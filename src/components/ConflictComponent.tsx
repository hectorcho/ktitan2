import React, { useState } from "react";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import {
  Box,
  Typography,
  useTheme,
  List,
  ListItem,
  Grid,
  Link,
  Divider,
  type SvgIconProps
} from "@mui/material";
import { tokens } from "../theme";
import type {
  CommunityComponentProps,
  CommunityData,
  ConflictCardProps,
  ConflictConditionStatus,
  ConflictEvent,
  ConflictComponentProps
} from "../types/interfaces";
import { useFetchCommunityData } from "../hooks/useCommunity";
import { communityDataListUrl } from "../data/urls";
import type { JSX } from "react";

interface RenderIconProps {
  condition: ConflictConditionStatus;
}

const renderIcon = ({condition}: RenderIconProps): JSX.Element => {
  const iconProps: SvgIconProps = {
    sx: {fontSize: 'inherit', fontWeight: 'inherit', verticalAlign: 'middle'}
  };

  if (condition == "improved") {
    return <TrendingUpIcon {...iconProps} sx={{...iconProps.sx, color: "#4CBB17"}}/>
  } else if (condition == "deteriorated") {
    return <TrendingDownIcon {...iconProps} sx={{...iconProps.sx, color: "#FF7800"}}/>
  } else if (condition == "unchanged") {
    return <HorizontalRuleIcon {...iconProps} sx={{...iconProps.sx}} />
  } else {
    //  if (condition == "critical")
    return <OfflineBoltIcon {...iconProps} sx={{...iconProps.sx, color: "#E60000"}}/>
  }
  
};

const ConflictCard: React.FC<ConflictCardProps> = ({
  data,
  selected,
  dashboard,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const bgColor = () => {
    if (dashboard) {
      return colors.primary[400];
    } else {
      return selected ? colors.primary[800] : colors.primary[400]
    }
  };

  return (
    <Box sx={{ backgroundColor: bgColor, width: "100%", borderRadius: 3, padding: '10px' }}>
      <Grid container>
        <Grid size={8}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {data.title}
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
            <Typography variant="h5">{data.condition}</Typography>
            {renderIcon({condition: data.condition})}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const ConflictComponent: React.FC<ConflictComponentProps> = ({
  onCardClick,
  dashboard,
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
          data.map((row: ConflictEvent, index: number) => (
            <ListItem
              key={index}
              onClick={() => handleCardClick(row.resolutionUrl, index)}
            >
              <ConflictCard      
                data={row}
                selected={index === isActive}
                dashboard={isDashboard}
              />
            </ListItem>
          ))}
        <Divider />
      </List>
    </>
  );
};

export default ConflictComponent;
