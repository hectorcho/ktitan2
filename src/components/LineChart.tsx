// src/components/LineChart.tsx

import { useEffect, useState, useMemo } from "react";
import Plot from "react-plotly.js";
import { csvParse } from "d3-dsv";
import type { Data, Layout, Config, Margin, Datum } from "plotly.js";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

interface LineChartProps {
  url: string;
  isDashboard: boolean;
}

interface DataRow {
  date: string;
  value: number;
  [key: string]: any;
}

const LineChart: React.FC<LineChartProps> = ({ url, isDashboard }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [chartData, setChartData] = useState<DataRow[]>([]);

  const [dataCols, setDataCols] = useState<string[]>([]);
  const [dataRows, setDataRows] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dashboard, setDashboard] = useState<boolean>(isDashboard);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();
        console.log("fetched from github");
        // const parsedData: DataRow[] = csvParse(data, (d: any) => {
        //   return {
        //     date: d.DAY,
        //     value: +d.GPRD,
        //   } as DataRow;
        // }) as DataRow[];
        const parsedData = csvParse(data, (d) => d);

        // setChartData(parsedData);
        setDataCols(parsedData.columns);
        setDataRows(parsedData);
      } catch (err) {
        const errMessage = `ERROR: Failed to fetch final report. ${err}`;
        setError(errMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  const traces = useMemo(() => {
    if (dataRows.length === 0 || dataCols.length < 2) return [];

    // Get name of first column to set it to x-axis
    const xName = dataCols[0];
    const xData = dataRows.map((row) => row[xName]);

    // Create a trace for subsequent columns
    const yNames = dataCols.slice(1);

    const lineColors = [
      colors.greenAccent[500],
      colors.redAccent[200],
      colors.blueAccent[300],
    ];

    const generatedTraces = yNames.map((yName, idx) => {
      const trace: Data = {
        x: xData,
        y: dataRows.map((row) => +row[yName]),
        type: "scatter",
        mode: "lines",
        name: yName,
        line: {
          color: lineColors[idx],
        },
      };
      return trace;
    });
    const reversedTraces = [...generatedTraces].reverse();
    return reversedTraces;
  }, [dataRows, dataCols]);

  // const trace1: Data = {
  //   x: chartData.map((row) => row.date),
  //   y: chartData.map((row) => row.value),
  //   mode: "lines",
  //   name: "GPR",
  //   type: "scatter",
  //   line: {
  //     color: colors.greenAccent[400],
  //   },
  // };

  const marginLayout: Partial<Margin> = {
    b: 40,
    t: 40,
    r: 40,
    l: 40,
  };

  const layout: Partial<Layout> = {
    autosize: true,
    margin: dashboard ? marginLayout : undefined,
    showlegend: dashboard ? false : true,
    legend: {
      font: {
        color: colors.grey[100],
      },
    },
    title: {
      text: "GPR Index",
      font: {
        color: colors.grey[100],
      },
    },
    xaxis: {
      title: {
        text: dashboard ? "" : "Date",
        font: {
          color: colors.grey[100],
        },
      },
      tickcolor: colors.grey[100],
      tickfont: {
        color: colors.grey[100],
      },
      rangeselector: {
        buttons: [
          {
            count: 1,
            label: "1m",
            step: "month",
            stepmode: "backward",
          },
          {
            count: 6,
            label: "6m",
            step: "month",
            stepmode: "backward",
          },
          {
            count: 1,
            label: "YTD",
            step: "year",
            stepmode: "todate",
          },
          {
            count: 1,
            label: "1Y",
            step: "year",
            stepmode: "backward",
          },
          {
            step: "all",
            label: "All",
          },
        ],
      },
      rangeslider: dashboard
        ? { visible: false }
        : {
            visible: true,
            thickness: 0.07,
          },
    },
    yaxis: {
      title: {
        text: "GPR Index",
        font: {
          color: colors.grey[100],
        },
      },
      tickcolor: colors.grey[100],
      tickfont: {
        color: colors.grey[100],
      },
      visible: dashboard ? false : true,
    },

    hovermode: "closest",
    plot_bgcolor: colors.primary[400],
    paper_bgcolor: colors.primary[400],
  };

  const config: Partial<Config> = {
    doubleClick: "reset",
    responsive: true,
    displayModeBar: false,
  };
  return (
    <Plot
      data={traces}
      layout={layout}
      config={config}
      style={{ width: "100%", height: "100%" }}
      useResizeHandler={true}
    />
  );
};

export default LineChart;
