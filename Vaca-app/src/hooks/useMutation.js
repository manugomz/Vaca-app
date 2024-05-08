import { useState, useCallback } from "react";
import axios from "axios";

function useMutation(url, returnData = false, method = "post") {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(
    async (data, id) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios({
          method,
          url: id ? `${url}${id}` : url,
          data: data || null,
        });

        if (!response.status === 200) {
          throw new Error("Failed to perform mutation");
        }

        if (returnData) {
          const responseData = response.data;
          return responseData;
        }
        return;
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [url, method]
  );

  return { mutate, isLoading, error };
}

export default useMutation;
