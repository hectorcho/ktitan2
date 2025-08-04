// src/pages/DashboardPage.tsx

import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Grid,
} from "@mui/material";
import { tokens } from "../theme";
import KeywordBox from "../components/KeywordBox";
import Header from "../components/Header";
import MapComponent from "../components/MapComponent";
import LineChart from "../components/LineChart";
import { useNavigate } from "react-router-dom";
import NewsComponent from "../components/NewsComponent";
import CommunityComponent from "../components/CommunityComponent";

const DashboardPage: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleBoxClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        m: "20px",
        display: "flex",
        flexDirection: "column",
        overflowY: "hidden",
        flexGrow: 1,
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "20px",
        }}
      >
        <Header title="AI 대시보드" subtitle="조용현님 환영합니다" />

        {/* KEYWORD BOXES */}
        <Box
          sx={{
            width: "70%",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(16, 1fr)",
            gridAutoRows: "50px",
            gridAutoColumns: "auto",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              gridColumn: "span 4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h3">이슈 및 관심 키워드</Typography>
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
            <KeywordBox title="한국" subtitle="News" />
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
            <KeywordBox title="한국" subtitle="News" />
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
            <KeywordBox title="한국" subtitle="News" />
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
            <KeywordBox title="한국" subtitle="News" />
          </Box>

          <Box
            sx={{
              gridColumn: "span 4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h3">군 관심 키워드</Typography>
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
            <KeywordBox title="한국" subtitle="Community" />
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
            <KeywordBox title="한국" subtitle="Community" />
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
            <KeywordBox title="한국" subtitle="Community" />
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
            <KeywordBox title="한국" subtitle="Community" />
          </Box>
        </Box>
      </Box>

      {/* STUFF */}
      <Grid container spacing={1} sx={{ flexGrow: 1, overflowY: "hidden" }}>
        <Grid size={7} sx={{ height: "50%" }}>
          <LineChart
            url="https://raw.githubusercontent.com/hectorcho/ktitan-public/refs/heads/main/pmesiid_2025-08-04.csv"
            isDashboard={true}
          />
        </Grid>

        <Grid size={5} sx={{ height: "50%" }}>
          <MapComponent initialPosition={[37.5665, 126.978]} zoomLevel={1} />
        </Grid>

        <Grid
          size={6}
          sx={{
            backgroundColor: colors.primary[400],
            height: "50%",
            overflowY: "auto",
          }}
        >
          <NewsComponent isDashboard={true} onCardClick={(_url) => {}}/>
        </Grid>

        <Grid
          size={6}
          sx={{
            backgroundColor: colors.primary[400],
            height: "50%",
            overflowY: "auto",
          }}
        >
          <CommunityComponent
            isDashboard={true}
            onCardClick={(_url) => {}}
          />
        </Grid>
      </Grid>

      {/* GRID & CHARTS */}
    </Box>
  );
};

export default DashboardPage;
