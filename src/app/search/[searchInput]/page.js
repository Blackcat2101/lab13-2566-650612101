"use client";

import { MovieRow } from "@/components/MovieRow";
import { movieDB } from "@/libs/movieDB";
import { useEffect, useState } from "react";

export default function SearchResultPage({ params }) {
  //tip1 : before filtering movie, replace all "%20" with " " (space) in the input
  const searchInput = params.searchInput;
  const processedSearchInput = searchInput.replaceAll("%20", " ");

  const [filteredMovies, setFilteredMovies] = useState([]);

  const filterMovies = () => {
    const lowerCaseSearchInput = processedSearchInput.toLocaleLowerCase();
    const filteredMovies = movieDB.filter((movie) =>
      movie.title.toLocaleLowerCase().includes(lowerCaseSearchInput)
    );
    setFilteredMovies(filteredMovies);
  };

  useEffect(() => {
    filterMovies();
  }, []);

  return (
    <div>
      <p className="fw-bold fs-4 text-center my-0">
        Searching &quot;{processedSearchInput}&quot;
      </p>
      <p className="fw-bold fs-4 text-center">
        Found {filteredMovies.length} result(s)
      </p>
      {/* Use  "filteredMovies" variable to map-loop rendering MovieRow component */}
      {filteredMovies.map((movie, i) => (
        <MovieRow
          key={movie.id}
          id={movie.id}
          title={movie.title}
          detail={movie.detail}
          rating={movie.rating}
          number={i + 1}
        />
      ))}
    </div>
  );
}
