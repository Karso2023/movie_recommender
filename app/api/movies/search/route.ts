import { NextRequest, NextResponse } from "next/server";
import { searchMovies } from "@/lib/omdb";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  const page = parseInt(request.nextUrl.searchParams.get("page") || "1", 10);

  if (!q || q.trim().length === 0) {
    return NextResponse.json({ results: [], totalResults: 0 }, { status: 400 });
  }

  const data = await searchMovies(q, page);

  if (data.Response !== "True") {
    return NextResponse.json({ results: [], totalResults: 0 });
  }

  const results = (data.Search ?? []).map((m) => ({
    title: m.Title,
    year: m.Year,
    imdbID: m.imdbID,
    poster: m.Poster || "N/A",
  }));

  return NextResponse.json({
    results,
    totalResults: parseInt(data.totalResults || "0", 10),
  });
}
