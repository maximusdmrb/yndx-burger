import React, { useEffect, useState } from "react";
import { Ingredient } from "../pages/constructror/constructor";

const URL_GET_ING = "https://norma.nomoreparties.space/api/ingredients";

export default function useIngredients() {
  const [request, setRequest] = useState<{
    data: Ingredient[];
    loading: boolean;
    error: null | string;
  }>({
    data: [],
    loading: true,
    error: null,
  });
  useEffect(() => {
    setRequest({ ...request, error: null });
    (async () => {
      try {
        const res = await fetch(URL_GET_ING, { method: "GET" });
        setRequest({ ...request, loading: false, data: (await res.json()).data });
      } catch (error) {
        setRequest({ ...request, loading: false, error: "Произошла ошибка" });
      }
    })();
  }, []);
  return request;
}
