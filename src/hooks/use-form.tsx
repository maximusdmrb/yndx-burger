import React, { useState } from "react";

export default function useForm<T>(form: T) {
  const [values, setValues] = useState<T>(form);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return { values, onChange: handleChange, setValues };
}
