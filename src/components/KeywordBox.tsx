// src/components/KeywordBox.tsx

import { Box, Typography, useTheme, type SvgIconProps } from "@mui/material";
import { tokens } from "../theme";
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';

import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';
import type React from "react";
import type { JSX } from "react";

interface KeywordBoxProps {
  title: string;
  subtitle: string;
  quantity: number;
};

interface RenderIconProps {
  quantity: number;
}

const renderIcon = ({quantity}: RenderIconProps): JSX.Element => {
  const iconProps: SvgIconProps = {
    sx: {fontSize: 'inherit', fontWeight: 'inherit', verticalAlign: 'middle'}
  };

  if (quantity > 0) {
    return <ArrowUpwardOutlinedIcon {...iconProps} sx={{...iconProps.sx, color: "#008000"}}/>
  } else if (quantity < 0) {
    return <ArrowDownwardOutlinedIcon {...iconProps} sx={{...iconProps.sx, color: "#FF0000"}}/>
  } else {
    return <HorizontalRuleOutlinedIcon {...iconProps} sx={{...iconProps.sx}} />
  }
  
};

const KeywordBox: React.FC<KeywordBoxProps> = ({
  title,
  subtitle,
  quantity,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ width: "100%", m: "0 10px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: colors.grey[100] }}
        >
          {title}
        </Typography>

        <Typography variant="h5" fontWeight="bold">
          {renderIcon({quantity})} {quantity}
          
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: "2px" }}>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default KeywordBox;
