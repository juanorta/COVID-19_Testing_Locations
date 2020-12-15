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
	FaClock,
	FaMapPin,
	FaMapMarkedAlt,
	FaCar,
} from 'react-icons/fa';

const FacilityView = (props) => {
	let eligibilityIsFilled = true;
	let phoneIsFilled = true;
	let linkIsFilled = true;
	let hoursIsFilled = true;
	let miles = true;

	//checking if strings are empty.
	//will not display them if they're empty
	if (props.eligibility == '') {
		eligibilityIsFilled = false;
	}
	if (props.number == '') {
		phoneIsFilled = false;
	}
	if (props.link == '') {
		linkIsFilled = false;
	}
	if (props.hours == '') {
		hoursIsFilled = false;
	}
	if (props.miles == undefined) {
		miles = false;
	}

	return (
		<div className="facility-view">
			<FaArrowLeft
				className="back-arrow"
				onClick={props.handleCloseMoreInfo}
			></FaArrowLeft>
			<h1>{props.facility}</h1>

			{miles ? (
				<p>
					<a className="map-marker">
						<FaCar />
						{'  '}
					</a>
					{props.miles} miles away
				</p>
			) : null}

			<p>
				<a
					className="map-marker2"
					onClick={props.bounceMarker(props.id, props.zoom)}
				>
					<FaMapMarkedAlt />
				</a>

				<a
					className="view-map"
					onClick={props.bounceMarker(props.id, props.zoom)}
				>
					View on map
				</a>
			</p>

			<p>
				<a className="map-marker">
					<FaMapPin />{' '}
				</a>
				<a
					className="map-marker"
					href={
						'https://www.google.com/maps/place/' +
						props.address +
						' ' +
						props.city
					}
					target="_blank"
				>
					{props.address}
				</a>
			</p>
			<p>
				<a className="facility-type">
					<FaClinicMedical />{' '}
				</a>
				{props.type}
			</p>

			{phoneIsFilled ? (
				<p>
					<a className="phone-icon">
						<FaPhone />
						{'  '}
					</a>
					{props.number}
				</p>
			) : null}

			{eligibilityIsFilled ? (
				<p>
					<a className="phone-icon">
						<FaCheck />{' '}
					</a>
					Eligibility Check Required: {props.eligibility}
				</p>
			) : null}

			{linkIsFilled ? (
				<p>
					<a className="phone-icon">
						<FaLink /> {'   '}
					</a>
					<a
						className="phone-icon"
						href={`${props.link}`}
						target="_blank"
					>
						{props.link}
					</a>
				</p>
			) : null}

			{hoursIsFilled ? (
				<p>
					<a className="phone-icon">
						<FaClock />{' '}
					</a>
					Hours of Operation: {props.hours}
				</p>
			) : null}
		</div>
	);
};

export default FacilityView;
