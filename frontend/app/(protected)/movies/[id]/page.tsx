"use client";

import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MovieCard } from "@/components/movies/movie-card";
import { ArrowLeft, Star } from "lucide-react";
import Link from "next/link";

interface MovieDetail {
  title: string;
  year: string;
  rated: string;
  runtime: string;
  genre: string;
  director: string;
  actors: string;
  plot: string;
  poster: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
}

interface Recommendation {
  title: string;
  similarity: number;
  imdbID: string;
  poster: string;
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export default function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loadingMovie, setLoadingMovie] = useState(true);
  const [loadingRecs, setLoadingRecs] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/movies/${id}`);
        if (res.ok) {
          setMovie(await res.json());
        }
      } catch {
        // ignore
      } finally {
        setLoadingMovie(false);
      }
    }
    fetchMovie();
  }, [id]);

  async function handleRecommend() {
    if (!movie) return;
    setLoadingRecs(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/movies/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imdbID: movie.imdbID, num_recommendations: 10 }),
      });
      if (res.ok) {
        setRecommendations(await res.json());
      }
    } catch {
      // ignore
    } finally {
      setLoadingRecs(false);
    }
  }

  if (loadingMovie) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-muted-foreground">Movie not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Link href="/movies">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to search
        </Button>
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-72 shrink-0">
          {movie.poster && movie.poster !== "N/A" ? (
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full rounded-lg"
            />
          ) : (
            <div className="w-full aspect-[2/3] bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
              No Poster
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p className="text-muted-foreground">
              {movie.year} &middot; {movie.rated} &middot; {movie.runtime}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.genre.split(",").map((g) => (
              <Badge key={g.trim()} variant="secondary">
                {g.trim()}
              </Badge>
            ))}
          </div>

          {movie.imdbRating !== "N/A" && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{movie.imdbRating}</span>
              <span className="text-muted-foreground text-sm">
                ({movie.imdbVotes} votes)
              </span>
            </div>
          )}

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Director
            </p>
            <p>{movie.director}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Cast</p>
            <p>{movie.actors}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Plot</p>
            <p className="text-sm leading-relaxed">{movie.plot}</p>
          </div>

          <Button onClick={handleRecommend} disabled={loadingRecs}>
            {loadingRecs ? "Finding similar movies..." : "Get Recommendations"}
          </Button>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Similar Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recommendations.map((rec) => (
              <div key={rec.imdbID}>
                <MovieCard
                  title={rec.title}
                  year=""
                  imdbID={rec.imdbID}
                  poster={rec.poster}
                />
                <p className="text-xs text-center text-muted-foreground mt-1">
                  {(rec.similarity * 100).toFixed(0)}% match
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
