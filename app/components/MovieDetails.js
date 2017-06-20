var React = require('react');
var Link = require('react-router-dom').Link;

class MovieDetails extends React.Component {
	render() {
		return (
			<div>
				<h1 className='text-center'>Movie Name</h1>

				<Link to='/'>Back to list</Link>
			</div>
		)
	}
}

module.exports = MovieDetails;
