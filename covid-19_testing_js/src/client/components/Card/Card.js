import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import {
	FaMapMarker,
	FaClinicMedical,
	FaMapPin,
	FaMapMarkedAlt,
} from 'react-icons/fa';
import CityView from '../CityView/CityView';

const SiteCard = (props) => {
	// function handleClick() {
	// 	console.log('more info clicked');
	// }
	//	console.log(props.id);

	return (
		<div className="card">
			<h2>{props.locationFacility}</h2>
			<h3>
				{' '}
				<a className="map-marker">
					<FaMapPin />{' '}
				</a>{' '}
				{props.locationAddress}
			</h3>
			<h3>
				{' '}
				<div className="clinc-map-row">
					<a className="facility-type">
						<FaClinicMedical />{' '}
					</a>{' '}
					{props.locationFacilityType}
					<a
						className="view-on-map"
						onClick={props.bounceMarker(props.id, props.zoom)}
					>
						<FaMapMarkedAlt /> View on map
					</a>{' '}
				</div>
			</h3>
			<button
				onClick={props.handleMoreInfo(
					props.city,
					props.locationFacility,
					props.locationAddress,
					props.locationFacilityType,
					props.phoneNumber,
					props.eligibility,
					props.link,
					props.lat,
					props.lng,
					props.hours,
					props.id
				)}
			>
				More Info
			</button>

			{/* <Link to={`/address/${props.locationAddress}`}>
				<button>More Info</button>
			</Link> */}
		</div>
	);
};

export default SiteCard;
