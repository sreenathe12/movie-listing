import alt from '../alt';
import MovieActions from '../actions/movie';

class MovieStore {

	constructor() {
		this.bindActions(MovieActions);

		this.isLoading = false;
		this.movie = null;
	}

	onLoadMovie(movie) {
		this.movie = movie;
	}

	onSetLoadingState(state) {
		this.isLoading = state;
	}


}

export default alt.createStore(MovieStore, 'MovieStore');