"use client";
import MovieForm from "@/components/common/movie-form";
import CreateMovie from "@/services/createMovies";
import { FormValues } from "@/types/movie";
import { isActionError } from "@/utils/error";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const CreateMovies = () => {
  const router = useRouter();

  const handleCreateMovie = async (values: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("year", values.year);
      if (
        values.image &&
        typeof values.image === "object" &&
        values.image instanceof File
      ) {
        formData.append("poster", values.image);
      }

      const response = await CreateMovie(formData);

      if (isActionError(response)) {
        toast.error(response?.message);
        return;
      }

      toast.success("Application Submitted");

      setTimeout(() => {
        router.push("/movies");
      }, 2000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto z-10">
      <MovieForm onSubmit={handleCreateMovie} />
    </div>
  );
};

export default CreateMovies;
