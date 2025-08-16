// src/hooks/useMapDialog.ts

import { useState, useEffect, useCallback } from "react";
import type { FetchResult, CalendarEvent } from "../types/interfaces";

export const useFetchCalendarData = (
  url: string
): FetchResult<CalendarEvent[]> => {
  const [data, setData] = useState<CalendarEvent[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const result: CalendarEvent[] = await response.json();
        setData(result);
      } catch (err: any) {
        const errMsg = `ERROR: Failed to fetch final report. ${err.message}`;
        setError(errMsg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);
  return { data, isLoading, error };
};

export const useCalendarDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);
  const [data, setData] = useState<string>("Loading content...");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenDialog = useCallback(async (url: string) => {
    setId(url);
    setOpen(true);
    setIsLoading(true);
    setError(null);
    setData("Fetching event data...");

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }

      const result = await response.text();
      setData(result);
    } catch (err) {
      setError('Failed to load');
      setData('Error loading data');

    } finally {
      setIsLoading(false)
    }
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpen(false);
    setId(null);
    setData('Loading content');
    setIsLoading(false);
    setError(null);
  }, []);

  return {open, data, isLoading, error, handleOpenDialog, handleCloseDialog}
};
