// src/pages/KeywordFilterPage.tsx

import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../components/Header";
import { tokens } from "../theme";
import LineChart from "../components/LineChart";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

// const columns: GridColDef<(typeof rows)[number]>[] = [
//   { field: "id", headerName: "ID", width: 90 },
//   {
//     field: "keyword",
//     headerName: "Keyword",
//     width: 150,
//     editable: true,
//   },
//   {
//     field: "lastName",
//     headerName: "Last name",
//     width: 150,
//     editable: true,
//   },
//   {
//     field: "age",
//     headerName: "Age",
//     type: "number",
//     width: 110,
//     editable: true,
//   },
//   {
//     field: "fullName",
//     headerName: "Full name",
//     description: "This column has a value getter and is not sortable.",
//     sortable: false,
//     width: 160,
//     valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
//   },
// ];

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "keyword",
    headerName: "Keyword",
    width: 150,
    editable: true,
  }
];

const rows = [
  { id: 1, keyword: "한미동맹" },
  { id: 2, keyword: "방위비 분담" },
  { id: 3, keyword: "북핵" },
  { id: 4, keyword: "파병" },
  { id: 5, keyword: "드론공격" },
  { id: 6, keyword: "태국,캄보디아" },
  { id: 7, keyword: "KF-21" },
  { id: 8, keyword: "방산수출" },
];

const KeywordFilterPage: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{ m: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}
    >
      <Header title="Keyword Filters" subtitle="Filter content by keywords" />

      <Box sx={{ flexGrow: 1 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            
          }}
          sx={{
            fontSize: '16px',
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
            "& .MuiDataGrid-topContainer": {
              backgroundColor: colors.primary[400],
            },
          }}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default KeywordFilterPage;
