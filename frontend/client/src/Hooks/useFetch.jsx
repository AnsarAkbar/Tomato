import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch({ url, method = 'GET', body = null }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios({
                    url,
                    method,
                    data: body,
                });
                setData(response.data);
            }
            catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
}

export default useFetch;