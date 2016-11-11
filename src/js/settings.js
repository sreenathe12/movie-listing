export default {

    API_KEY: 'd77348e9ccd03cbb1af8a427beb866c8',
    ENDPOINTS: {
        BASE_MOVIE: 'https://api.themoviedb.org/3/movie/',
        NOW_PLAYING: 'https://api.themoviedb.org/3/movie/now_playing'
    },
    MOVIES_PER_ROW: 4,
    IMAGE_WIDTH: 300,
    SORTABLES: [
        { title: 'Title', key: 'title', selected: true },
        { title: 'Release Date', key: 'release_date', selected: false },
        { title: 'Vote average', key: 'vote_average', selected: false },
        { title: 'Popularity', key: 'popularity', selected: false }
    ]
}