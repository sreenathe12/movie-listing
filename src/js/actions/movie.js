import alt from '../alt';

class MovieActions {

    constructor() {
        this.generateActions(
            'setLoadingState',
            'loadMovie'
        );
    }

}

export default alt.createActions(MovieActions);