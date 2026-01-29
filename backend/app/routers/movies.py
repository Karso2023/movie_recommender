from fastapi import APIRouter, HTTPException, Query

from app.services.omdb_service import search_movies, get_movie_details, get_recommendation_pool
from app.services.recommender_service import load_data, create_feature_vector, recommend_movies
from app.schemas.movies import (
    MovieSearchResponse,
    MovieSearchResult,
    MovieDetail,
    RecommendationRequest,
    RecommendationResult,
)

router = APIRouter(prefix="/api/movies", tags=["movies"])


@router.get("/search", response_model=MovieSearchResponse)
def search(q: str = Query(..., min_length=1), page: int = Query(1, ge=1)):
    data = search_movies(q, page)

    if data.get("Response") != "True":
        return MovieSearchResponse(results=[], totalResults=0)

    results = [
        MovieSearchResult(
            title=m["Title"],
            year=m["Year"],
            imdbID=m["imdbID"],
            poster=m.get("Poster", "N/A"),
        )
        for m in data.get("Search", [])
    ]
    return MovieSearchResponse(
        results=results,
        totalResults=int(data.get("totalResults", 0)),
    )


@router.get("/{imdb_id}", response_model=MovieDetail)
def details(imdb_id: str):
    data = get_movie_details(imdb_id)

    if data.get("Response") != "True":
        raise HTTPException(status_code=404, detail="Movie not found.")

    return MovieDetail(
        title=data.get("Title", ""),
        year=data.get("Year", ""),
        rated=data.get("Rated", "N/A"),
        runtime=data.get("Runtime", "N/A"),
        genre=data.get("Genre", ""),
        director=data.get("Director", "N/A"),
        actors=data.get("Actors", "N/A"),
        plot=data.get("Plot", "N/A"),
        poster=data.get("Poster", "N/A"),
        imdbRating=data.get("imdbRating", "N/A"),
        imdbVotes=data.get("imdbVotes", "N/A"),
        imdbID=data.get("imdbID", ""),
    )


@router.post("/recommend", response_model=list[RecommendationResult])
def recommend(body: RecommendationRequest):
    # 1. Get target movie details
    target_data = get_movie_details(body.imdbID)
    if target_data.get("Response") != "True":
        raise HTTPException(status_code=404, detail="Movie not found.")

    genres = [g.strip() for g in target_data.get("Genre", "").split(",") if g.strip()]
    if not genres:
        raise HTTPException(status_code=400, detail="Movie has no genre data.")

    # 2. Build a pool of related movies from OMDb
    pool_data = get_recommendation_pool(genres, exclude_id=body.imdbID)

    # 3. Include target movie in the pool for the recommender
    all_data = [target_data] + pool_data

    # 4. Convert to internal format using load_data
    movies = load_data(all_data)

    if len(movies) < 2:
        return []

    # 5. Create feature vectors and run recommender
    feature_vectors, genre_list = create_feature_vector(movies)
    results = recommend_movies(movies, feature_vectors, target_data["Title"], body.num_recommendations)

    # 6. Return results
    return [
        RecommendationResult(
            title=movie["title"],
            similarity=round(sim, 3),
            imdbID=movie.get("imdbID", ""),
            poster=movie.get("poster", "N/A"),
        )
        for movie, sim in results
    ]
