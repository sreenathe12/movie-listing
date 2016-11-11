import alt from '../alt';
import HomeActions from '../actions/home';
import { cloneDeep } from 'lodash';
import s from '../settings';

class HomeStore {

    constructor() {
        this.bindActions(HomeActions);
        this.isLoading = false;
        this.genre = 'all';
        this.page = 1;
        this.sortBys = cloneDeep(s.SORTABLES);
        this.movies = [];
    }

    onSetMovie(movie) {
        let movies = this.movies;
        let movieLen = movies.length;
        let i;

        for (i = 0; i < movieLen; i++) {
            if (movies[i].id == movie.id) {
                movies[i] = movie;
            }
        }
    }

    onLoadMovies(movies) {
        this.movies = movies;
    }

    onSetLoadingState(state) {
        this.isLoading = state;
    }
}

export default alt.createStore(HomeStore, 'HomeStore');
