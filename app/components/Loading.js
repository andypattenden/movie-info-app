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
			<div className='text-center'>
				<div id="p2" className="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
				{this.state.text}
			</div>
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
