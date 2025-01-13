"use server";

import { apiRoute } from "@/config/api-routes";
import axiosInstance from "@/utils/axiosInstance";
import { ServerErrorResponse } from "@/utils/error";
import { handleApiErrorWithoutException } from "@/utils/errorHandler";

export async function CreateMovie(
  formData: FormData
): Promise<ServerErrorResponse> {
  try {
    const response = await axiosInstance.post(
      `${apiRoute.MOVIES_URL}`,
      formData
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return handleApiErrorWithoutException(error);
  }
}

export default CreateMovie;
