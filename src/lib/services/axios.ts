import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export type HttpMethod = "get" | "post" | "put" | "delete";

export interface ServiceResponse<T> {
  data?: T | null;
  errorMessage: string | null;
}

const BASE_URL = "https://sp-taskify-api.vercel.app/2-7";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers = config.headers ?? {};
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    config.headers.Authorization = `Bearer ${sessionStorage.getItem("accessToken")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export async function service<T, U>(method: HttpMethod, url: string, data?: U): Promise<ServiceResponse<T>> {
  try {
    const request: AxiosRequestConfig = {
      url,
      method,
      data,
    };
    const response: AxiosResponse<T> = await axiosInstance(request);
    return { data: response.data, errorMessage: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message;
      return { data: null, errorMessage };
    } else {
      console.error(`${method} Error : `, error);
      throw error;
    }
  }
}

