import alt from '../alt';

class HomeActions {

    constructor() {
        this.generateActions(
            'loadMovies',
            'setLoadingState',
            'setMovie',
            'orderBy',
            'appendMovies',
            'toggleAppendingState',
            'nextPage',
            'setGenre'
        );
    }

}

export default alt.createActions(HomeActions);