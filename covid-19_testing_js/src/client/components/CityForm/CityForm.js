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
import ArrowKeysReact from 'arrow-keys-react';
class CityForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			city: 'default',
			state: '',
			selected: false,
			geocity: '',
			placeSelected: false,
			dots: 'default',
		};
		console.log(this.state);
		ArrowKeysReact.config({
			left: () => {
				console.log('left key detected.');
			},
			right: () => {
				console.log('right key detected.');
			},
			up: () => {
				console.log('up key detected.');
			},
			down: () => {
				console.log('down key detected.');
			},
		});
	}

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
					//let place = results[0].address_components[0].long_name;
					//retrn

					this.setState(
						{
							city: results[0].address_components[0].long_name,
						},
						() => {
							console.log(this.state);
						}
					);
				} else {
					console.log('not ok');
				}
			}.bind(this)
		);
	};
	//sets city everytime there's a change in the textbox
	handleCityChange = (event) => {
		//console.log('hmm');

		this.setState({ dots: ThreeDots });

		this.geocodeAddress(event.target.value);

		/*
			const val = event.target.value;
			clearTimeout(this.typingTimer);
			this.typingTimer = setTimeout(() => {
				if (val) {
					this.setState({ dots: 'd' });
				}
			}, 1100);
*/
		/*
			this.setState(
				{
					city: event.target.value,
				},
				() => {
					console.log(this.state);
				}
			);
			*/
		//this.selected();

		//console.log('hmm');
	};

	onPlaceSelectedHandler = (place) => {
		this.setState({ selected: true, placeSelected: true }, () => {
			console.log(this.state);
		});
		//this.handleCityChange();
	};

	handleSubmit = (event) => {
		console.log('submit');

		event.preventDefault();
	};

	clickHandler = (event) => {
		this.setState({ selected: true }, () => {
			console.log(this.state);
		});
		event.preventDefault();
	};

	render() {
		return (
			<div className="form">
				<form onSubmit={this.handleSubmit} className="search-box">
					<AutoComplete
						onPlaceSelected={this.onPlaceSelectedHandler}
						onKeyDown={this.handleCityChange.bind(this)}
						type="text"
						className="textbox"
						placeholder="Enter City"
					/>

					{console.log('selected -> ' + this.state.selected)}
					{this.state.selected ? (
						<Link to={`/city/${this.state.city}`}>
							<a className="search-btn">
								<FaSearch /> <button />
							</a>
						</Link>
					) : (
						<a className="search-btn">
							<Preloader
								use={this.state.dots}
								size={62}
								strokeWidth={8}
								strokeColor="black"
								duration={800}
							/>
							<FaSearch /> <button />
						</a>
					)}
				</form>
			</div>
		);
	}
}

export default CityForm;

/*
	<Link to={`/city/${this.state.city}`}>
						<a className="search-btn">
							<FaSearch /> <button />
						</a>
					</Link>
					*/
