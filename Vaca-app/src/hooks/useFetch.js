import React from "react";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

export default function useFetch(url) {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(url);
        if (!response.status===200) throw Error("Could not fetch the data");

        const jsonData = await response.data;
        setData(jsonData);
      } catch (error) {
        setError(error.message);
      }
      finally{
        setLoading(false);
      }
    },[url]);

    const reFetch= useCallback(()=>{fetchData()},[fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  
  return { data, loading, error, reFetch };
}
