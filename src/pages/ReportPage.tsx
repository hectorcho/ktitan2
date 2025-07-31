// src/pages/ReportPage.tsx

import { Box, useTheme } from "@mui/material";
import Header from "../components/Header";
import { tokens } from "../theme";
import ReportComponent from "../components/ReportComponent";
const ReportPage: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{m: '20px'}}>

      <Header title="Summary Report" subtitle="Summary of today outlook" />


      <Box sx={{height: '75vh', backgroundColor: colors.primary[400]}}>
        <ReportComponent />
      </Box>
    </Box>
    
    
  )
};

export default ReportPage;