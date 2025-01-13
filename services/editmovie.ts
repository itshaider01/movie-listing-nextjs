"use server";

import axiosInstance from "@/utils/axiosInstance";
import { ServerErrorResponse } from "@/utils/error";
import { handleApiErrorWithoutException } from "@/utils/errorHandler";
import { apiRoute } from "@/config/api-routes";

export async function EditMovie(
  id: string,
  formData: FormData
): Promise<ServerErrorResponse> {
  try {
    const response = await axiosInstance.patch(
      `${apiRoute.MOVIES_URL}/${id}`,
      formData
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return handleApiErrorWithoutException(error);
  }
}

export default EditMovie;
