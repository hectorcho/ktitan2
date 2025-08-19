// src/pages/DashboardPage.tsx

import {
  Box,
  Typography,
  useTheme,
  Grid,
} from "@mui/material";
import { tokens } from "../theme";
import KeywordBox from "../components/KeywordBox";
import Header from "../components/Header";
import MapComponent from "../components/MapComponent";
import LineChart from "../components/LineChart";
// import { useNavigate } from "react-router-dom";
import NewsComponent from "../components/NewsComponent";
import CommunityComponent from "../components/CommunityComponent";
import RiskScoreComponent from "../components/RiskScoreComponent";
// import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

const DashboardPage: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  

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
        <Header title={"IIFA 대시보드"} subtitle="" />
        <RiskScoreComponent />

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
            <Typography variant="h3">국내 관심 키워드</Typography>
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
            <KeywordBox title="한미 동맹" subtitle="" quantity={2} />
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
            <KeywordBox title="북한 핵 발사" subtitle="" quantity={1} />
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
            <KeywordBox title="전쟁 발발" subtitle="" quantity={1} />
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
            <KeywordBox title="중국" subtitle="" quantity={-1} />
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
            <KeywordBox title="주한미군 철수" subtitle="" quantity={2}/>
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
            <KeywordBox title="동원 응소" subtitle="" quantity={1}/>
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
            <KeywordBox title="북한" subtitle="" quantity={1}/>
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
            <KeywordBox title="반전시위" subtitle="" quantity={-1}/>
          </Box>
        </Box>
      </Box>

      {/* STUFF */}
      <Grid container spacing={1} sx={{ flexGrow: 1, overflowY: "hidden" }}>
        <Grid size={7} sx={{ height: "50%" }}>
          {/* <LineChart
            url="https://raw.githubusercontent.com/hectorcho/ktitan-public/refs/heads/main/pmesii_20241215_20250731.csv"
            isDashboard={true}
            title="PMESII"
          /> */}
          <LineChart
            url="https://raw.githubusercontent.com/hectorcho/ktitan-public/refs/heads/main/pmesii_20241215_20250731_new_format.csv"
            isDashboard={true}
            title="PMESII 위험지수"
          />
        </Grid>

        <Grid size={5} sx={{ height: "50%" }}>
          <MapComponent initialPosition={[37.5665, 126.978]} zoomLevel={1} isDashboard={true}/>
        </Grid>

        <Grid
          size={6}
          sx={{
            backgroundColor: colors.primary[400],
            height: "50%",
            overflowY: "auto",
          }}
        >
          <Typography variant="h4" fontWeight={"bold"} padding={'5px'}>
            국내 주요 뉴스
          </Typography>
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
          <Typography variant="h4" fontWeight={"bold"} padding={'5px'}>
            허위정보 탐지
          </Typography>
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
