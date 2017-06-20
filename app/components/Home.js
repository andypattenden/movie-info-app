var React = require('react');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');
var api = require('../utils/api');

function MovieList(props) {
	return (
		<ul className='list-unstyled'>
		{props.movies.map(function(movie, index){
			return (
				<li key={movie.Title}>
					#{index + 1}
					<div className='row'>
						<div className='col-sm-1'>
							<img className='img-responsive' src={movie.Poster} />
						</div>
						<div className='col-sm-6'>
							{movie.Title} ({movie.Year})
						</div>
						<div className='col-sm-2'>
							Score: {movie.imdbRating}
						</div>
						<div className='col-sm-3'>
							<Link to='/details'>View Details</Link>
						</div>
					</div>
				</li>
			)
		})}
		</ul>
	)
}

MovieList.propTypes = {
	movies: PropTypes.array.isRequired
}

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			movies: null
		}
	}

	componentDidMount() {
		api
			.fetchTopMovies()
			.then((movies) => {
				this.setState(function(){
					return {
						movies: movies
					}
				})
			});
	}

	render() {
		return (
			<div>
				<h1 className='text-center'>Top 10 Rated Movies</h1>

				{
					!this.state.movies ?
						'Loading...'
					:
						<MovieList movies={this.state.movies} />
				}

			</div>
		)
	}
}

module.exports = Home;
