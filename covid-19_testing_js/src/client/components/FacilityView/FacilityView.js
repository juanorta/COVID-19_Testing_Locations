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
	console.log('address-> ' + props.address);
	console.log('type-> ' + props.type);
	console.log('number-> ' + props.number);
	console.log('eligibility-> ' + props.eligibility);
	console.log('link-> ' + props.link);

	let eligibilityIsFilled = true;
	let phoneIsFilled = true;
	let linkIsFilled = true;

	//checking if strings are empty.
	//will not display them if they're empty
	if (props.eligibility == '') {
		console.log('empty eligibility');
		eligibilityIsFilled = false;
	}
	if (props.number == '') {
		console.log('empty phone');
		phoneIsFilled = false;
	}
	if (props.link == '') {
		linkIsFilled = false;
	}
	return (
		<div className="facility-view">
			<FaArrowLeft
				className="back-arrow"
				onClick={props.handleCloseMoreInfo}
			></FaArrowLeft>
			<h1>{props.facility}</h1>
			<p>
				<a className="map-marker">
					<FaMapMarker />{' '}
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
		</div>
	);
};

export default FacilityView;
