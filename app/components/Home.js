import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../utils/api';
import Loading from './Loading';

require('../styles/MovieList.css');

function MovieList(props) {
	return (
		<ul className='list-unstyled movie-list'>
		{props.movies.map(function(movie, index){

			var rank = index + 1;
			return (
				<li key={movie.Title}>
					<article className='row text-center'>
						<div className='col-sm-1 rank'>
							#{rank}
						</div>
						<div className='col-sm-2'>
							<img alt={`${movie.Title} poster`} className='img-responsive' src={movie.Poster} />
						</div>
						<div className='col-sm-5'>
							<h4>{movie.Title} <small>({movie.Year})</small></h4>
						</div>
						<div className='col-sm-2'>
							Score: {movie.imdbRating}
						</div>
						<div className='col-sm-2'>
							<Link
								className='button'
								to={{
									pathname: '/details',
									search: `?movie=${movie.imdbID}&rank=${rank}`
								}}
							>
								View Details &gt;
							</Link>
						</div>
					</article>
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
				<header className='page-header'>
					<h1 className='text-center'>IMDB Top 10 Rated Movies</h1>
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
