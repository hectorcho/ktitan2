// src/pages/ReportPage.tsx

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
  type SelectChangeEvent,
} from "@mui/material";
import Header from "../components/Header";
import { tokens } from "../theme";
import ReportComponent from "../components/ReportComponent";
import "react-calendar/dist/Calendar.css";
import { useReportSelect } from "../hooks/useReportSelect";
import { useEffect, useState } from "react";

interface ReportSelectProps {
  onSelectChange: (date: string) => void;
}

const ReportSelect: React.FC<ReportSelectProps> = ({ onSelectChange }) => {
  const { data, isLoading, error } = useReportSelect();
  // data in this case is an array of available dates
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      setSelected(data[0]);
      onSelectChange(data[0]);
    }
  }, [data, onSelectChange]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value);
    onSelectChange(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">날짜</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected || ''}
          label="날짜"
          onChange={handleChange}
        >
          {!isLoading &&
            !error &&
            data &&
            data.map((item) => <MenuItem value={item}>{item}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
};

const ReportPage: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [date, setDate] = useState<string>("");

  return (
    <Box
      sx={{
        m: "20px",
        display: "flex",
        flexDirection: "column",
        overflowY: "hidden",
      }}
    >
      <Box sx={{
          display: "flex",
          justifyContent: "space-between", // Aligns headers to the left and right
          alignItems: "center", // Vertically centers the headers
        }}>
        <Header title="일일 정세 보고" subtitle="" />
        <ReportSelect onSelectChange={setDate} />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: colors.primary[400],
          overflowY: "auto",
        }}
      >
        {date && <ReportComponent date={date} />}
      </Box>
    </Box>
  );
};

export default ReportPage;
