import { useEffect, useState } from "react";
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
        const res = await fetch(URL_GET_ING);
        if (!res.ok) {
          throw new Error("Ответ вернул ошибку");
        }
        setRequest({ ...request, loading: false, data: (await res.json()).data });
      } catch (error: any) {
        setRequest({ ...request, loading: false, error: error.message ?? JSON.stringify(error) });
      }
    })();
  }, []);
  return request;
}
