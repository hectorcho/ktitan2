// src/components/KeywordBox.tsx

import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

interface KeywordBoxProps {
  title: string;
  subtitle: string;
}

const KeywordBox: React.FC<KeywordBoxProps> = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ width: "100%", m: "0 30px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: colors.grey[100] }}
        >
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '2px'}}>
        <Typography
          variant="h5"
          fontStyle='italic'
          sx={{ color: colors.greenAccent[600] }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default KeywordBox;
