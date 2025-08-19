// src/pages/NewsFeedPage.tsx

import { Box, Drawer, Grid, Paper } from "@mui/material";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import ResolutionComponent from "../components/ResolutionComponent";
import NewsComponent from "../components/NewsComponent";
import type { NewsData } from "../types/interfaces";
const NewsFeedPage: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
  const [activeData, setActiveData] = useState<NewsData | null>(null);
  const [firstGridWidth, setFirstGridWidth] = useState<number>(6);
  const [secondGridWidth, setSecondGridWidth] = useState<number>(6);
  
  useEffect(() => {
    if (selectedIndex !== null) {
      setFirstGridWidth(3);
      setSecondGridWidth(9);
    } else {
      setFirstGridWidth(6);
      setSecondGridWidth(6);
    }
    console.log(selectedIndex)
  }, [selectedIndex])

  const handleCardClick = (url: string | null, cardData: NewsData | null) => {
    setSelectedIndex(url);
    setActiveData(cardData);
    console.log(cardData)
  };

  return (
    <Box
      sx={{
        m: "20px",
        display: "flex",
        flexDirection: "column",
        overflowY: "hidden",
      }}
    >
      <Header title="국내 주요 뉴스" subtitle="" />

      {/* <Box sx={{ display: "flex" }}>
        <NewsComponent onCardClick={setSelectedIndex} isDashboard={false} />

        <Drawer anchor="right" open={selectedIndex !== null}>
          <Box sx={{ width: "50vw", height: "50vh", padding: 2 }}>
            <ResolutionComponent resolutionUrl={selectedIndex} />
          </Box>
        </Drawer>
      </Box> */}

      <Grid container spacing={2} sx={{flexGrow: 1, overflowY: 'hidden'}}>
          <Grid size={firstGridWidth} sx={{height: '100%', overflowY: 'auto'}}>
            <NewsComponent onCardClick={handleCardClick} isDashboard={false}/>
          </Grid>

          <Grid size={secondGridWidth} sx={{height: '100%', overflowY: 'auto'}}>
            <ResolutionComponent 
              resolutionUrl={selectedIndex}
             />
          </Grid>

        </Grid>
    </Box>
  );
};

export default NewsFeedPage;
