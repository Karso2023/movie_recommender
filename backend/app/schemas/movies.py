from pydantic import BaseModel


class MovieSearchResult(BaseModel):
    title: str
    year: str
    imdbID: str
    poster: str


class MovieSearchResponse(BaseModel):
    results: list[MovieSearchResult]
    totalResults: int


class MovieDetail(BaseModel):
    title: str
    year: str
    rated: str
    runtime: str
    genre: str
    director: str
    actors: str
    plot: str
    poster: str
    imdbRating: str
    imdbVotes: str
    imdbID: str


class RecommendationRequest(BaseModel):
    imdbID: str
    num_recommendations: int = 10


class RecommendationResult(BaseModel):
    title: str
    similarity: float
    imdbID: str
    poster: str
