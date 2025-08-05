// src/pages/NewsFeedPage.tsx


import { Box, Grid } from "@mui/material";
import Header from "../components/Header";
import { useState } from "react";
import ResolutionComponent from "../components/ResolutionComponent";
import NewsComponent from "../components/NewsComponent";
const NewsFeedPage: React.FC = () => {
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
      <Header title="News Feed" subtitle="Daily News" />
      
        <Grid container spacing={2} sx={{flexGrow: 1, overflowY: 'hidden'}}>
          <Grid size={6} sx={{height: '100%', overflowY: 'auto'}}>
            <NewsComponent onCardClick={setSelectedIndex} isDashboard={false}/>
            
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

export default NewsFeedPage;
