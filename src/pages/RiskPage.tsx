// src/pages/RiskPage.tsx

import { Box, useTheme } from "@mui/material";

import Header from "../components/Header";
import { tokens } from "../theme";

import Plot from "react-plotly.js";
import type { PlotData, Layout, Config } from "plotly.js";

const RiskPage: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const data = [
    {
      x: [1, 2, 3, 4, 5],
      y: [2, 6, 3, 8, 4],
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "red" },
    },
  ];

  const layout: Partial<Layout> = {
    autosize: true, // This is key!
    margin: { l: 50, r: 50, t: 50, b: 50 },
  };

  const config: Partial<Config> = {
    responsive: true, // This makes it responsive
    displayModeBar: false,
  };

  return (
    <Box sx={{ m: "20px" }}>
      <Header title="Risk Data" subtitle="Geopolitical Risks" />

      <Box
        sx={{
          height: "75vh",
          border: `1px solid ${colors.grey[100]}`,
          borderRadius: "4px",
        }}
      >
        <Plot
          data={[
            {
              x: [1, 2, 3, 4, 5],
              y: [2, 6, 3, 8, 4],
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "red" },
            },
          ]}
          layout={layout}
          config={config}
          style={{ width: "100%", height: "100%" }}
          useResizeHandler={true}
        />
      </Box>
    </Box>
  );
};

export default RiskPage;
