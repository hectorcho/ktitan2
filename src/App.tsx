import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import MapComponent from './components/MapComponent';
import MapPage from './pages/MapPage';
import RiskPage from './pages/RiskPage';

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
          
          <main className='content'>
            <Topbar />
            <Routes>
              <Route path='/map' element={<MapPage />} />
              <Route path='/riskdata' element={<RiskPage />} />
            </Routes>
            


            {/* TOP BAR */}
            
            

          </main>

        </div>

      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App;
