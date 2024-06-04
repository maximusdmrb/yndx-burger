import axios, { AxiosError, Method } from "axios";
axios.defaults.baseURL = "https://norma.nomoreparties.space/api";

export const instance = axios.create();

export const query = async (url: string, method: Method = "GET", data?: any) => {
  try {
    const res = await axios(url, data ? { data, method } : { method });
    if (res.data) return res.data;
    return Promise.reject(`Произошла ошибка ${res.status}`);
  } catch (error) {
    return Promise.reject((error as AxiosError).response?.data);
  }
};

export const refreshToken = async () => {
  const res = await axios.post("/auth/token", { token: localStorage.getItem("refreshToken") });
  const refreshData = res.data;
  if (!refreshData.success) {
    return Promise.reject(refreshData);
  }
  localStorage.setItem("refreshToken", refreshData.refreshToken);
  localStorage.setItem("accessToken", refreshData.accessToken);
};

export const queryWithToken = async (url: string, method: Method = "GET", data?: any) => {
  try {
    instance.interceptors.request.use((config) => {
      config.headers.Authorization = localStorage.getItem("accessToken");
      return config;
    });
    const res = await instance(url, data ? { data, method } : { method });
    if (res.data) return res.data;
    return Promise.reject(`Произошла ошибка ${res.status}`);
  } catch (error) {
    /* @ts-ignore */
    if (error.response.data.message === "jwt expired") {
      instance.interceptors.response.clear();
      await refreshToken();
      instance.interceptors.request.use((config) => {
        config.headers.Authorization = localStorage.getItem("accessToken");
        return config;
      });
      const res = await instance(url, data ? { data, method } : { method });
      if (res.data) return res.data;
      return Promise.reject(error);
    }
    return Promise.reject((error as AxiosError).response?.data);
  } finally {
    instance.interceptors.response.clear();
  }
};
