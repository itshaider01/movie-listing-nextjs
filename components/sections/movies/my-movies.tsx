"use client"; //test cicd

import { LogOut, PlusCircleIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import MovieList from "./movie-list";
import Link from "next/link";
import { getAllMovies, getMovieResponse } from "@/services/getMovies";
import Loader from "@/components/common/loader";
import Pagination from "@/components/common/pagination";
import logout from "@/services/auth/logout";
import { useRouter } from "next/navigation";

const MyMovies = () => {
  const router = useRouter();
  const [movies, setMovies] = useState<getMovieResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  // Calculate paginated movi
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getMoviesList = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await getAllMovies(8, currentPage);
      setMovies(response?.results);
      setCurrentPage(response?.page);
      setPage(response.totalPages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false); // Stop the loader
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    getMoviesList();
  }, [currentPage]);

  if (loading)
    return (
      <div className="min-h-screen max-w-[1200px] mx-auto flex flex-col items-center justify-center">
        <Loader className="w-12 h-12 text-white" />
      </div>
    );

  return (
    <>
      {!movies ? (
        // Fallback message when no movies are available
        <div className="min-h-screen px-6 max-w-[1200px] mx-auto flex flex-col items-center justify-center z-50 relative">
          <h2 className="text-[32px] text-white md:text-5xl leading-10 md:leading-[56px] font-semibold mb-10">
            Your movie list is empty
          </h2>
          <Link
            href={"/create-movie"}
            className="font-bold text-white text-base bg-primary py-4 px-7 rounded-[10px]"
          >
            Add a new movie
          </Link>
        </div>
      ) : (
        <div className="max-w-[1200px] px-6 mx-auto pt-[120px] pb-44">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-[32px] text-white md:text-5xl leading-10 md:leading-[56px] font-semibold">
                My movies
              </h1>
              <Link href={"/create-movie"}>
                <PlusCircleIcon width={26} height={26} color="#ffffff" />
              </Link>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-3">
              <p className="text-base font-bold hidden md:block text-white">
                logout
              </p>
              <LogOut width={24} height={24} color="#ffffff" />
            </button>
          </div>
          <MovieList movies={movies} />
          <Pagination
            currentPage={currentPage}
            totalPages={page}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default MyMovies;
