import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';

function useFetch() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { searchValue } = useContext(StoreContext);
    // useEffect(() => {
    const fetchData = async ({ url, method = 'GET', body = null }) => {
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
    // fetchData();
    // }, [url]);

    return { data, loading, error, fetchData };
}

export default useFetch;