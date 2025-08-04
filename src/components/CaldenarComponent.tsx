// src/components/CalendarComponent.tsx

import FullCalendar from "@fullcalendar/react";
import { formatDate, type EventSourceInput } from "@fullcalendar/core/index.js";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { useFetchCalendarData } from "../hooks/useCalendar";

const CalendarComponent: React.FC = () => {
  const eventsUrl = 'https://raw.githubusercontent.com/hectorcho/ktitan-public/refs/heads/main/events_2025.json';
  // TODO: Make calendar event type and replace any[]
  const {data, isLoading, error} = useFetchCalendarData<any[]>(eventsUrl);

  return (
    
      <FullCalendar
        height={"75vh"}  
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          right: 'prev,next today',
          center: 'title',
          left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        events={data ?? []}
      />
    
      
    
  );
};

export default CalendarComponent;
