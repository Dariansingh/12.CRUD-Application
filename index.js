class Movie {
    constructor(Name, Rating, Genre) {
        this.Name = Name
        this.Rating = Rating
        this.Genre = Genre
    }
}

class MovieService {
    static url = "https://63c87820075b3f3a91e1846e.mockapi.io/movies"

    static getAllMovies() {
        return $.get(this.url);
    }
}



/*class that lets the movie data be seen */
class DOMManager {
    static getAllProducts() {
        MovieService.getAllMovies().then((data) => this.movieData(data))
    }

    static movieData(apiData) {
        console.log('movie', apiData[0].Name)
    }
}

DOMManager.getAllProducts()

