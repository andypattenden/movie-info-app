var React = require('react');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');
var api = require('../utils/api');
var QueryString = require('query-string');

require('../styles/MovieDetails.css');

var Loading = require('./Loading');

function MovieHeader(props) {
	return (
		<div className='page-header'>
			<div className='row'>
				<h1 className='col-sm-9'>#{props.rank} {props.title} <small>({props.year})</small></h1>
				<div className='col-sm-3'>
					Score: {props.rating}/10<br/>
					{props.votes} votes
				</div>
			</div>

			<div className='row'>
				<div className='col-sm-3'>
					Certificate: {props.certificate}
				</div>
				<div className='col-sm-3'>
					{props.runtime}
				</div>
				<div className='col-sm-3'>
					{props.genre}
				</div>
				<div className='col-sm-3'>
					{props.released}
				</div>
			</div>
		</div>
	)
}

MovieHeader.propTypes = {
	title: PropTypes.string.isRequired,
	year: PropTypes.string.isRequired,
	certificate: PropTypes.string.isRequired,
	runtime: PropTypes.string.isRequired,
	genre: PropTypes.string.isRequired,
	released: PropTypes.string.isRequired,
	rating: PropTypes.string.isRequired,
	votes: PropTypes.string.isRequired,
	rank: PropTypes.string.isRequired
}

function MovieBody(props) {
	return (
		<div className='row'>
			<div className='col-sm-4'>
				<img
					className='img-responsive'
					alt={`${props.title} poster`}
					src={props.poster}
				/>
			</div>
			<div className='col-sm-8'>
				<p>{props.plot}</p>
			</div>
		</div>
	)
}

MovieBody.propTypes = {
	title: PropTypes.string.isRequired,
	poster: PropTypes.string.isRequired,
	plot: PropTypes.string.isRequired
}

function CastAndCrew(props) {
	return (
		<div>
			<h2>Cast &amp; Crew</h2>
			<h3>Directed by</h3>
			{props.director}

			<Writers writers={props.writers} />
			<Actors actors={props.actors} />

		</div>
	)
}

CastAndCrew.propTypes = {
	director: PropTypes.string.isRequired,
	writers: PropTypes.arrayOf(PropTypes.string).isRequired,
	actors: PropTypes.arrayOf(PropTypes.string).isRequired
}

function Actors(props) {
	return (
		<div>
			<h3>Actors</h3>
			<ul>
				{props.actors.map((actor) =>{
					return <li key={actor}>{actor}</li>
				})}
			</ul>
		</div>
	)
}

Actors.propTypes = {
	actors: PropTypes.arrayOf(PropTypes.string).isRequired
}

function Writers(props) {
	return (
		<div>
			<h3>Writers</h3>
			<ul>
				{props.writers.map((writer) =>{
					return <li key={writer}>{writer}</li>
				})}
			</ul>
		</div>
	)
}

Writers.propTypes = {
	writers: PropTypes.arrayOf(PropTypes.string).isRequired
}

class MovieDetails extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			movie: null,
			error: null,
			rank: null
		}
	}

	// Fetches the data for the movie with the specified ID
	componentDidMount() {
		var search = QueryString.parse(this.props.location.search);

		// Try to fetch the movie with the spcified ID
		// Display an error if not found
		api
			.fetchMovie(search.movie)
			.then((movie) => {
				if(movie === null) {
					return this.setState(function() {
						return {
							error: 'Looks like there was an error. Check the ID of the movie specified'
						}
					})
				}

				this.setState(() => {
					return {
						movie: movie,
						rank: search.rank
					}
				})
			});
	}

	render() {
		var movie = this.state.movie;
		var error = this.state.error;

		if(error) {
			return (
				<div>
					<div className='alert alert-danger' role='alert'>{error}</div>
					<p><Link to='/'>&lt; Back to list</Link></p>
				</div>
			)
		}


		return (
			<div>
				{
					!this.state.movie ?
						<Loading text='Loading movie details...' />
					:
						<div className='movie-details'>
							<MovieHeader
								rank={this.state.rank}
								title={movie.Title}
								year={movie.Year}
								certificate={movie.Rated}
								runtime={movie.Runtime}
								genre={movie.Genre}
								released={movie.Released}
								rating={movie.imdbRating}
								votes={movie.imdbVotes}
							/>

							<div className="row">
								<div className='col-sm-4'>
									<img
										className='img-responsive'
										alt={`${movie.Title} poster`}
										src={movie.Poster}
									/>
								</div>
								<div className='col-sm-8'>
									<p className='lead'>{movie.Plot}</p>

									<CastAndCrew
										director={movie.Director}
										writers={movie.Writer.split(',')}
										actors={movie.Actors.split(',')}
									/>
								</div>
							</div>
						</div>
				}

				<p><Link to='/'>&lt; Back to list</Link></p>
			</div>
		)
	}
}

MovieDetails.propTypes = {
	location: PropTypes.shape({
		search: PropTypes.string.isRequired
	})
}

module.exports = MovieDetails;
