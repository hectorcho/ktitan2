// src/App.tsx
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import MapPage from './pages/MapPage';
import RiskPage from './pages/RiskPage';
import ReportPage from './pages/ReportPage';
import DashboardPage from './pages/DashboardPage';
import KeywordFilterPage from './pages/KeywordFilterPage';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState<boolean>(true);


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
            </Routes>
            


            {/* TOP BAR */}
            
            

          </main>

        </div>

      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App;
