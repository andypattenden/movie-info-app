var React = require('react');
var PropTypes = require('prop-types');

require('../styles/Loading.css');

class Loading extends React.Component {
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

module.exports = Loading;
