"use client";

import { useState, useCallback } from "react";
import { MovieSearch } from "@/components/movies/movie-search";
import { MovieCard } from "@/components/movies/movie-card";

interface SearchResult {
  title: string;
  year: string;
  imdbID: string;
  poster: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export default function MoviesPage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/movies/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Movies</h1>
        <p className="text-muted-foreground">
          Search for a movie to get started
        </p>
      </div>

      <MovieSearch onSearch={handleSearch} />

      {loading && (
        <p className="text-center text-muted-foreground">Searching...</p>
      )}

      {!loading && searched && results.length === 0 && (
        <p className="text-center text-muted-foreground">No movies found.</p>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {results.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.title}
              year={movie.year}
              imdbID={movie.imdbID}
              poster={movie.poster}
            />
          ))}
        </div>
      )}
    </div>
  );
}
