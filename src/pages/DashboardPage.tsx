// src/pages/DashboardPage.tsx

import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import KeywordBox from "../components/KeywordBox";
import Header from "../components/Header";
import MapComponent from "../components/MapComponent";

const DashboardPage: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{ m: "20px" }}>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: '20px'
        }}
      >
        <Header title="K-Titan" subtitle="조용현님 환영합니다" />

        {/* KEYWORD BOXES */}
        <Box
          sx={{
            width: "50%",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridAutoRows: "50px",
            gridAutoColumns: "auto",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              gridColumn: "span 3",
              backgroundColor: `${colors.primary[400]}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <KeywordBox title="미국" subtitle="News" />
          </Box>
          <Box
            sx={{
              gridColumn: "span 3",
              backgroundColor: `${colors.primary[400]}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <KeywordBox title="미국" subtitle="News" />
          </Box>
          <Box
            sx={{
              gridColumn: "span 3",
              backgroundColor: `${colors.primary[400]}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <KeywordBox title="미국" subtitle="News" />
          </Box>
          <Box
            sx={{
              gridColumn: "span 3",
              backgroundColor: `${colors.primary[400]}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <KeywordBox title="미국" subtitle="News" />
          </Box>

          <Box
            sx={{
              gridColumn: "span 3",
              backgroundColor: `${colors.primary[400]}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <KeywordBox title="미국" subtitle="News" />
          </Box>
          <Box
            sx={{
              gridColumn: "span 3",
              backgroundColor: `${colors.primary[400]}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <KeywordBox title="미국" subtitle="News" />
          </Box>
          <Box
            sx={{
              gridColumn: "span 3",
              backgroundColor: `${colors.primary[400]}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <KeywordBox title="미국" subtitle="News" />
          </Box>
          <Box
            sx={{
              gridColumn: "span 3",
              backgroundColor: `${colors.primary[400]}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <KeywordBox title="미국" subtitle="News" />
          </Box>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "20px",
          gridAutoRows: '35vh'
        }}
      >
        {/* ROW 1 */}
        <Box
          sx={{
            gridColumn: "span 8",
            backgroundColor: `${colors.primary[400]}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>LineChart</Typography>
        </Box>

        <Box
          sx={{
            gridColumn: "span 4",
            backgroundColor: `${colors.primary[400]}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MapComponent initialPosition={[36.3504, 144.3845]} zoomLevel={2}/>
        </Box>

        <Box
          sx={{
            gridColumn: "span 6",
            backgroundColor: `${colors.primary[400]}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>News</Typography>
        </Box>

        <Box
          sx={{
            gridColumn: "span 6",
            backgroundColor: `${colors.primary[400]}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Community</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
