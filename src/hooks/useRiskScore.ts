import { useState, useEffect } from "react";
import type { FetchResult } from "../types/interfaces";
import { HttpError } from "../errors/HttpError";
import { csvParse } from "d3-dsv";
// import { koreaRiskScoreUrl } from "../data/urls";


export const useRiskScore = (url: string): FetchResult<any[]> => {
  const [data, setData] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          const errorDetails = await response.text().catch(() => { });
          throw new HttpError(response.status, undefined, errorDetails);
        }
        const result = await response.text();
        const parsedResult = csvParse(result, (d) => {
          if (d['mean'] !== undefined) {
            return { ['mean']: d['mean'], ['day']: d['day'] }
          }
          return null;
        });
        setData(parsedResult);


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

  return { data, isLoading, error }
};