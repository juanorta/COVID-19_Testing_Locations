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
	useHistory,
} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { FaSearch, FaMapMarker } from 'react-icons/fa';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from 'react-google-maps';
import AutoComplete from 'react-google-autocomplete';
import Geocode from 'react-geocode';
import PropTypes from 'prop-types';
import { browseHistory } from 'react-router';

class CityForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			city: 'default',
			selected: false,
			state: 'stateDefault',
			placeSelected: false,
		};
		console.log(this.state);
		//const history = useHistory();
	}

	// static contextTypes = {
	// 	router: PropTypes.object,
	// };

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

	//takes in user input and converts that into a address object that contains a lot of information about the input
	//if the input is a city, it sets the city and state of that location and sends it to the url
	geocodeAddress = (address) => {
		console.log('PARSE CALLED = ' + address);
		setTimeout(function () {}, 3000);
		this.geocoder.geocode(
			{ address: address },
			function handleResults(results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					console.log(results);
					console.log(results[0].geometry.location.toString());
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
					// this.context.router.history.push(
					// 	`/citystate/${this.state.city}&${this.state.state}`
					// );

					this.props.history.push(
						`/citystate/${this.state.city}&${this.state.state}`
					);
				} else {
					console.log('not ok');
				}
			}.bind(this)
		);
	};

	// receives user-entered input and autocomplete-selected input as 'place.'
	// on submit, if place.formatted_address is undefined, then it was a user-entered input and feeds that info to
	// the geocoder
	// if place is defined, then it is a autocomplete-selected input and feeds it to the geocoder.
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

export default withRouter(CityForm);
