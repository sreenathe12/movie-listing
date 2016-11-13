import alt from '../alt';

class HomeActions {

    constructor() {
        this.generateActions(
            'loadMovies',
            'setLoadingState',
            'setMovie',
            'toggleFilterState',
            'selectFilter'
        );
    }

}

export default alt.createActions(HomeActions);