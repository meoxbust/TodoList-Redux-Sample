import { useEffect, useState } from "react";

const useFetch = (key: string, callback: Function) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await callback();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [key]);

  return { data, error, loading };
};

export default useFetch;
