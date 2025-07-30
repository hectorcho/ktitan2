import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';

function App() {
  const [theme, colorMode] = useMode();


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          {/* SIDE BAR */}
          <main className='content'>

            {/* TOP BAR */}
            
            

          </main>

        </div>

      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App;
