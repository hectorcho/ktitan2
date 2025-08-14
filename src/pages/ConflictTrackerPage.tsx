// src/pages/CommunityFeedPage.tsx

import { Box, FormControl, Grid, InputLabel, MenuItem, Paper, Select, type SelectChangeEvent } from "@mui/material";
import Header from "../components/Header";
// import { tokens } from "../theme";
import ConflictComponent from "../components/ConflictComponent";
import { useEffect, useState } from "react";
import ResolutionComponent from "../components/ResolutionComponent";
import { useConflictSelect } from "../hooks/useConflict";
import type { Conflict } from "../types/interfaces";

interface ConflictSelectProps {
  onSelectChange: (id: string, title: string, path: string) => void
};

const ConflictSelect: React.FC<ConflictSelectProps> = ({ onSelectChange }) => {
  const {data, isLoading, error} = useConflictSelect();
  const [selected, setSelected] = useState<Conflict | null>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      setSelected(data[0]);
      onSelectChange(data[0].id, data[0].title, data[0].path);
    }
  }, [data, onSelectChange]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value);
    onSelectChange(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">분쟁</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected || ''}
          label="분쟁"
          onChange={handleSelectChange}
        >
          {!isLoading &&
            !error &&
            data &&
            data.map((item) => <MenuItem value={item.id}>{item.title}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  )

};

const ConflictTrackerPage: React.FC = () => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
  const [conflictId, setConflictId] = useSt

  return (
    <Box
      sx={{
        m: "20px",
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'hidden',
      }}
    >
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Header title="분쟁 동향 추적" subtitle="" />
        <ConflictSelect />
      </Box>
      
      
        <Grid container spacing={2} sx={{flexGrow: 1, overflowY: 'hidden'}}>
          <Grid size={6} sx={{height: '100%', overflowY: 'auto'}}>
              <ConflictComponent onCardClick={setSelectedIndex} dashboard={false}/>
          </Grid>

          <Grid size={6} sx={{height: '100%', overflowY: 'auto'}}>
            <ResolutionComponent 
              resolutionUrl={selectedIndex}
             />
          </Grid>

        </Grid>
      
    </Box>
  );
};

export default ConflictTrackerPage;
