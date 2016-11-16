export default {

    API_KEY: 'd77348e9ccd03cbb1af8a427beb866c8',
    ENDPOINTS: {
        BASE_MOVIE: 'http://api.themoviedb.org/3/movie/',
        LATEST: 'http://api.themoviedb.org/3/movie/latest',
        NOW_PLAYING: 'http://api.themoviedb.org/3/movie/now_playing',
        POPULAR: 'http://api.themoviedb.org/3/movie/popular',
        SEARCH: 'http://api.themoviedb.org/3/search/movie',
        BASE_GENRE: 'http://api.themoviedb.org/3/genre/'
    },
    MOVIES_PER_ROW: 4,
    IMAGE_POSTER: 342,
    IMAGE_WIDTH: 780,
    SORTABLES: [
        { label: 'Title', value: 'title' },
        { label: 'Release Date', value: 'release_date' },
        { label: 'Vote average', value: 'vote_average' },
        { label: 'Popularity', value: 'popularity' }
    ]
}