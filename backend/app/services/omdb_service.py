import os
import requests

OMDB_API_KEY = os.getenv("OMDB_API", "")
OMDB_BASE_URL = "http://www.omdbapi.com/"


def search_movies(query: str, page: int = 1):
    '''
    Search movies by title using OMDb API

    :param query: search query
    :param page: page number (1-100)
    :return: dict with Search results and totalResults
    '''
    response = requests.get(OMDB_BASE_URL, params={
        "apikey": OMDB_API_KEY,
        "s": query,
        "type": "movie",
        "page": page,
    })
    return response.json()


def get_movie_details(imdb_id: str):
    '''
    Get full movie details by IMDb ID

    :param imdb_id: IMDb ID (e.g. tt0468569)
    :return: dict with full movie details
    '''
    response = requests.get(OMDB_BASE_URL, params={
        "apikey": OMDB_API_KEY,
        "i": imdb_id,
        "plot": "full",
    })
    return response.json()


def get_recommendation_pool(genres: list[str], exclude_id: str = ""):
    '''
    Build a pool of movies by searching OMDb for each genre keyword.
    Fetches full details for each result to get rating/votes/genre data.

    :param genres: list of genre strings (e.g. ["Action", "Crime"])
    :param exclude_id: IMDb ID to exclude (the target movie)
    :return: list of OMDb movie detail dicts
    '''
    seen_ids = {exclude_id}
    pool = []

    for genre in genres:
        result = search_movies(genre)
        if result.get("Response") != "True":
            continue

        for item in result.get("Search", []):
            imdb_id = item.get("imdbID", "")
            if imdb_id in seen_ids:
                continue
            seen_ids.add(imdb_id)

            details = get_movie_details(imdb_id)
            if details.get("Response") == "True":
                pool.append(details)

    return pool
