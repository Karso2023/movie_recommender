import { NextRequest, NextResponse } from "next/server";
import { getMovieDetails } from "@/lib/omdb";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await getMovieDetails(id);

  if (data.Response !== "True") {
    return NextResponse.json({ error: "Movie not found." }, { status: 404 });
  }

  return NextResponse.json({
    title: data.Title || "",
    year: data.Year || "",
    rated: data.Rated || "N/A",
    runtime: data.Runtime || "N/A",
    genre: data.Genre || "",
    director: data.Director || "N/A",
    actors: data.Actors || "N/A",
    plot: data.Plot || "N/A",
    poster: data.Poster || "N/A",
    imdbRating: data.imdbRating || "N/A",
    imdbVotes: data.imdbVotes || "N/A",
    imdbID: data.imdbID || "",
  });
}
