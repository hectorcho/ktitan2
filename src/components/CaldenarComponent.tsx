// src/components/CalendarComponent.tsx

import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material";

const CalendarComponent: React.FC = () => {
  return (
    
      <FullCalendar
        height={"70vh"}  
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
      />
    
      
    
  );
};

export default CalendarComponent;
