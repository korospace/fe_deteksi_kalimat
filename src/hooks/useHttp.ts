// useHttp.ts
import Axios from 'axios';
import useAxios, { configure } from 'axios-hooks';
import { GetLocalToken } from '../utils/Auth';

const axios = Axios.create({
  baseURL: 'http://127.0.0.1:8080/api',
});

configure({ axios });

type HttpProps = {
  url: string;
  headers?: any;
  payload?: any;
  method?: string;
  manual?: boolean;
};

export default function useHttp({ url, payload, method, manual = false, headers }: HttpProps) {
  const [{ data, loading, error }, execute] = useAxios(
    {
      url,
      method,
      data: payload,
      headers: {
        ...headers,
        'Authorization': GetLocalToken(),
      },
    },
    { manual }
  );

  return {
    data,
    loading,
    error,
    execute,
  };
}
