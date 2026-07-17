import { useState, useEffect, useCallback } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || '';

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Serializar options para la dependencia de useCallback
  const serializedOptions = JSON.stringify(options);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fullUrl = url.startsWith('http') ? url : `${API_BASE}${url}`;
      const res = await fetch(fullUrl, JSON.parse(serializedOptions || '{}'));
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  }, [url, serializedOptions]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
