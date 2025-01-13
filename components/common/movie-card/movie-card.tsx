import Image from "next/image";
import Link from "next/link";
import React from "react";

type MovieCardProps = {
  image: string;
  title: string;
  year: number;
  id: string;
};

const MovieCard = ({ image, title, year, id }: MovieCardProps) => {
  return (
    <div className="bg-background-100 md:p-2 rounded-xl overflow-hidden shadow-md">
      <Link href={`/movies/${id}`}>
        <Image
          src={image}
          alt={title}
          className="w-full h-[246px] md:h-[400px] object-cover md:rounded-xl"
          width={266}
          height={400}
        />
      </Link>
      <div className="p-2">
        <h3 className="text-white text-2xl  md:text-xl md:leading-8 font-medium line-clamp-1 mb-4">
          {title}
        </h3>
        <p className="text-white text-sm leading-6">{year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
