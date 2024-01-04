import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { GetLocalToken } from "../utils/Auth";

// configurasi
axios.defaults.baseURL = 'http://127.0.0.1:8080/api'

type HttpProps = {
  url: string;
  method?: string;
  payload?: any;
  header?: any;
};

export default function useHttp2({ url, method, payload, header }: HttpProps)  {
  const [data, setData]     = useState<any>(null);
  const [error, setError]   = useState<any>(null);
  const [loaded, setLoaded] = useState(false);
  const controllerRef       = useRef(new AbortController());

  const cancel = () => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.request({
          data: payload,
          signal: controllerRef.current.signal,
          method,
          url,
          headers: {
            ...header,
            'Authorization': GetLocalToken()
          }
        });

        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  return { cancel, data, error, loaded };
}