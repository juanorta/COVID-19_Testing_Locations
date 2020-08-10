/* eslint-disable no-undef */
import React, { Component } from 'react';

import './CityForm.css';
import CityView from '../CityView/CityView';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	withRouter,
	button,
	Link,
} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { FaSearch } from 'react-icons/fa';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from 'react-google-maps';
import AutoComplete from 'react-google-autocomplete';
import Geocode from 'react-geocode';
import { Preloader, ThreeDots } from 'react-preloader-icon';

import PropTypes from 'prop-types';
class CityForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			city: 'default',
			textSelected: false,
			selected: false,
			state: 'stateDefault',
			placeSelected: false,
		};
		console.log(this.state);
	}
	static contextTypes = {
		router: PropTypes.object,
	};

	componentDidMount() {
		this.geocoder = new google.maps.Geocoder();
	}
	componentWillUnmount() {
		clearTimeout(this.typingTimer);
	}
	componentWillReceiveProps() {
		// write your logic here or call to the common method
		console.log('will receive');
	}

	handleSubmit = (event) => {
		console.log('submit');

		event.preventDefault();
	};

	geocodeAddress = (address) => {
		console.log('PARSE CALLED = ' + address);
		setTimeout(function () {}, 3000);
		this.geocoder.geocode(
			{ address: address },
			function handleResults(results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					console.log(results);
					console.log(
						'Geocoder results ->' +
							results[0].address_components[0].short_name
					);

					this.setState(
						{
							city: results[0].address_components[0].long_name,
							state: results[0].address_components[2].long_name,
							selected: true,
						},
						() => {
							console.log(this.state);
						}
					);
					/*
					this.context.router.history.push(
						`/city/${this.state.city}`
					);
					*/
					this.context.router.history.push(
						`/citystate/${this.state.city}&${this.state.state}`
					);
				} else {
					console.log('not ok');
				}
			}.bind(this)
		);
	};

	handleCityChange = (event) => {};

	onPlaceSelectedHandler = (place) => {
		console.log(place.formatted_address);
		console.log(place);

		if (place.formatted_address === undefined) {
			console.log('place is undefined');
			//geocode place.name

			this.geocodeAddress(place.name);
		} else {
			console.log('not undefined');
			//geocode formatted_address
			this.geocodeAddress(place.formatted_address);
		}
	};
	render() {
		return (
			<div className="form">
				<form onSubmit={this.handleSubmit} className="search-box">
					<AutoComplete
						onPlaceSelected={this.onPlaceSelectedHandler}
						onChange={this.handleCityChange.bind(this)}
						onMouseEnter={this.handleCityChange}
						type="text"
						className="textbox"
						placeholder="Enter City"
					/>

					{console.log('selected -> ' + this.state.selected)}
					{this.state.selected ? (
						<Link
							to={`/citystate/${this.state.city}&${this.state.state}`}
						>
							<a className="search-btn">
								<FaSearch /> <button />
							</a>
						</Link>
					) : (
						<a className="search-btn">
							<FaSearch /> <button />
						</a>
					)}
				</form>
			</div>
		);
	}
}

export default CityForm;
