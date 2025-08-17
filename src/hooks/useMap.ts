import { useEffect, useState } from "react";
import type { Country, FetchResult } from "../types/interfaces";
import { HttpError } from "../errors/HttpError";
import { countryListUrl } from "../data/urls";

export const useCountryList = (): FetchResult<Country[]> => {
  const [data, setData] = useState<Country[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(countryListUrl);
        if (!response.ok) {
          const errorDetails = await response.json().catch(() => { });
          throw new HttpError(response.status, undefined, errorDetails);
        }
        const result: Country[] = await response.json();
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
}
