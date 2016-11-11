import alt from '../alt';

class HomeActions {

    constructor() {
        this.generateActions(
            'loadMovies',
            'setLoadingState',
            'setMovie'
        );
    }

}

export default alt.createActions(HomeActions);