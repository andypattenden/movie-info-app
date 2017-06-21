import React from 'react';
import MovieDetails from '../app/components/MovieDetails';
import renderer from 'react-test-renderer';

// TODO
xit('renders correctly', () => {
	const tree = renderer.create(
		<MovieDetails />
	).toJSON();

	expect(tree).toMatchSnapshot();
});
