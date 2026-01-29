import { NextRequest, NextResponse } from "next/server";
import { getMovieDetails, getRecommendationPool } from "@/lib/omdb";
import {
  loadData,
  createFeatureVectors,
  recommendMovies,
} from "@/lib/recommender";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { imdbID, num_recommendations = 10 } = body;

  if (!imdbID) {
    return NextResponse.json(
      { error: "imdbID is required." },
      { status: 400 }
    );
  }

  // 1. Get target movie details
  const targetData = await getMovieDetails(imdbID);
  if (targetData.Response !== "True") {
    return NextResponse.json({ error: "Movie not found." }, { status: 404 });
  }

  const genres = (targetData.Genre || "")
    .split(",")
    .map((g) => g.trim())
    .filter(Boolean);

  if (genres.length === 0) {
    return NextResponse.json(
      { error: "Movie has no genre data." },
      { status: 400 }
    );
  }

  // 2. Build pool of related movies from OMDb
  const poolData = await getRecommendationPool(genres, imdbID);

  // 3. Include target movie in the pool
  const allData = [targetData, ...poolData];

  // 4. Convert to internal format
  const movies = loadData(allData);

  if (movies.length < 2) {
    return NextResponse.json([]);
  }

  // 5. Create feature vectors and run recommender
  const { vectors } = createFeatureVectors(movies);
  const results = recommendMovies(
    movies,
    vectors,
    targetData.Title,
    num_recommendations
  );

  // 6. Return results
  return NextResponse.json(
    results.map((r) => ({
      title: r.movie.title,
      similarity: Math.round(r.similarity * 1000) / 1000,
      imdbID: r.movie.imdbID,
      poster: r.movie.poster,
    }))
  );
}
