var axios = require('axios');

var movieDataURI = window.encodeURI('/data/movies.json');

function handleError(error) {
	console.warn(error);

	return null;
}

function getMovieData(cb) {
	return axios.get(movieDataURI)
		.then((response) => {
			return cb(response);
		})
		.catch(handleError)
}

module.exports = {
	fetchTopMovies: function() {
		return getMovieData((response) => {
			return response.data;
		});
	},

	fetchMovie: function(id) {
		return getMovieData((response) => {
			var movie = response.data.filter((movie) => {
				return movie.imdbID === id;
			})[0];

			if(typeof movie === 'undefined') {
				return null;
			}

			return movie;
		});
	}
}
