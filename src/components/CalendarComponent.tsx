// src/components/CalendarComponent.tsx

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useFetchCalendarData } from "../hooks/useCalendar";
import { Box, CircularProgress, Typography, Alert } from "@mui/material";
import { eventsListUrl } from "../data/urls";

const CalendarComponent: React.FC = () => {
  
  // TODO: Make calendar event type and replace any[]
  const { data, isLoading, error } = useFetchCalendarData(eventsListUrl);

  if (isLoading) {
    return (
      <Box
        sx={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          <Typography>Error</Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <FullCalendar
      height={"75vh"}
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
      initialView="dayGridMonth"
      selectable={true}
      headerToolbar={{
        right: "prev,next today",
        center: "title",
        left: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      }}
      events={data ?? []}
    />
  );
};

export default CalendarComponent;
