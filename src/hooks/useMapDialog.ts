// src/hooks/useMapDialog.ts

import { useState, useCallback } from "react";
import type { Country } from "../types/interfaces";
import { countryReportsUrl } from "../data/urls";

// function objectToMarkdown(obj: any, indent = "") {
//   let markdown = "";

//   for (const key in obj) {
//     if (Object.prototype.hasOwnProperty.call(obj, key)) {
//       const value = obj[key];
//       const newIndent = indent + "  "; // Two spaces for indentation

//       if (typeof value === "object" && value !== null) {
//         if (Array.isArray(value)) {
//           markdown += `${indent}- **${key}**: \n`;
//           value.forEach((item, index) => {
//             if (typeof item === "object" && item !== null) {
//               markdown += `${newIndent}  - Item ${index + 1}:\n`;
//               markdown += objectToMarkdown(item, newIndent + "    ");
//             } else {
//               markdown += `${newIndent}  - ${item}\n`;
//             }
//           });
//         } else {
//           // Nested object
//           markdown += `${indent}- **${key}**:\n`;
//           markdown += objectToMarkdown(value, newIndent);
//         }
//       } else {
//         // Primitive value
//         markdown += `${indent}- **${key}**: ${value}\n`;
//       }
//     }
//   }
//   return markdown;
// }

export const getKstDate = (): string => {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul",
  };

  const formattedDate = new Intl.DateTimeFormat("fr-CA", options).format(
    currentDate
  );
  return formattedDate;
};

export const useMapDialog = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [dialogContent, setDialogContent] =
    useState<string>("Loading content...");
  const [dialogIsLoading, setDialogIsLoading] = useState<boolean>(false);
  const [dialogLoadingError, setDialogLoadingError] = useState<string | null>(
    null
  );

  const handleOpenDialog = useCallback(async (country: Country) => {
    setSelectedCountry(country);
    setOpenDialog(true);
    setDialogIsLoading(true);
    setDialogLoadingError(null);
    setDialogContent("Fetching data...");

    try {
      const currDate = getKstDate();
      console.log(currDate);
      const fetchUrl = `${countryReportsUrl}/${currDate}/${country.code}_report.md`;
      const response = await fetch(fetchUrl);

      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }

      const data = await response.text();
      // console.log(data);
      // console.log(objectToMarkdown(data));
      setDialogContent(data);
    } catch (err) {
      setDialogLoadingError("Failed to load");
      setDialogContent("Error loading data");
      console.error(err);
    } finally {
      setDialogIsLoading(false);
    }
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
    setSelectedCountry(null);
    setDialogContent("Loading content...");
    setDialogIsLoading(false);
    setDialogLoadingError(null);
  }, []);

  return {
    openDialog,
    selectedCountry,
    dialogContent,
    dialogIsLoading,
    dialogLoadingError,
    handleOpenDialog,
    handleCloseDialog,
  };
};
