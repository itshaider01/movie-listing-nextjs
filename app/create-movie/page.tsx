"use client";

import dynamic from "next/dynamic";

const CreateMovies = dynamic(
  () => import("@/components/sections/create-movies"),
  { ssr: false }
);

const CreateMoviePage = () => {
  return <CreateMovies />;
};

export default CreateMoviePage;
