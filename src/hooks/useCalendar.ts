// src/hooks/useMapDialog.ts

import { useState, useEffect } from "react";
import type { FetchResult } from "../types/interfaces";

export const useFetchCalendarData = <T extends any[]>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
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
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        const errMsg = `ERROR: Failed to fetch final report. ${err.message}`
        setError(errMsg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url])
  return { data, isLoading, error };
};
