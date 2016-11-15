import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Layout from './components/layout';
import Home from './pages/home';
import LocalStorageStore from './utils/local-storage-store';

const app = document.getElementById('app');

//caching 
window.moviesStore = new LocalStorageStore('_movies');
window.genreStore = new LocalStorageStore('_genres');

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Home} />
        </Route>
    </Router>,
    app
);