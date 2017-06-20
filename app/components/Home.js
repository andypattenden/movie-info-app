var React = require('react');
var Link = require('react-router-dom').Link;

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

class Home extends React.Component {
	render() {
		return (
			<div>
				<h1 className='text-center'>Top 10 Rated Movies</h1>

				<MovieList />
			</div>
		)
	}
}

module.exports = Home;
