'''
A cosine similarity recommender system based on movies rating, genre, votes
'''


def load_data(filename): 
    '''
    load movies csv information
    
    :param filename: csv file name
    '''
    import csv
    
    movies = []
    with open(filename, "r") as file:
        reader = csv.DictReader(file)
        for row in reader:
            # skip if missing, reason why i got ValueError
            if not row['rating'] or not row['votes'] or not row['genre']:
                continue

            genre_list = row['genre'].split('|')
            movies.append({
                'title': row['movie_name'],
                'genre': genre_list,
                'rating': float(row['rating']),
                'votes': float(row['votes'])
            })
        return movies
    
    
def create_feature_vector(movies):
    '''
    Since cosine similarity requires numerical vectors, represent each movie as a vector of:

    Genre: One-hot encoded 
    
    Rating: Normalised within 0 and 1 
    
    Votes: Log-transformed to reduce skew 
    
    :param movies: the movie csv file
    '''
    
    import math
    
    all_genres = set()
    for movie in movies:
        all_genres.update(movie['genre'])
    genre_list = sorted(all_genres)

    # Normalise rating and votes
    ratings = [m['rating'] for m in movies]
    votes = [m['votes'] for m in movies]
    min_rating, max_rating = min(ratings), max(ratings)
    min_votes, max_votes = min(votes), max(votes)


    feature_vectors = []
    for movie in movies:
        vec = []
        # Genre (one-hot)
        for g in genre_list:
            vec.append(1 if g in movie['genre'] else 0)

        norm_rating = (movie['rating'] - min_rating) / (max_rating - min_rating) if max_rating != min_rating else 0.5
        vec.append(norm_rating)
        # Votes (log-transformed)
        norm_votes = math.log(movie['votes'] + 1) / (math.log(max_votes + 1) if max_votes > 0 else 1)
        vec.append(norm_votes)
        feature_vectors.append(vec)
    return feature_vectors, genre_list   


def recommend_movies(movies:str, feature_vectors:list ,target_title:str, num_recommendations:int):
    '''
    For a given movie, compute similarity with all others and return top N
    
    :param movies: movies csv filename
    :type movies: str
    :param feature_vectors: the numerical vectors
    :type feature_vectors: list
    :param target_title: movie title
    :type target_title: str
    :param num_recommendations: Description
    :type num_recommendations: int
    :return: Description
    :rtype: list
    '''
    target_idx = next((i for i, m in enumerate(movies) if m['title'] == target_title), None)

    # To avoid StopIteration if movie not found in dataset
    if target_idx is None:
        raise ValueError(f"Movie '{target_title}' not found in dataset")

    similarities = []
    for i, vec in enumerate(feature_vectors):
        if i == target_idx:
            continue
        sim = cosine_similarity(feature_vectors[target_idx], vec)
        similarities.append((movies[i]['title'], sim))

    similarities.sort(key=lambda x: x[1], reverse=True)
    return similarities[:num_recommendations]
    

def cosine_similarity(a, b) -> float:
    '''
    Docstring for cos_similarity
    
    :param a: vector a
    :param b: vector b
    :return: cosine similarity
    :rtype: float
    '''
    
    from math import sqrt 
            
    dot_product = sum(x * y for x , y in zip(a,b))
    
    magnitude_a = sqrt(sum(x ** 2 for x in a))
    magnitude_b = sqrt(sum(y ** 2 for y in b))
    
    if magnitude_a == 0 or magnitude_b == 0:
        return 0.0
    
    return dot_product / (magnitude_a * magnitude_b)
    


movies = load_data("archive/sports.csv")

feature_vectors, genre_list = create_feature_vector(movies)


print(f"Loaded {len(movies)} movies from dataset")
print("\nFirst 10 movies:")
for i, movie in enumerate(movies[:10]):
    print(f"{i+1}. {movie['title']}")


if len(movies) > 0:
    test_movie = movies[0]['title']
    recommendations = recommend_movies(movies, feature_vectors, "Cars", num_recommendations=20)

    print(f"\nTop 5 recommendations for '{test_movie}':")
    for title, score in recommendations:
        print(f"- {title} (similarity: {score:.3f})")   