import type { OmdbDetailResponse } from "./omdb";

export interface Movie {
  title: string;
  genre: string[];
  rating: number;
  votes: number;
  imdbID: string;
  poster: string;
}

export interface Recommendation {
  movie: Movie;
  similarity: number;
}

/**
 * Load movies from OMDb API response data.
 * Filters out movies with missing rating, votes, or genre.
 */
export function loadData(omdbMovies: OmdbDetailResponse[]): Movie[] {
  const movies: Movie[] = [];

  for (const row of omdbMovies) {
    // skip if missing, reason why i got ValueError
    if (
      !row.imdbRating ||
      !row.imdbVotes ||
      !row.Genre ||
      row.imdbRating === "N/A" ||
      row.imdbVotes === "N/A" ||
      row.Genre === "N/A"
    ) {
      continue;
    }

    const genreList = row.Genre.split(",").map((g) => g.trim());
    movies.push({
      title: row.Title,
      genre: genreList,
      rating: parseFloat(row.imdbRating),
      votes: parseFloat(row.imdbVotes.replace(/,/g, "")),
      imdbID: row.imdbID || "",
      poster: row.Poster || "N/A",
    });
  }

  return movies;
}

/**
 * Since cosine similarity requires numerical vectors, represent each movie as a vector of:
 *
 * Genre: One-hot encoded
 * Rating: Normalised within 0 and 1
 * Votes: Log-transformed to reduce skew
 */
export function createFeatureVectors(movies: Movie[]) {
  const allGenres = new Set<string>();
  for (const movie of movies) {
    for (const g of movie.genre) {
      allGenres.add(g);
    }
  }
  const genreList = Array.from(allGenres).sort();

  // Normalise rating and votes
  const ratings = movies.map((m) => m.rating);
  const votes = movies.map((m) => m.votes);
  const minRating = Math.min(...ratings);
  const maxRating = Math.max(...ratings);
  const maxVotes = Math.max(...votes);

  const vectors: number[][] = [];
  for (const movie of movies) {
    const vec: number[] = [];

    // Genre (one-hot)
    for (const g of genreList) {
      vec.push(movie.genre.includes(g) ? 1 : 0);
    }

    const normRating =
      maxRating !== minRating
        ? (movie.rating - minRating) / (maxRating - minRating)
        : 0.5;
    vec.push(normRating);

    // Votes (log-transformed)
    const normVotes =
      maxVotes > 0
        ? Math.log(movie.votes + 1) / Math.log(maxVotes + 1)
        : 0;
    vec.push(normVotes);

    vectors.push(vec);
  }

  return { vectors, genreList };
}

/**
 * For a given movie, compute similarity with all others and return top N.
 */
export function recommendMovies(
  movies: Movie[],
  vectors: number[][],
  targetTitle: string,
  numRecommendations: number
): Recommendation[] {
  const targetIdx = movies.findIndex((m) => m.title === targetTitle);

  // To avoid error if movie not found in dataset
  if (targetIdx === -1) {
    throw new Error(`Movie '${targetTitle}' not found in dataset`);
  }

  const similarities: Recommendation[] = [];
  for (let i = 0; i < vectors.length; i++) {
    if (i === targetIdx) continue;
    const sim = cosineSimilarity(vectors[targetIdx], vectors[i]);
    similarities.push({ movie: movies[i], similarity: sim });
  }

  similarities.sort((a, b) => b.similarity - a.similarity);
  return similarities.slice(0, numRecommendations);
}

/**
 * Compute cosine similarity between two vectors.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    magnitudeA += a[i] * a[i];
    magnitudeB += b[i] * b[i];
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) return 0.0;

  return dotProduct / (magnitudeA * magnitudeB);
}
