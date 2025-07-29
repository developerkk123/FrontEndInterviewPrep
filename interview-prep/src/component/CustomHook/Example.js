import React from 'react';

function useFetch(url) {
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
  
    React.useEffect(() => {
      let ismounted = true; // Track if the component is mounted
      const fetData = async () => {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const res = await response.json();
          if (ismounted) {
            setData(res);
            setLoading(false);
          }
        } catch (err) {
          if (ismounted) {
            setError(err.message);
            setLoading(false);
          }
        }
      };
      fetData();
      // unmount cleanup function
      return () => {
        ismounted = false;
      };
    }, [url]);
  
    return { data, loading, error };
  }
  export default useFetch;