import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../utils/api';
import Loading from './Loading';

require('../styles/MovieList.css');

function MovieList(props) {
	return (
		<ul className='movie-list'>
		{props.movies.map(function(movie, index){

			var rank = index + 1;
			return (
				<li key={movie.Title} className='mdl-grid mdl-grid--no-spacing mdl-shadow--4dp'>

					<div className='section__play-btn mdl-cell mdl-cell--3-col'>
						<img alt={`${movie.Title} poster`} className='img-responsive' src={movie.Poster} />
					</div>

					<div className='mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone'>

						<div className='mdl-card__title'>
							<h4 className='mdl-card__title-text'>{movie.Title} <small>({movie.Year})</small></h4>
						</div>
						
						<div className='mdl-card__supporting-text'>
							<p>{movie.Summary}</p>
							Score: {movie.imdbRating}
						</div>

						<div className='mdl-card__actions mdl-card--border'>
				
							<Link
								className='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect'
								to={{
									pathname: '/details',
									search: `?movie=${movie.imdbID}&rank=${rank}`
								}}
							>
								View Details
							</Link>
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

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			movies: null
		}
	}

	// Fetches the top movies when the component renders
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
				<header className='mdl-layout__header'>
					<div className="mdl-layout__header-row">
					<h1 className='mdl-layout-title'>IMDB Top 10 Rated Movies</h1>
					</div>
				</header>

				{
					// Renders 'Loading' until the component has fetched the movies data
					!this.state.movies ?
						<Loading text='Loading top 10 list...' />
					:
						<MovieList movies={this.state.movies} />
				}

			</div>
		)
	}
}

export default Home;
