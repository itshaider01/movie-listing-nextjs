"use server";

import { handleApiErrorWithoutException } from "@/utils/errorHandler";
import { ServerErrorResponse } from "@/utils/error";
import User from "@/types/user";
import { apiRoute } from "@/config/api-routes";
import request from "@/utils/request";
import axiosInstance from "@/utils/axiosInstance";
import storeTokensInCookies from "@/utils/setTokenInCookies";

interface Token {
  token: string;
  expires: string;
}

interface RegisterResponse {
  tokens: {
    access: Token;
    refresh: Token;
  };
  user: User;
}

const register = async (
  email: string,
  password: string
): Promise<ServerErrorResponse<RegisterResponse>> => {
  try {
    console.log(apiRoute.REGISTER_URL);
    const response = await request(
      async () =>
        await axiosInstance.post<RegisterResponse>(`${apiRoute.REGISTER_URL}`, {
          email,
          password,
        })
    );
    storeTokensInCookies(response.data.tokens);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return handleApiErrorWithoutException(error);
  }
};

export default register;
