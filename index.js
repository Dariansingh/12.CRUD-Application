class Movie {
    constructor(Name, Rating, Genre) {
        this.Name = Name
        this.Rating = Rating
        this.Genre = Genre
    }
}

class MovieService {
    static url = 'https://63c87820075b3f3a91e1846e.mockapi.io/movies'

    static getAllMovies() {
        return $.get(this.url);
    }
}

