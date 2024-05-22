import { useState, useCallback } from "react";
import axios, { AxiosError } from "axios";

function useMutation(url, returnData = false, method = "post") {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = useCallback(
    async (data, id) => {
      setIsLoading(true);

      try {
        const response = await axios({
          method,
          url: id ? `${url}${id}` : url,
          data: data || null,
        });

        if (returnData) {
          const responseData = response.data;
          return responseData;
        }
        return;
      } catch (e) {
        if(e instanceof AxiosError){
          throw new Error(e.response.data.error)
        }else{
          throw new Error(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [url, method]
  );

  return { mutate, isLoading };
}

export default useMutation;
