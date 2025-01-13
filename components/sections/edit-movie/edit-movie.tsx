"use client";
import Loader from "@/components/common/loader";
import MovieForm from "@/components/common/movie-form";
import EditMovie from "@/services/editmovie";
import getSingleMovie, { getMovieResponse } from "@/services/getSingleMovie";
import { FormValues } from "@/types/movie";
import { isActionError } from "@/utils/error";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditMovieSec = () => {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState<getMovieResponse | null>(null);

  const handleEditMovie = async (values: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("year", values.year);

      // Only append the file if it's not a URL
      if (values.image && typeof values.image !== "string") {
        formData.append("poster", values.image);
      }

      const response = await EditMovie(id as string, formData);

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

  useEffect(() => {
    async function getMovies() {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const movieData: any = await getSingleMovie(id as string);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    getMovies();
  }, [id]);

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <Loader className="text-white" />
      </div>
    );
  }
  return (
    <div className="max-w-[1200px] mx-auto z-10">
      <MovieForm
        initialValues={{
          title: movie?.title || "",
          year: movie?.year || "",
          image: movie.poster,
        }}
        onSubmit={handleEditMovie}
      />
    </div>
  );
};

export default EditMovieSec;
