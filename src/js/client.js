import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import Layout from './components/layout';
import Home from './pages/home';

const app = document.getElementById('app');

//caching 
window.MOVIES = {};
window.GENRES = {};
window.LOADED_PAGES = {};

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Home} />
        </Route>
    </Router>,
    app
);