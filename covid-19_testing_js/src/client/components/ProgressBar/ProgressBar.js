import React, { useEffect, useState } from 'react';
import { useWindowScroll } from 'react-use';
import './ProgressBar.css';

const ProgressBar = (props) => {
	const { x, y } = useWindowScroll();
	//const [scrolled, setScrolled] = useState(0);

	let scrolled;
	let height = props.scrollHeight - props.clientHeight;

	scrolled = `${(props.scrollTop / height) * 100}%`;
	if (props.scrolled == 0) {
		scrolled = `${props.scrollTop * 0}%`;
	}

	return (
		<div className="scroll-container">
			<div className="indicator" style={{ width: `${scrolled}` }}></div>
		</div>
	);
};

export default ProgressBar;
