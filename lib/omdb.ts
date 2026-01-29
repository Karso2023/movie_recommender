const OMDB_API_KEY = process.env.OMDB_API_KEY || "";
const OMDB_BASE_URL = "https://www.omdbapi.com/";

export interface OmdbSearchItem {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

export interface OmdbSearchResponse {
  Search?: OmdbSearchItem[];
  totalResults?: string;
  Response: string;
}

export interface OmdbDetailResponse {
  Title: string;
  Year: string;
  Rated: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Response: string;
}

export async function searchMovies(
  query: string,
  page: number = 1
): Promise<OmdbSearchResponse> {
  const url = new URL(OMDB_BASE_URL);
  url.searchParams.set("apikey", OMDB_API_KEY);
  url.searchParams.set("s", query);
  url.searchParams.set("type", "movie");
  url.searchParams.set("page", String(page));

  const res = await fetch(url.toString());
  return res.json();
}

export async function getMovieDetails(
  imdbId: string
): Promise<OmdbDetailResponse> {
  const url = new URL(OMDB_BASE_URL);
  url.searchParams.set("apikey", OMDB_API_KEY);
  url.searchParams.set("i", imdbId);
  url.searchParams.set("plot", "full");

  const res = await fetch(url.toString());
  return res.json();
}

export async function getRecommendationPool(
  genres: string[],
  excludeId: string = ""
): Promise<OmdbDetailResponse[]> {
  const seenIds = new Set<string>([excludeId]);
  const pool: OmdbDetailResponse[] = [];

  for (const genre of genres) {
    const result = await searchMovies(genre);
    if (result.Response !== "True") continue;

    for (const item of result.Search ?? []) {
      if (seenIds.has(item.imdbID)) continue;
      seenIds.add(item.imdbID);

      const details = await getMovieDetails(item.imdbID);
      if (details.Response === "True") {
        pool.push(details);
      }
    }
  }

  return pool;
}
