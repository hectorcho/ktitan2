import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul",
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // clean up timerId function during unmount
    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date: Date) => {
    const formattedDate = new Intl.DateTimeFormat("fr-CA", options).format(
      date
    );
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${formattedDate} ${hours}:${minutes}:${seconds}`;
  };

  return <Typography variant="h3">{formatTime(currentTime)}</Typography>;
};

export default Clock;
