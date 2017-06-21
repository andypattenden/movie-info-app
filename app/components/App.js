import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import Home from './Home';
import MovieDetails from './MovieDetails';

class App extends Component {
	render() {
		return (
			<Router>
				<div className='container'>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/details' component={MovieDetails} />
					</Switch>

					<footer>
						<p>Data from: <a href='http://www.omdbapi.com/'>OMDb API</a></p>
					</footer>
				</div>
			</Router>
		)
	}
}

export default App;
