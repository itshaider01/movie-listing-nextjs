"use server";

import { apiRoute } from "@/config/api-routes";
// import User from "@/types/models/User.model";
import { handleApiErrorWithoutException } from "@/utils/errorHandler";
import { ServerErrorResponse } from "../../utils/error";
import User from "@/types/user";
import request from "@/utils/request";
import storeTokensInCookies from "@/utils/setTokenInCookies";
import axiosInstance from "@/utils/axiosInstance";

interface LoginResponse {
  user: User;
  tokens: {
    access: {
      token: string;
      expires: string;
    };
  };
}

const login = async (
  email: string,
  password: string
): Promise<ServerErrorResponse<LoginResponse>> => {
  try {
    const response = await request<LoginResponse>(
      async () =>
        await axiosInstance.post(`${apiRoute.LOGIN_URL}`, {
          email,
          password,
        })
    );

    await storeTokensInCookies(response.data.tokens);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return handleApiErrorWithoutException(error);
  }
};

export default login;
