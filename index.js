document.getElementById("create-new-movie").addEventListener("click", function(event) {
    event.preventDefault();
    createNewMovie();
});

document.getElementById("app").addEventListener("click", function(event) {
    if(event.target.classList.contains("delete")) {
      let id = event.target.getAttribute("data-id");
      deleteMovie(id);
    }
});

class Movie {
    constructor(Name, Rating, Genre) {
        this.Name = Name
        this.Rating = Rating
        this.Genre = Genre
    }
}

function createNewMovie() {
    let name = document.getElementById("Name").value;
    let genre = document.getElementById("Genre").value;
    let rating = document.getElementById("Rating").value;

    let newMovie = new Movie(name, rating, genre);
    DOMManager.createMovieData(newMovie);
}

function deleteMovie(id) {
    $.ajax({
        url: `${MovieService.url}/${id}`,
        type: "DELETE"
    })
    .then(() => {
        return MovieService.getAllMovies();
    })
    .then((data) => DOMManager.render(data));
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
        MovieService.getAllMovies().then((data) => this.render(data))
    }

    static createMovieData(movie) {
        $.ajax({
          url: MovieService.url,
          type: "POST",
          data: movie
        })
        .then(() => {
          return MovieService.getAllMovies();
        })
        .then((data) => this.render(data));
    }
    

    static render(data) {
        let app = document.getElementById("app");
        let html = "";
        data.forEach((movie) => {
            html += `<div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${movie.Name}</h5>
                            <p class="card-text">Rating: ${movie.Rating}</p>
                            <p class="card-text">Genre: ${movie.Genre}</p>
                            <button class="btn btn-danger delete" data-id="${movie.id}">Delete</button>
                        </div>
                    </div>`;
        });
        app.innerHTML = html;
    }
    
}


DOMManager.getAllProducts()

