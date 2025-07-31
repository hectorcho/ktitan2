// src/pages/MapPage.tsx

import { Box, useTheme } from "@mui/material";
import MapComponent from "../components/MapComponent";
import Header from "../components/Header";
import { tokens } from "../theme";

const MapPage: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{m: '20px'}}>

      <Header title="Map" subtitle="Map data" />


      <Box sx={{height: '75vh', border: `1px solid ${colors.grey[100]}`, borderRadius: '4px'}}>
        <MapComponent initialPosition={[36.3504, 144.3845]} zoomLevel={2}/>
      </Box>
    </Box>
    
    
  )
};

export default MapPage;