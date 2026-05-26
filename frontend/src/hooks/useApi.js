import { useState, useCallback } from 'react';
export function useFetch(url, options) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const result = await response.json();
            setData(result);
        }
        catch (err) {
            setError(err.message || 'Something went wrong');
        }
        finally {
            setLoading(false);
        }
    }, [url, options]);
    return { data, loading, error, refetch: fetchData };
}
