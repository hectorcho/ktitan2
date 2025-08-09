// src/pages/ReportPage.tsx

import { Box, useTheme } from "@mui/material";
import Header from "../components/Header";
import { tokens } from "../theme";
import ReportComponent from "../components/ReportComponent";
const ReportPage: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ m: "20px", display: "flex", flexDirection: "column", overflowY: 'hidden' }}>
      <Header title="일일 정세 보고" subtitle="" />

      <Box sx={{ flexGrow: 1, backgroundColor: colors.primary[400], overflowY: 'auto', }}>
        <ReportComponent />
      </Box>
    </Box>
  );
};

export default ReportPage;
