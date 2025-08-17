// src/components/CalendarComponent.tsx

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useCalendarDialog, useFetchCalendarData } from "../hooks/useCalendar";
import {
  Box,
  CircularProgress,
  Typography,
  Alert,
  useTheme,
  Dialog,
  AppBar,
  IconButton,
  Toolbar,
} from "@mui/material";
import { eventsListUrl } from "../data/urls";
import type { FetchResult } from "../types/interfaces";
import { tokens } from "../theme";
import CloseIcon from "@mui/icons-material/Close";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface CalendarDialogProps extends FetchResult<string> {
  open: boolean;
  onClose: () => void;
  title: string;
}

const CalendarDialog: React.FC<CalendarDialogProps> = ({
  open,
  onClose,
  title,
  data
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Dialog open={open} onClose={onClose}>
      <AppBar
        sx={{ position: "relative", backgroundColor: colors.primary[400] }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h2" color={colors.grey[100]} fontWeight="bold">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ padding: "30px" }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{data}</ReactMarkdown>
      </div>
    </Dialog>
  );
};

const CalendarComponent: React.FC = () => {
  // TODO: Make calendar event type and replace any[]
  const {
    data: fetchData,
    isLoading: fetchIsLoading,
    error: fetchError,
  } = useFetchCalendarData(eventsListUrl);
  const { open, data, isLoading, error, handleOpenDialog, handleCloseDialog } =
    useCalendarDialog();

  const handleEventClick = (clickInfo: any) => {
    const clickedEvent = clickInfo.event;
    const fullObject = {
      ...clickedEvent.toPlainObject(),
      ...clickedEvent.extendedProps,
    };
    const summaryUrl = fullObject.summaryUrl;
    const eventTitle = fullObject.title;
    handleOpenDialog(eventTitle, summaryUrl)
  };

  if (fetchIsLoading) {
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

  if (fetchError) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          <Typography>Error</Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <div>
      <CalendarDialog
        open={open}
        onClose={handleCloseDialog}
        title={''}
        data={data}
        isLoading={isLoading}
        error={error}
      />

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
      events={fetchData ?? []}
      eventClick={handleEventClick}
    />
    </div>
    
  );
};

export default CalendarComponent;
