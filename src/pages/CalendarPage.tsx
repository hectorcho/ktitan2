// src/pages/CalendarPage.tsx

import { Box, useTheme } from "@mui/material";
import Header from "../components/Header";
import { tokens } from "../theme";
import CalendarComponent from "../components/CalendarComponent";
const CalendarPage: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ m: "20px", display: "flex", flexDirection: "column" }}>
      <Header title="캘린더" subtitle="중요 이벤트 캘린더" />

      <Box sx={{ flexGrow: 1, backgroundColor: colors.primary[400] }}>
        <CalendarComponent />
      </Box>
    </Box>
  );
};

export default CalendarPage;
