// src/pages/RiskPage.tsx

import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../components/Header";
import { tokens } from "../theme";
import LineChart from "../components/LineChart";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';


const ChartSelect: React.FC = () => {

  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )

};


const RiskPage: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ m: "20px", display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'space-between', // Aligns headers to the left and right
          alignItems: 'center', // Vertically centers the headers
        }}
      >
        <Header title="Risk Data" subtitle="Geopolitical Risks" />
        <ChartSelect />
      </Box>
      

      <Box
        sx={{
          flexGrow: 1
        }}
      >
        <LineChart
          url="https://raw.githubusercontent.com/hectorcho/ktitan-public/refs/heads/main/pmesiid_2025-08-03.csv"
          isDashboard={false}
        />
        
      </Box>
    </Box>
  );
};

export default RiskPage;
