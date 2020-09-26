import React from 'react';
import Lottie from 'react-lottie';

import * as spin from './spin.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: spin.default,
	animationSpeed: 1.5,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

const TextboxLoading = () => {
	return (
		<div style={{ marginTop: '-1.35rem' }}>
			<Lottie options={defaultOptions} height={50} width={50} />
		</div>
	);
};

export default TextboxLoading;
