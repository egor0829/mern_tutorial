import {useState, useCallback} from 'react';
import {useAuth} from './auth.hook';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {logout} = useAuth();

  const request = useCallback(async (url, method='GET', body=null, headers = {}) => {
    setLoading(true);
    try {
      if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }

      const res = await fetch(url, {method, body, headers});
      const data = await res.json();

      if(res.status === 401) {
        logout();
      }

      if (!res.ok) {
        throw new Error(data.message || 'smth went wrong');
      }

      setLoading(false);
      return data;
    } catch (error) {
      console.log('request error: ', error);
      setLoading(false);
      setError(error.message);
      throw error;
    }
  }, [logout]);

  const clearError = useCallback(() => setError(null), []);

  return {loading, error, request, clearError};
}