import alt from '../alt';

class HomeActions {

    constructor() {
        this.generateActions(
            'loadMovies',
            'setLoadingState',
            'setMovie',
            'orderBy',
            'filterBy',
            'appendMovies',
            'toggleAppendingState',
            'nextPage',
            'setGenre',
            'setPage',
            'setTotalPages'
        );
    }

}

export default alt.createActions(HomeActions);