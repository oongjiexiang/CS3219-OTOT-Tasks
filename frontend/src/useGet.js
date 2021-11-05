import { useEffect, useState } from 'react'
const axios = require('axios')

const useGet = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(url)
    axios.get(url)
    .then(response => {
      setData(response.data)
      setIsPending(false);
      console.log("received", data)
    })
    .catch(err => {
      setIsPending(false);
      setError(err.message);  
    })
  }, [url])

  return { data, isPending, error };
}

export default useGet;