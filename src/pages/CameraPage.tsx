// src/pages/CameraPage.tsx

import { useState } from "react";
import { Box, Grid } from "@mui/material";
import Header from "../components/Header";
import CameraComponent from "../components/CameraComponent";
import LineChart from "../components/LineChart";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";

// interface CameraProps {
//   ip: string;
//   port: string;
// }

// const ConfigInput: React.FC

const CameraPage: React.FC = () => {
  return (
    <Box
      sx={{ m: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}
    >
      <Header title="Camera Module" subtitle="" />
      <Grid container spacing={1} sx={{ flexGrow: 1, overflowY: "hidden" }}>
        <Grid size={6}>
          <CameraComponent
            ip="172.20.10.2"
            port="5000"
            feedNum="camera1_feed"
          />
        </Grid>
        <Grid size={6}>
          <CameraComponent
            ip="172.20.10.2"
            port="5000"
            feedNum="camera2_feed"
          />
        </Grid>
        <Grid size={6}>
          <CameraComponent
            ip="172.20.10.2"
            port="5000"
            feedNum="camera3_feed"
          />
        </Grid>
        <Grid size={6}>
          <CameraComponent ip="172.20.10.2" port="5000" feedNum="visual_feed" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CameraPage;
