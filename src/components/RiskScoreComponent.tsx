import {
  Box,
  CircularProgress,
  Typography,
  type SvgIconProps,
} from "@mui/material";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import HorizontalRuleOutlinedIcon from "@mui/icons-material/HorizontalRuleOutlined";
import { useRiskScore } from "../hooks/useRiskScore";
import { koreaRiskScoreUrl } from "../data/urls";
import type { JSX } from "react";

interface RenderIconProps {
  quantity: number;
}

const renderIcon = ({ quantity }: RenderIconProps): JSX.Element => {
  const iconProps: SvgIconProps = {
    sx: { verticalAlign: "middle" },
    fontSize: "large",
  };

  if (quantity > 0) {
    return (
      <ArrowDropUpOutlinedIcon
        {...iconProps}
        sx={{ ...iconProps.sx, color: "#FF0000" }}
      />
    );
  } else if (quantity < 0) {
    return (
      <ArrowDropDownOutlinedIcon
        {...iconProps}
        sx={{ ...iconProps.sx, color: "#008000" }}
      />
    );
  } else {
    return (
      <HorizontalRuleOutlinedIcon {...iconProps} sx={{ ...iconProps.sx }} />
    );
  }
};

const RiskScoreComponent: React.FC = () => {
  const { data, isLoading, error } = useRiskScore(koreaRiskScoreUrl);
  const mostRecentScore = Math.ceil(data?.[0].mean * 10) / 10;
  console.log(mostRecentScore);
  const mostRecentDate = data?.[0].day;
  let diff = data?.[0].mean - data?.[1].mean;
  diff = Math.ceil(diff * 10) / 10;
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">
          Failed to load risk score. Please try again later
        </Typography>
      ) : (
        <>
          <Typography variant="h3">{mostRecentDate}</Typography>
          <Typography variant="h3">PMESII 위험지수</Typography>
          <Typography variant="h3">
            {mostRecentScore} ({renderIcon({ quantity: diff })}
            {diff})
          </Typography>
        </>
      )}
    </Box>
  );
};

export default RiskScoreComponent;
