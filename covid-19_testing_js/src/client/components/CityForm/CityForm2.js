/* eslint-disable no-undef */
import React, { Component } from 'react';
import './CityForm2.css';
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
import { FaSearch, FaMapMarker, FaLocationArrow } from 'react-icons/fa';
import AutoComplete from 'react-google-autocomplete';
import Geocode from 'react-geocode';
import PropTypes from 'prop-types';
import Search from '../icons/search';
class CityForm2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			submitted: false,
			city: 'default',
			state: 'stateDefault',
			found: true,
			selected: false,
			city2: 'uh',
			radius: 0,
			clicked: 'none',
			lat: '',
			lng: '',
			textboxClicked: false,
			placeholder: 'Enter City',
			userLocation: false,
			placeSelected: false,
			states: [
				'Alabama',
				'Alaska',
				'Arizona',
				'Arkansas',
				'California',
				'Colorado',
				'Connecticut',
				'Delaware',
				'Florida',
				'Georgia',
				'Hawaii',
				'Idaho',
				'Illinois',
				'Indiana',
				'Iowa',
				'Kansas',
				'Kentucky',
				'Louisiana',
				'Maine',
				'Maryland',
				'Massachusetts',
				'Michigan',
				'Minnesota',
				'Mississippi',
				'Missouri',
				'Montana',
				'Nebraska',
				'Nevada',
				'New Hampshire',
				'New Jersey',
				'New Mexico',
				'New York',
				'North Carolina',
				'North Dakota',
				'Ohio',
				'Oklahoma',
				'Oregon',
				'Pennsylvania',
				'Rhode Island',
				'South Carolina',
				'South Dakota',
				'Tennessee',
				'Texas',
				'Utah',
				'Vermont',
				'Virginia',
				'Washington',
				'West Virginia',
				'Wisconsin',
				'Wyoming',
				'District of Columbia',
			],
		};
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	//sets city everytime there's a change in the textbox
	// static contextTypes = {
	// 	router: PropTypes.object,
	// };
	componentDidMount() {
		this.geocoder = new google.maps.Geocoder();

		document.addEventListener('mousedown', this.handleClickOutside);
		console.log(navigator.geolocation.getCurrentPosition);
	}

	setUserlocation = () => {
		console.log('location');

		navigator.geolocation.getCurrentPosition((position) => {
			this.setState(
				{
					lat: position.coords.latitude,
					lng: position.coords.longitude,
					textboxClicked: false,
					placeholder: 'My Location',
					userLocation: true,
				},
				() => {
					console.log(this.state);
				}
			);
		});
		//console.log(navigator.geolocation.getCurrentPosition(position));
	};

	handleClickOutside(event) {
		//console.log('click outside called');
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			if (this.state.lat == '') {
				setTimeout(() => {
					console.log('empty lat');
					this.setState({ textboxClicked: false });
				}, 125);
			}
		}

		//this.setState({ textboxClicked: true });
	}

	handleSubmit = (event) => {
		console.log('submit');

		event.preventDefault();
	};
	//takes in user input and converts that into a address object that contains a lot of information about the input
	//if the input is a city, it sets the city and state of that location and sends it to the url
	geocodeAddress = (address) => {
		console.log('PARSE CALLED = ' + address);
		console.log('USER LOCATION SELECTED = ' + this.state.userLocation);
		let stateResult = '';
		if (address == 'temple' || address == 'Temple') {
			address = 'temple tx';
		} else if (address == 'georgetown' || address == 'Georgetown') {
			address = 'georgetown tx';
		}
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

					for (
						let i = 0;
						i < results[0].address_components.length;
						i++
					) {
						// console.log(
						// 	i + ' ' + results[0].address_components[i].long_name
						// );
						for (let j = 0; j < this.state.states.length; j++) {
							if (
								results[0].address_components[i].long_name ==
								this.state.states[j]
							) {
								console.log(
									'address_components[' +
										i +
										'] = ' +
										this.state.states[j]
								);

								stateResult = this.state.states[j];
							}
						}
					}

					if (
						results[0].address_components[0].short_name ==
						'New York'
					) {
						this.setState(
							{
								city:
									results[0].address_components[0].long_name,
								state:
									results[0].address_components[0].long_name,
							},
							() => {
								console.log(this.state);
							}
						);

						// this.props.history.push(
						// 	`/citystate/${this.state.city}&${this.state.state}`
						// );
					}

					if (this.state.state == 'stateDefault') {
						this.setState(
							{
								city:
									results[0].address_components[0].long_name,
								state: stateResult,
								lat: results[0].geometry.location.lat(),
								lng: results[0].geometry.location.lng(),

								// selected: true,
							},
							() => {
								console.log(this.state);
							}
						);
					}

					// this.context.router.history.push(
					// 	`/citystate/${this.state.city}&${this.state.state}`
					// );

					if (this.state.clicked == true) {
						if (this.state.radius == 0) {
							this.props.history.push(
								`/citystate/${this.state.city}&${this.state.state}`
							);
						}
						if (this.state.radius != 0) {
							//check if onplacecalled is true. if it is, look up coordinates for this.state.city
							console.log('no user coordinates but has radius');
							if (this.state.placeSelected === true) {
								console.log('USE THIS.STATE.CITY');
								this.setState(
									{
										lat: this.state.lat,
										lng: this.state.lng,
									},
									() => {
										this.props.history.push(
											`/userlocation/${this.state.userLocation}&${this.state.city}&${this.state.lat}&${this.state.lng}&${this.state.radius}&${this.state.state}`
										);
									}
								);
							} else {
								this.setState(
									{
										lat: results[0].geometry.location.lat(),
										lng: results[0].geometry.location.lng(),
									},
									() => {
										this.props.history.push(
											`/userlocation/${this.state.userLocation}&${this.state.city}&${this.state.lat}&${this.state.lng}&${this.state.radius}&${this.state.state}`
										);
									}
								);
							}
						}
					} else if (this.state.clicked == false) {
						console.log('user coordinates');
						this.setState(
							{
								city:
									results[0].address_components[0].long_name,
								state:
									results[0].address_components[4].long_name,
							},
							() => {
								this.props.history.push(
									`/userlocation/${this.state.userLocation}&${this.state.city}&${this.state.lat}&${this.state.lng}&${this.state.radius}&${this.state.state}`
								);
							}
						);
					}
					// this.props.history.push(
					// 	`/citystate/${this.state.city}&${this.state.state}`
					// );
					return;
				} else {
					// this.props.history.push(
					// 	`/userlocation/${this.state.lat}&${this.state.lng}&${this.state.radius}&${this.state.state}`
					// );
					console.log(status);
					if (this.state.radius != 0) {
						console.log('radius not zero = ' + this.state.radius);
						this.props.history.push(
							`/userlocation/${this.state.userLocation}&${this.state.city}&${this.state.lat}&${this.state.lng}&${this.state.radius}&${this.state.state}`
						);
					} else {
						console.log('radius zero');
						this.props.history.push(
							`/citystate/${this.state.city}&${this.state.state}`
						);
					}
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

		console.log('place selected handler called');

		if (place.formatted_address === undefined) {
			console.log('place is undefined');
			//geocode place.name
			this.setState(
				{
					placeSelected: true,
				},
				() => {
					this.geocodeAddress(place.name);
				}
			);
		} else {
			console.log('not undefined');
			//geocode formatted_address
			this.setState(
				{
					placeSelected: true,
				},
				() => {
					this.geocodeAddress(place.formatted_address);
				}
			);
		}
	};

	//grabs city2 and puts it in the geocoder
	handleChange = (event) => {
		console.log(event.target.value);

		if (this.state.lat != '') {
			this.setState(
				{ placeholder: 'Enter City', lat: '', lng: '' },
				() => {
					console.log(this.state);
				}
			);
		}

		this.setState({
			city2: event.target.value,
			textboxClicked: false,
		});
	};

	//grabs city2 and puts it in the geocoder
	handleClick = (event) => {
		console.log(event.detail);
		//get whatever value is set from handle change city2 state2
		// put that value in the geocoder
		//let city2 = event.target.city;

		if (event.detail == 1 && this.state.userLocation === false) {
			this.setState({ clicked: true }, () => {
				this.geocodeAddress(this.state.city2);
			});
		} else if (event.detail == 1 && this.state.userLocation === true) {
			this.setState({ clicked: false });

			this.geocodeAddress(this.state.lat + ' ' + this.state.lng);
			// this.props.history.push(
			// 	`/userlocation/${this.state.lat}&${this.state.lng}&${this.state.radius}&${this.state.state}`
			// );
		} else {
			console.log('doesnt match either');
		}
	};

	handleDropDown = (event) => {
		console.log(event.target.value);

		if (event.target.value == 0) {
			this.clearCoordinates();
		}

		this.setState({ radius: event.target.value }, () => {
			console.log(this.state);
		});
	};

	textClickHandler = () => {
		console.log('textbox clicked');
		if (this.state.lat != '') {
			this.setState({ textboxClicked: false });
		} else {
			this.setState({ textboxClicked: true });
		}
	};

	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	clearCoordinates = () => {
		if (this.state.userLocation != true) {
			this.setState({ lat: '', lng: '' }, () => {
				console.log(this.state);
			});
		}
	};
	render() {
		return (
			<div className="form">
				<form
					onSubmit={this.handleSubmit}
					className="search-box2"
					ref={this.setWrapperRef}
				>
					<AutoComplete
						onChange={this.handleChange}
						type="text"
						onPlaceSelected={this.onPlaceSelectedHandler}
						className="textbox2"
						placeholder={this.state.placeholder}
						onClick={this.textClickHandler}
					/>
					<select
						className="dropdown2"
						onChange={this.handleDropDown}
					>
						<option value="0" onClick={this.clearCoordinates}>
							Radius
						</option>
						<option value="5">5 miles</option>
						<option value="10">10 miles</option>
						<option value="25">25 miles</option>
						<option value="50">50 miles</option>
					</select>

					{/* {this.state.selected ? (
						<Link
							to={`/citystate/${this.state.city}&${this.state.state}`}
						> */}
					{/* <a className="search-btn2">
								<FaSearch /> <button />
							</a> */}
					{/* </Link>
					// ) : ( */}
					<a className="search-btn2" onClick={this.handleClick}>
						<Search /> <button />
					</a>
					{this.state.textboxClicked ? (
						<div className="use-location-wrapper2">
							<div
								className="my-location2"
								onClick={this.setUserlocation}
							>
								<FaLocationArrow />
								<p>Use My Location</p>
							</div>
						</div>
					) : null}
					{/* )} */}
				</form>
			</div>
		);
	}
}

export default withRouter(CityForm2);
