import React from "react";
import MovieCard from "@/components/common/movie-card";
import { getMovieResponse } from "@/services/getMovies";

type MovieListProps = {
  movies: getMovieResponse[];
};

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <div>
      {/* Movie Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-6 md:gap-y-6 py-20 md:py-[120px]">
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            image={movie.poster}
            title={movie.title}
            year={movie.year}
            id={movie.id}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
