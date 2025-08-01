// src/pages/RiskPage.tsx


import { Box, useTheme } from "@mui/material";
import Header from "../components/Header";
import { tokens } from "../theme";
import LineChart from "../components/LineChart";

const RiskPage: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Box sx={{ m: "20px", display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Header title="Risk Data" subtitle="Geopolitical Risks" />

      <Box
        sx={{
          flexGrow: 1
        }}
      >
        <LineChart
          url="https://raw.githubusercontent.com/hectorcho/ktitan-public/refs/heads/main/gpr_daily.csv"
          isDashboard={false}
        />
        
      </Box>
    </Box>
  );
};

export default RiskPage;
