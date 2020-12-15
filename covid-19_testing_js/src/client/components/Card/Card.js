import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import {
	FaMapMarker,
	FaClinicMedical,
	FaMapPin,
	FaMapMarkedAlt,
	FaCar,
} from 'react-icons/fa';
import CityView from '../CityView/CityView';

const SiteCard = (props) => {
	let miles = true;
	if (props.miles == null) {
		miles = false;
	}
	return (
		<div className="card">
			<h2>{props.locationFacility}</h2>
			{miles === true ? (
				<div className="car-container">
					{' '}
					<a
						className="car"
						style={{ height: '0.5rem', color: '#fa121a' }}
					>
						<FaCar />{' '}
					</a>{' '}
					<h3> {props.miles} miles away</h3>
				</div>
			) : (
				<div>
					<h3>
						{' '}
						<a className="map-marker">
							<FaMapPin />{' '}
						</a>{' '}
						{props.locationAddress}
					</h3>
				</div>
			)}

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
					props.id,
					props.miles
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
