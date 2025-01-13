"use server";
import { apiRoute } from "@/config/api-routes";
import axiosInstance from "@/utils/axiosInstance";
import { ServerErrorResponse } from "@/utils/error";
import { handleApiErrorWithoutException } from "@/utils/errorHandler";

export interface getMovieResponse {
  title: string;
  poster: string;
  year: number;
  id: string;
}

export async function getAllMovies(
  limit: number,
  page: number
): Promise<ServerErrorResponse<getMovieResponse[]>> {
  try {
    const response = await axiosInstance.get(
      `${apiRoute.MOVIES_URL}?limit=${limit}&page=${page}`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return handleApiErrorWithoutException(error);
  }
}
