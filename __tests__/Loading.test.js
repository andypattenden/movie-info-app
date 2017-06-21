import React from 'react';
import Loading from '../app/components/Loading';
import renderer from 'react-test-renderer';

it('renders correctly with default text', () => {
	const tree = renderer.create(
		<Loading />
	).toJSON();

	expect(tree).toMatchSnapshot();
});

it('renders correctly with specified text', () => {
	const tree = renderer.create(
		<Loading text='Downloading...' />
	).toJSON();

	expect(tree).toMatchSnapshot();
});
