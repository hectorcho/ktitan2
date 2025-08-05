// src/pages/CommunityFeedPage.tsx

import { Box, Grid } from "@mui/material";
import Header from "../components/Header";
// import { tokens } from "../theme";
import CommunityComponent from "../components/CommunityComponent";
import { useState } from "react";
import ResolutionComponent from "../components/ResolutionComponent";
const CommunityFeedPage: React.FC = () => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);

  return (
    <Box
      sx={{
        m: "20px",
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'hidden',
      }}
    >
      <Header title="Community Feed" subtitle="Community Feed" />
      
        <Grid container spacing={2} sx={{flexGrow: 1, overflowY: 'hidden'}}>
          <Grid size={6} sx={{height: '100%', overflowY: 'auto'}}>
            <CommunityComponent onCardClick={setSelectedIndex} isDashboard={false}/>
            
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

export default CommunityFeedPage;
