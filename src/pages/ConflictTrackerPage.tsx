// src/pages/CommunityFeedPage.tsx

import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import Header from "../components/Header";
// import { tokens } from "../theme";
import ConflictComponent from "../components/ConflictComponent";
import { useState } from "react";
import { useConflictSelect } from "../hooks/useConflict";
import type { Conflict } from "../types/interfaces";

interface ConflictSelectProps {
  onSelectChange: (id: string, title: string, path: string) => void;
}

const ConflictSelect: React.FC<ConflictSelectProps> = ({ onSelectChange }) => {
  const { data, isLoading, error } = useConflictSelect();
  const [selected, setSelected] = useState<Conflict | null>(null);

  const handleSelectChange = (event: SelectChangeEvent) => {
    const selectedOption = JSON.parse(event.target.value) as Conflict;
    setSelected(selectedOption);
    onSelectChange(
      selectedOption.id,
      selectedOption.title,
      selectedOption.path
    );
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">분쟁</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected ? JSON.stringify(selected) : ""}
          label="분쟁"
          onChange={handleSelectChange}
        >
          {!isLoading &&
            !error &&
            data &&
            data.map((item) => (
              <MenuItem
                value={JSON.stringify({
                  title: item.title,
                  id: item.id,
                  path: item.path,
                })}
              >
                {item.title}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

const ConflictTrackerPage: React.FC = () => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  // const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
  const [, setSelectedIndex] = useState<string | null>(null);
  // const [conflict, setConflict] = useState<Conflict | null>(null);
  const [conflictId, setConflictId] = useState<string>('korean_peninsula');
  const [conflictTitle, setConflictTitle] = useState<string>('대한민국-북한 한반도 분쟁');
  const [, setConflictPath] = useState<string | null>(null);

  const handleSelectChange = (newId: string, newTitle: string, newPath: string) => {
    console.log(newId, newTitle, newPath);
    setConflictId(newId);
    setConflictTitle(newTitle);
    setConflictPath(newPath);
  }

  return (
    <Box
      sx={{
        m: "20px",
        display: "flex",
        flexDirection: "column",
        overflowY: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Header title="분쟁 동향 추적" subtitle={conflictTitle} />
        <ConflictSelect onSelectChange={handleSelectChange}/>
      </Box>

      <Grid container spacing={2} sx={{ flexGrow: 1, overflowY: "hidden", justifyContent: 'center', alignItems: 'center' }}>
        <Grid size={8} sx={{ height: "100%", overflowY: "auto" }}>
          <ConflictComponent onCardClick={setSelectedIndex} dashboard={false} conflictId={conflictId}/>
        </Grid>

        {/* <Grid size={6} sx={{ height: "100%", overflowY: "auto" }}>
          <ResolutionComponent resolutionUrl={selectedIndex} />
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default ConflictTrackerPage;
