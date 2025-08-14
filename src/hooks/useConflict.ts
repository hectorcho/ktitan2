import { useState, useEffect } from "react";
import type { Conflict, FetchResult } from "../types/interfaces";
import { HttpError } from "../errors/HttpError";
import { conflictListUrl } from "../data/urls";

export const useConflictSelect = (): FetchResult<Conflict[]> => {
  const [data, setData] = useState<Conflict[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(conflictListUrl);
        if (!response.ok) {
          const errDetails = await response.json().catch(() => {});
          throw new HttpError(response.status, undefined, errDetails);
        }
        const result: Conflict[] = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof HttpError) {
          setError(err);
          console.error(
            `Caught HttpError: (Status: ${err.status}): ${err.message}`
          );
        } else if (err instanceof Error) {
          setError(err);
        } else {
          setError(
            new Error("An unknown error occured: useFetchCommunityData")
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return { data, isLoading, error };
};

