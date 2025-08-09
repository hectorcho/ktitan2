// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

// import MapPage from './pages/MapPage';
// import RiskPage from './pages/RiskPage';
// import ReportPage from './pages/ReportPage';
// import DashboardPage from './pages/DashboardPage';
// import KeywordFilterPage from './pages/KeywordFilterPage';
// import CommunityFeedPage from './pages/CommunityFeedPage';
// import CalendarPage from './pages/CalendarPage';
// import NewsFeedPage from './pages/NewsFeedPage';


const MapPage = React.lazy(() => import ('./pages/MapPage'));
const RiskPage = React.lazy(() => import ('./pages/RiskPage'));
const ReportPage = React.lazy(() => import ('./pages/ReportPage'));
const DashboardPage = React.lazy(() => import ('./pages/DashboardPage'));
const KeywordFilterPage = React.lazy(() => import ('./pages/KeywordFilterPage'));
const CommunityFeedPage = React.lazy(() => import ('./pages/CommunityFeedPage'));
const CalendarPage = React.lazy(() => import ('./pages/CalendarPage'));
const NewsFeedPage = React.lazy(() => import ('./pages/NewsFeedPage'));


function App() {
  const [theme, colorMode] = useMode();
  // const [isSidebar, setIsSidebar] = useState<boolean>(true);


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          {/* SIDE BAR */}
          <Sidebar />
          
          <main className='content' style={{display: 'flex', flexDirection: 'column'}}>
            <Topbar />
            <Routes>
              <Route path='/' element={<DashboardPage />} />
              <Route path='/map' element={<MapPage />} />
              <Route path='/riskdata' element={<RiskPage />} />
              <Route path='/report' element={<ReportPage />} />
              <Route path='/kwfilters' element={<KeywordFilterPage />} />
              <Route path='/communityfeed' element={<CommunityFeedPage />} />
              <Route path='/newsfeed' element={<NewsFeedPage />} />
              <Route path='/calendar' element={<CalendarPage />} />
            </Routes>
            


            {/* TOP BAR */}
            
            

          </main>

        </div>

      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App;
