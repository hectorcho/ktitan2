// src/hooks/useCommunity.ts

import { useState, useEffect } from "react";
import type { FetchResult, CommunityData } from "../types/interfaces";
import { HttpError } from "../errors/HttpError";

export const useFetchCommunityData = (url: string): FetchResult<CommunityData[]> => {
  const [data, setData] = useState<CommunityData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          const errorDetails = await response.json().catch(() => {});
          throw new HttpError(response.status, undefined, errorDetails);
        }
        const result: CommunityData[] = await response.json();
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

  }, [url]);

  return { data, isLoading, error};
};

// const useFetchData = <T extends any[]>(url: string): FetchResult<T> => {
//   const [data, setData] = useState<T | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error(`HTTP Error! status: ${response.status}`);
//         }
//         const result = await response.json();
//         setData(result);
//       } catch (err: any) {
//         const errMessage = `ERROR: Failed to fetch final report. ${err.errMessage}`;
//         setError(errMessage);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [url]);

//   return { data, isLoading, error };
// };