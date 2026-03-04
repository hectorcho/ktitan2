import { useEffect, useState } from "react";
import type { Keyword, FetchResult } from "../types/interfaces";
import { HttpError } from "../errors/HttpError";
import { keywordListUrl } from "../data/urls";

export const useKeywordList = (): FetchResult<Keyword[]> => {
  const [data, setData] = useState<Keyword[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(keywordListUrl);
        if (!response.ok) {
          const errorDetails = await response.json().catch(() => { });
          throw new HttpError(response.status, undefined, errorDetails);
        }
        const result: Keyword[] = await response.json();
        setData(result);
        console.log('Fuck:', result)
      } catch (err) {
        if (err instanceof HttpError) {
          setError(err);
          console.error(`Caught HttpError: (Status: ${err.status}): ${err.message}`);
        } else if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('An unknown error occured: useKeywordList'));
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading, error }
}