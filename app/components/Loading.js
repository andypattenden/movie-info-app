import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/Loading.css';

class Loading extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: props.text
		}
	}

	render() {
		return (
			<p className='loading'>
				{this.state.text}
			</p>
		)
	}
}

Loading.propTypes = {
	text: PropTypes.string.isRequired
}

Loading.defaultProps = {
	text: 'Loading'
};

export default Loading;
