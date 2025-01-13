/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/errorHandler.ts
import axios, { AxiosError } from "axios";

export class ApiError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleApiError = (error: any) => {
  console.log("Error", error);
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message: string }>;
    const message =
      axiosError.response?.data?.message ||
      axiosError.message ||
      "An error occurred";
    const statusCode = axiosError.response?.status || 500;

    throw new ApiError(message, statusCode);
  } else if (error instanceof Error) {
    throw new ApiError(error.message || "An unknown error occurred", 500);
  } else {
    throw new ApiError(error.message, error.code);
  }
};

export const handleApiErrorWithoutException = (error: any) => {
  console.log("Error", error);
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message: string }>;
    const message =
      axiosError.response?.data?.message ||
      axiosError.message ||
      "An error occurred";
    const statusCode = axiosError.response?.status || 500;

    return {
      error: "Error occured",
      message,
      statusCode,
    };
    // throw new ApiError(message, statusCode);
  } else if (error instanceof Error) {
    return {
      error: "Error occured",
      message: error.message || "An unknown error occurred",
      statusCode: 500,
    };
    // throw new ApiError(error.message || 'An unknown error occurred', 500);
  } else {
    return {
      error: "Error occured",
      message: error.message,
      statusCode: error.code,
    };
    // throw new ApiError(error.message, error.code);
  }
};
