import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

const SiteCard = (props) => {
	return (
		<div className="card">
			<h2>{props.locationFacility}</h2>
			<h3>Address: {props.locationAddress}</h3>
			<h4>Facility Type: {props.locationFacilityType}</h4>
			<Link to={`/facility/${props.locationFacility}`}>
				<button>More Info</button>
			</Link>
		</div>
	);
};

//make media query to decrease font size when on mobile

export default SiteCard;
