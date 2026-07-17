import { useState, useCallback } from 'react';

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const reset = useCallback((newValues = {}) => {
    setValues(newValues);
    setTouched({});
  }, []);

  const setValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  return { values, touched, handleChange, handleBlur, reset, setValue, setValues };
}
