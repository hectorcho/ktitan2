// src/pages/RiskPage.tsx

import { useState } from "react";
import { Box } from "@mui/material";
import Header from "../components/Header";
// import { tokens } from "../theme";
import LineChart from "../components/LineChart";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";

interface ChartSelectProps {
  onChartChange: (url: string, title: string) => void;
}

interface ChartOption {
  url: string;
  title: string;
}

const ChartSelect: React.FC<ChartSelectProps> = ({ onChartChange }) => {
  const [selected, setSelected] = useState<ChartOption | null>(null);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedOption = JSON.parse(event.target.value) as ChartOption;
    setSelected(selectedOption);
    onChartChange(selectedOption.url, selectedOption.title);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">지표</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected ? JSON.stringify(selected) : ""}
          label="지표"
          onChange={handleChange}
        >
          <MenuItem
            value={JSON.stringify({
              title: "Geopolitical Risk Index",
              url: "https://raw.githubusercontent.com/hectorcho/ktitan-public/refs/heads/main/gpr_daily.csv",
            })}
          >
            Geopolitical Risk Index
          </MenuItem>
          <MenuItem
            value={JSON.stringify({
              title: "Geopolitical Risk Index - Korea Historical",
              url: "https://raw.githubusercontent.com/hectorcho/ktitan-public/refs/heads/main/gpr_kor_historical.csv",
            })}
          >
            Geopolitical Risk Index - Korea Historical
          </MenuItem>
          <MenuItem
            value={JSON.stringify({
              title: "PMESII",
              url: "https://raw.githubusercontent.com/hectorcho/ktitan-public/refs/heads/main/pmesii_20241215_20250731.csv",
            })}
          >
            PMESII
          </MenuItem>
          <MenuItem
            value={
              "https://raw.githubusercontent.com/hectorcho/ktitan-public/refs/heads/main/pmesiid_2025-08-04.csv"
            }
          >
            PMESII Simulated
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

const RiskPage: React.FC = () => {
  const [url, setUrl] = useState<string>(
    "https://raw.githubusercontent.com/hectorcho/ktitan-public/refs/heads/main/pmesii_20241215_20250731.csv"
  );
  const [title, setTitle] = useState<string>("PMESII");

  const handleChartChange = (newUrl: string, newTitle: string) => {
    setUrl(newUrl);
    setTitle(newTitle);
  };

  return (
    <Box
      sx={{ m: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between", // Aligns headers to the left and right
          alignItems: "center", // Vertically centers the headers
        }}
      >
        <Header title="정세 판단 지표" subtitle="" />
        <ChartSelect onChartChange={handleChartChange} />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <LineChart url={url} isDashboard={false} title={title} />
      </Box>
    </Box>
  );
};

export default RiskPage;
