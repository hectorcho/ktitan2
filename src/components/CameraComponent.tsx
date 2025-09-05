import { Box, useTheme } from "@mui/material";

import { useState } from "react";
import { tokens } from "../theme";

interface CameraProps {
  ip: string;
  port: string;
  feedNum: string;
}

const CameraComponent: React.FC<CameraProps> = ({ ip, port, feedNum }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const url = `http://${ip}:${port}/${feedNum}`;
  console.log(url);

  return (
    <Box>
      <img src={url} alt={`${feedNum} Feed`} />
    </Box>
  );
};

export default CameraComponent;
