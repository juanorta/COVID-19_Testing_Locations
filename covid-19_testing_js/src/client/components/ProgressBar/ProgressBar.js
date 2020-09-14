import React, { useEffect, useState } from 'react';
import { useWindowScroll } from 'react-use';
import './ProgressBar.css';

const ProgressBar = (props) => {
	const { x, y } = useWindowScroll();
	//const [scrolled, setScrolled] = useState(0);

	// console.log(props.scrollHeight);
	// console.log(props.clientHeight);
	// console.log(props.scrollTop);
	let scrolled;
	let height = props.scrollHeight - props.clientHeight;
	console.log('scroll count -> ' + props.scrolled);

	// useEffect(() => {
	// 	//var element = document.getElementById('scroll');
	// 	//const height = element.scrollHeight - element.clientHeight;
	// 	//console.log(props.scrollHeight);
	// 	//setScrolled((y / height) * 100);
	// 	//setScrolled((props.scrollTop / height) * 100);
	// }, [y]);
	// if (isNaN(scrolled)) {
	// 	scrolled = `${props.scrollTop * 0 * 100}%`;
	// 	console.log('not a number');
	// }
	scrolled = `${(props.scrollTop / height) * 100}%`;
	if (props.scrolled == 0) {
		scrolled = `${props.scrollTop * 0}%`;
	}
	console.log('scroll-> ' + scrolled);

	return (
		<div className="scroll-container">
			<div className="indicator" style={{ width: `${scrolled}` }}></div>
		</div>
	);
};

export default ProgressBar;
