//! Unused
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async (
      url: string,
      method = 'GET',
      data: any = null,
      params: any = null,
      headers: any = {}
    ) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await axios.request({
          url,
          method,
          data,
          params,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = response.data;

        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrl
        );

        if (responseData.status != 'success')
          throw new Error(responseData.message);
        setIsLoading(false);
        return responseData;
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred!'
        );
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => setError(undefined);

  useEffect(
    () => activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort()),
    []
  );

  return { isLoading, error, sendRequest, clearError };
};
