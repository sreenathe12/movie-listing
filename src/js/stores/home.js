import alt from '../alt';
import HomeActions from '../actions/home';
import { cloneDeep, orderBy, findIndex } from 'lodash';
import s from '../settings';

class HomeStore {

    constructor() {
        this.bindActions(HomeActions);

        this.isLoading = false;
        this.isAppending = false;
        this.query = '';
        this.genre = 'all';
        this.orderBy = null;
        this.movies = [];
        this.page = 1;
    }

    onOrderBy(orderByKey) {
        let ascDesc;

        //lazy, will come back to this
        switch(orderByKey) {
            case 'vote_average':
            case 'popularity':
                ascDesc = 'desc';
                break;
            default:
                ascDesc = 'asc';
        }

        this.orderBy = orderByKey;
        this.movies = orderBy(this.movies, [orderByKey], [ascDesc]);
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
        this.movies = movies;
    }

    onSetLoadingState(state) {
        this.isLoading = state;
    }
    
    onAppendMovies(movies) {
        this.movies = this.movies.concat(movies);
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
}

export default alt.createStore(HomeStore, 'HomeStore');
