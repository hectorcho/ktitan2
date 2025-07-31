// src/pages/RiskPage.tsx


import { Box, useTheme } from "@mui/material";
import Header from "../components/Header";
import { tokens } from "../theme";
import LineChart from "../components/LineChart";

const RiskPage: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Box sx={{ m: "20px" }}>
      <Header title="Risk Data" subtitle="Geopolitical Risks" />

      <Box
        sx={{
          height: "75vh",
        }}
      >
        <LineChart
          url="https://raw.githubusercontent.com/hectorcho/ktitan-public/refs/heads/main/gpr_daily.csv"
        />
        
      </Box>
    </Box>
  );
};

export default RiskPage;
