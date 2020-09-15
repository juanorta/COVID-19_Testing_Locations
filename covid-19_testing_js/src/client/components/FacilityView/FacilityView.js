import React, { Component } from 'react';
import CityForm2 from '../CityForm/CityForm2';
import { Grid } from '@material-ui/core';
import './FacilityView.css';
import {
	FaArrowLeft,
	FaMapMarker,
	FaClinicMedical,
	FaLocationArrow,
	FaPhone,
	FaCheck,
	FaLink,
	FaGlobeAmericas,
} from 'react-icons/fa';

const FacilityView = (props) => {
	//console.log(props.lat);
	return (
		<div className="facility-view">
			<FaArrowLeft
				className="back-arrow"
				onClick={props.handleCloseMoreInfo}
			></FaArrowLeft>
			<h1>{props.facility}</h1>
			<h2>
				<a className="map-marker">
					<FaMapMarker />{' '}
				</a>
				{props.address}
			</h2>
			<h2>
				<a className="facility-type">
					<FaClinicMedical />{' '}
				</a>
				{props.type}
			</h2>
			<h2>
				<a className="phone-icon">
					<FaPhone />{' '}
				</a>
				{props.number}
			</h2>
			<h2>
				<a className="phone-icon">
					<FaCheck />{' '}
				</a>
				Eligibility Required: {props.eligibility}
			</h2>

			<h2>
				<a
					className="phone-icon"
					href={`${props.link}`}
					target="_blank"
				>
					<FaLink />{' '}
				</a>
				View Website
			</h2>

			<h2>
				<a
					onClick={props.handleViewOnMap(props.lat, props.lng)}
					className="globe-icon"
				>
					<FaGlobeAmericas />{' '}
				</a>
				View on map
			</h2>
			<div className="more-info-row">
				{/* <a className="navigation-icon">
						<FaLocationArrow />{' '}
					</a>
					<a className="navigation-icon">
						<FaLocationArrow />{' '}
					</a> */}
			</div>
		</div>
	);
};

export default FacilityView;
