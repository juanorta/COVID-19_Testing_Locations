import React from 'react';
import Lottie from 'react-lottie';
// import * as data from '../Loading/data.json';
import * as handwashing from './handwashing.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: handwashing.default,
	animationSpeed: 1.5,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

const Loading = () => {
	return (
		<div style={{ marginTop: '20%' }}>
			<Lottie options={defaultOptions} height={200} width={200} />
		</div>
	);
};

export default Loading;
