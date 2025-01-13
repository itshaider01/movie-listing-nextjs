"use server";
import { AxiosResponse } from "axios";
export interface RefreshTokensProps {
  access: {
    token: string;
    expires: string;
  };
}
export const request = async <T>(
  func: () => Promise<AxiosResponse<T>>,
  retryCount = 0,
  count = 0
): Promise<AxiosResponse<T>> => {
  if (retryCount < 0) {
    throw new Error("Too many requests");
  }
  try {
    const response = await func();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response as any as AxiosResponse;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.response && e.response.status === 401) {
    }

    if (!e || !e.response || !e.response.status) {
      if (retryCount > 1) {
        return request(func, retryCount - 1, count + 1);
      }
    }

    throw e;
  }
};

export default request;
