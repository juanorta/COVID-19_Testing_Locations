import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import { FaMapMarker, FaClinicMedical } from 'react-icons/fa';

const SiteCard = (props) => {
	return (
		<div className="card">
			<h2>{props.locationFacility}</h2>
			<h3>
				{' '}
				<a className="map-marker">
					<FaMapMarker />{' '}
				</a>{' '}
				{props.locationAddress}
			</h3>
			<h4>
				{' '}
				<a className="facility-type">
					<FaClinicMedical size="1.5rem" />
				</a>
				{props.locationFacilityType}
			</h4>

			<Link to={`/address/${props.locationAddress}`}>
				<button>More Info</button>
			</Link>
		</div>
	);
};

//make media query to decrease font size when on mobile
/*
<h4>Phone Number: {props.phoneNumber}</h4>
			<h4>Eligibility: {props.eligibility}</h4>
			<h4>Website: {props.website}</h4>
			*/
export default SiteCard;
