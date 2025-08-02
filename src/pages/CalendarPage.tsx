// src/pages/CalendarPage.tsx

import { Box, useTheme } from "@mui/material";
import Header from "../components/Header";
import { tokens } from "../theme";
import CalendarComponent from "../components/CaldenarComponent";
const CalendarPage: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ m: "20px", display: "flex", flexDirection: "column" }}>
      <Header title="Calendar" subtitle="Important Dates" />

      <Box sx={{ flexGrow: 1, backgroundColor: colors.primary[400] }}>
        <CalendarComponent />
      </Box>
    </Box>
  );
};

export default CalendarPage;
