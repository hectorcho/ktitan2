// src/hooks/useCommunity.ts

import { useState, useEffect } from "react";
import type { FetchResult } from "../types/interfaces";
import { HttpError } from "../errors/HttpError";

export const useFetchResolutionData = (url: string | null): FetchResult<string> => {
  const [data, setData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      if (!url) {
        setIsLoading(false)
        setData(null);
        setError(null);
        return;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          const errorDetails = await response.json().catch(() => {});
          throw new HttpError(response.status, undefined, errorDetails);
        }
        const result: string = await response.text();
        setData(result);
      } catch (err) {
        if (err instanceof HttpError) {
          setError(err);
          console.error(`Caught HttpError: (Status: ${err.status}): ${err.message}`);
        } else if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('An unknown error occured: useFetchResolutionData'));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

  }, [url]);

  return { data, isLoading, error};
};