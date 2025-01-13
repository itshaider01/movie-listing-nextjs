"use server";

import { API_URL } from "@/lib/constant";
import axios from "axios";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const authAccessToken = await getCookie("access-token", { cookies });
      if (authAccessToken) {
        if (config.headers)
          config.headers.Authorization = `Bearer ${authAccessToken}`;
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
