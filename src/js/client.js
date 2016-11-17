import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import Layout from './components/layout';
import Home from './pages/home';
import Movie from './pages/movie';
import Problem from './pages/problem';
import LocalStorageStore from './utils/local-storage-store';

const app = document.getElementById('app');

//caching 
window.moviesStore = new LocalStorageStore('_movies');
window.genreStore = new LocalStorageStore('_genres');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Home} />
            <Route path="m/:movieId" component={Movie} />
            <Route path="problem" component={Problem} />
        </Route>
    </Router>,
    app
);