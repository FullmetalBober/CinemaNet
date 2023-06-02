import axios, { AxiosError } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import Toast from '../components/UI/Toast';

interface IProps {
  url: string;
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH';
  data?: any;
  params?: any;
  showSuccessMsg?: string;
  showErrMsg?: boolean;
}

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);

  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async ({
      url,
      method,
      data,
      params,
      showSuccessMsg,
      showErrMsg,
    }: IProps) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await axios.request({
          url,
          method: method || 'GET',
          data,
          params,
          signal: httpAbortCtrl.signal,
        });

        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrl
        );
        if (showSuccessMsg)
          Toast({
            type: 'success',
            message: showSuccessMsg,
            duration: 3000,
          });

        setIsLoading(false);
        return response;
      } catch (error) {
        if (!showErrMsg) return;
        let message = 'Something went wrong!';
        if (error instanceof AxiosError) message = error.response?.data.message;
        Toast({
          type: 'error',
          message,
          duration: 3000,
        });
        setIsLoading(false);
        if (error instanceof Error && error.name !== 'CanceledError')
          throw error;
      }
    },
    []
  );

  useEffect(
    () => activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort()),
    []
  );

  return { isLoading, sendRequest };
};
