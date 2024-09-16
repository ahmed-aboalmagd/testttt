import { useEffect, useState } from "react";

export default function useFetch(apiUrl) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl)
      .then((res) => {
        if (res.status == 200) return res.json();
        else throw new Error(`Response Status: ${res.status}`);
      })
      .then((apiData) => {
        setData(apiData);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiUrl]);
  return { data, loading, error };
}
