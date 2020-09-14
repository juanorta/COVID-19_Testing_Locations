import React, { useEffect, useState } from 'react';
import { useWindowScroll } from 'react-use';
import './ProgressBar.css';

const ProgressBar = () => {
	const { x, y } = useWindowScroll();
	const [scrolled, setScrolled] = useState(0);

	useEffect(() => {
		var element = document.getElementById('scroll');
		const height = element.scrollHeight - element.clientHeight;
		setScrolled((y / height) * 100);
	}, [y]);

	console.log('scroll-> ' + scrolled);

	return (
		<div className="scroll-container">
			{' '}
			okkkk
			<div className="indicator" style={{ width: `${scrolled}%` }}></div>
		</div>
	);
};

export default ProgressBar;
