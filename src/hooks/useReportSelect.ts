import { useState, useEffect } from "react";
import type { FetchResult } from "../types/interfaces";
import { HttpError } from "../errors/HttpError";
import { availableDatesUrl } from "../data/urls";

export const useReportSelect = (): FetchResult<string[]> => {
  const [data, setData] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(availableDatesUrl);
        if (!response.ok) {
          const errorDetails = await response.json().catch(() => { });
          throw new HttpError(response.status, undefined, errorDetails);
        }
        const result: string[] = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof HttpError) {
          setError(err);
          console.error(`Caught HttpError: (Status: ${err.status}): ${err.message}`);
        } else if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('An unknown error occured: useFetchCommunityData'));
        }

      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error }
};