var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

var Home = require('./Home');
var MovieDetails = require('./MovieDetails');

class App extends React.Component {
	render() {
		return (
			<Router>
				<div className='container'>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/details' component={MovieDetails} />
					</Switch>

					<p>Data from: <a href='http://www.omdbapi.com/'>OMDb API</a></p>
				</div>
			</Router>
		)
	}
}

module.exports = App;
