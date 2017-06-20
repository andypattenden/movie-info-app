var React = require('react');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');
var api = require('../utils/api');

function MovieList(props) {
	return (
		<ol>
			<li>
				<div className='row'>
					<div className='col-sm-1'>
						<img src='' />
					</div>
					<div className='col-sm-6'>
						Title (year)
					</div>
					<div className='col-sm-2'>
						Score
					</div>
					<div className='col-sm-3'>
						<Link to='/details'>View Details</Link>
					</div>
				</div>
			</li>
		</ol>
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
		api.fetchTopMovies()
			.then((movies) => {

				console.log(movies)
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
						<MovieList />
				}

			</div>
		)
	}
}

module.exports = Home;
