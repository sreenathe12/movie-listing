import alt from '../alt';
import HomeActions from '../actions/home';
import { cloneDeep, orderBy, findIndex } from 'lodash';
import s from '../settings';

let MOVIES;

const sortOrder = (orderByKey) => {
    let ascDesc;

    switch(orderByKey) {
        case 'vote_average':
        case 'popularity':
        case 'release_date':
            ascDesc = 'desc';
            break;
        default:
            ascDesc = 'asc';
    }

    return ascDesc;
}

const filterByGenre = (movies, genreId) => {
    return movies.filter((movie) => {
        if (movie.genres) {
            let hasGenre = movie.genres.find((genre) => {
                return genre.id == genreId;
            });

            if (hasGenre) {
                return movie;
            }
        }
    });
}

class HomeStore {

    constructor() {
        this.bindActions(HomeActions);

        this.isLoading = false;
        this.isAppending = false;
        this.orderBy = null;
        this.filterBy = null;
        this.movies = [];
        this.totalPages = 0;
        this.page = 1;
    }

    onOrderBy(orderByKey) {
        let ascDesc = sortOrder(orderByKey);

        this.orderBy = orderByKey;
        this.movies = orderBy(this.movies, [orderByKey], [ascDesc]);
    }

    onFilterBy(filterByKey) {
        let rawMovies = MOVIES.slice();
        let filteredMovies;

        if (filterByKey) {
            filteredMovies = filterByGenre(rawMovies, filterByKey);
        } else {
            filteredMovies = rawMovies;
        }

        if (this.orderBy) {
            filteredMovies = orderBy(filteredMovies, [this.orderBy], [sortOrder(this.orderBy)]);
        }

        this.filterBy = filterByKey;
        this.movies = filteredMovies;
    }

    onSetMovie(movie) {
        let index = findIndex(this.movies, function(m) {
            return m.id == movie.id;
        });

        if (index >= 0) {
            this.movies[index] = movie;
        }
    }

    onLoadMovies(movies) {
        //save another copy to use for filtering
        MOVIES = movies.slice();
        this.movies = movies;
    }

    onSetLoadingState(state) {
        this.isLoading = state;
    }
    
    onAppendMovies(movies) {
        let filteredMovies = this.movies.concat(movies);

        if (this.filterBy) {
            filteredMovies = filterByGenre(filteredMovies, this.filterBy);
        } 

        this.movies = filteredMovies;

        //add new movies to original copy
        MOVIES = MOVIES.concat(movies.slice());
    }

    onToggleAppendingState(state) {
        this.isAppending = state;
    }

    onNextPage() {
        this.page = this.page + 1;
    }

    onSetGenre(data) {
        let index = findIndex(this.movies, function(m) {
            return m.id == data.movieId;
        });

        if (index >= 0) {
            if (!this.movies[index].genres) {
                this.movies[index].genres = [];
            }

            this.movies[index].genres.push(data.genre);
        }
    }

    onSetApiSource(apiSource) {
        this.apiSource = apiSource;
    }

    onSetPage(page) {
        this.page = page;
    }

    onSetTotalPages(totalPages) {
        this.totalPages = totalPages;
    }
}

export default alt.createStore(HomeStore, 'HomeStore');
