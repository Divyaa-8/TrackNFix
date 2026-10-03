import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useFetch = (fetcher, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const result = await fetcher();
      setData(result);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, deps);

  return { data, loading, refetch: load };
};

export default useFetch;
