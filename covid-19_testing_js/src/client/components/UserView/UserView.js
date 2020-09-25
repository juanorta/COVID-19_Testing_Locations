/*global google*/
import React, { Component, useState } from 'react';
import './UserView.css';
import Loading from '../Loading/Loading';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	withRouter,
	button,
	Link,
} from 'react-router-dom';
import { Grid } from '@material-ui/core';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	InfoWindow,
	Circle,
} from 'react-google-maps';
import AutoComplete from 'react-google-autocomplete';
import SiteCard from '../Card/Card';
import CityForm2 from '../CityForm/CityForm2';
import CityForm from '../CityForm/CityForm';
import MapStyles from '../MapStyles';
import FacilityView from '../FacilityView/FacilityView';
import {
	FaMapMarkedAlt,
	FaTimes,
	FaList,
	FaMapMarkerAlt,
} from 'react-icons/fa';
import ProgressBar from '../ProgressBar/ProgressBar';
import MapIcon from '../icons/map';
import List from '../icons/list';

const options = {
	styles: MapStyles,
};

function Map(props) {
	let lat;
	let lng;
	let cardhover = props.cardHover;
	const [selectedMarker, setSelectedMarker] = useState(null);
	const [currentZoom, setCurrentZoom] = useState(props.defaultZoom);
	const [load, setLoad] = useState(1);
	const [dropCount, setDrop] = useState(0);
	//const [animation, setAnimation] = useState('');
	var center; // a latLng
	var offsetX = parseFloat(props.offsetX); // move center one quarter map width left
	var offsetY = parseFloat(props.offsetY); // move center one quarter map height down
	//will set the center coordinates to a city's until a marker is clicked
	let radius = props.radius * 1609.344;
	if (load == 1) {
		//console.log('true');
		lat = parseFloat(props.lat) - offsetX;
		lng = parseFloat(props.lng) - offsetY;
	}
	//changes the center of a map to the coordinates of the selected marker
	function handleCenterChange(selectedLat, selectedLng) {
		cardhover = 0;
		lat = parseFloat(selectedLat);
		lng = parseFloat(selectedLng);
		setLoad(0);
	}
	function handleCenterChange2() {
		//console.log(this.getCenter().toJSON());
		cardhover = 0;
		lat = parseFloat(this.getCenter().toJSON().lat);
		lng = parseFloat(this.getCenter().toJSON().lng);
		setLoad(0);
	}
	//sets the zoom level to the current zoom
	//this prevents the map from loading to the default city zoom on every marker click
	function handleZoomChange() {
		//console.log('zoom changed ' + this.getZoom());
		cardhover = 0;
		setCurrentZoom(this.getZoom());
		//props.updateCount();
		//console.log('currentzoom ' + currentZoom);
	}
	function stopBounce() {
		cardhover = 0;
	}
	// console.log(props.newLat + ' ' + props.newLng);
	// if (counter != 1) {
	// 	animation = 0;
	// }
	return (
		<GoogleMap
			key={new Date().getTime()}
			defaultZoom={currentZoom}
			defaultCenter={{
				lat: parseFloat(lat),
				lng: parseFloat(lng),
			}}
			defaultOptions={{
				styles: MapStyles,
				disableDefaultUI: true,
				gestureHandling: 'greedy',
			}}
			onClick={() => {
				setSelectedMarker(null);
			}}
			onZoomChanged={handleZoomChange}
			onCenterChanged={handleCenterChange2}
			//	onGoogleApiLoaded={hi()}
		>
			{props.locations.map((location) => (
				<Marker
					key={location.id}
					position={{
						lat: parseFloat(location.lat),
						lng: parseFloat(location.lng),
					}}
					defaultAnimation={
						cardhover === location.id
							? google.maps.Animation.BOUNCE
							: null
					}
					onClick={() => {
						setSelectedMarker(location);
						handleCenterChange(
							parseFloat(location.lat),
							parseFloat(location.lng)
						);
					}}
					// icon={{
					// 	url: '/marker.svg',
					// 	scaledSize: new window.google.maps.Size(15, 15),
					// }}
				/>
			))}
			<Circle
				defaultCenter={{
					lat: props.lat,
					lng: props.lng,
				}}
				radius={radius}
				options={{
					strokeColor: '#ff0000',
				}}
			/>
			{selectedMarker && (
				<InfoWindow
					key={selectedMarker.id}
					position={{
						lat: parseFloat(selectedMarker.lat),
						lng: parseFloat(selectedMarker.lng),
					}}
					onCloseClick={() => {
						setSelectedMarker(null);
					}}
				>
					<div>
						<h3>{selectedMarker.facility}</h3>
						<p>{selectedMarker.address}</p>
						<p>{selectedMarker.facility_type}</p>
						<a
							href={
								'https://www.google.com/maps/place/' +
								selectedMarker.address +
								' ' +
								selectedMarker.city
							}
							target="_blank"
						>
							View on Google Maps
						</a>
					</div>
				</InfoWindow>
			)}
		</GoogleMap>
	);
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

class UserView extends Component {
	constructor(props, { match }) {
		super(props);

		this.state = {
			loading: true,
			columnSize: 4,
			offsetX: 0.01,
			offsetY: 0.23,
			defaultZoom: 10,
			isLoaded: true,
			locations: [],
			userLocation: props.match.params.locationAccess,
			city: props.match.params.city,
			defaultLat: props.match.params.lat,
			defaultLng: props.match.params.lng,
			state: props.match.params.state,
			radius: props.match.params.radius,
			markers: [
				{
					lat: '',
					lng: '',
				},
			],
			drawerOpen: true,
			cardHover: '',
			moreInfoSelected: false,
			cityFView: '',
			facility: '',
			address: '',
			type: '',
			number: '',
			eligibility: '',
			link: '',
			hours: '',
			lat: '',
			lng: '',
			id: '',
			miles: '',
			onLoad: 0,
			changeMarkerColor: '/marker.svg',
		};
		//	this.moreInfoSelected = this.moreInfoSelected.bind(this);
		this.myRef = React.createRef();
	}

	componentDidMount() {
		console.log('state = ' + this.state.state);
		console.log('lat = ' + this.state.defaultLat);
		console.log('lng = ' + this.state.defaultLng);
		console.log('radius = ' + this.state.radius);
		this.handleScreenResize();
		this.handleMapOffsets();
		this.handleLoad();
		this.geocoder = new google.maps.Geocoder();
		fetch(
			`/api/covid_db/userlocation/${this.state.userLocation}&${this.state.city}&${this.state.defaultLat}&${this.state.defaultLng}&${this.state.radius}&${this.state.state}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		)
			.then((res) => res.json())
			.then((stateLocations) =>
				this.setState({ stateLocations }, () =>
					console.log('Locations fetched...', stateLocations)
				)
			);

		setTimeout(() => {
			this.getLocations();
		}, 3000);
		// this.geocodeAddress(this.state.city + this.state.state);
	}

	componentWillReceiveProps() {
		//console.log('willreceive');

		window.location.reload(true);
	}

	getLocations = () => {
		if (this.state.radius == 0) {
			console.log('state should increase');
			this.setState({ radius: 5 });
		}

		let counter = 0;
		this.state.stateLocations.forEach((element) => {
			element.Miles = 2;
		});
		let locationsCopy = { ...this.state.stateLocations };
		let newArray = [];
		let milesArray = [];
		for (let i = 0; i < this.state.stateLocations.length; i++) {
			let myLatLngA = new google.maps.LatLng({
				lat: parseFloat(this.state.defaultLat),
				lng: parseFloat(this.state.defaultLng),
			});

			let myLatLngB = new google.maps.LatLng({
				lat: parseFloat(this.state.stateLocations[i].lat),
				lng: parseFloat(this.state.stateLocations[i].lng),
			});

			let result = google.maps.geometry.spherical.computeDistanceBetween(
				myLatLngA,
				myLatLngB
			);

			let resultInMiles = result * 0.000621371192;
			if (resultInMiles <= this.state.radius) {
				counter++;
				//	console.log('---> ' + counter);
				resultInMiles = parseFloat(resultInMiles).toFixed(2);
				locationsCopy[i].Miles = resultInMiles;
				newArray[counter] = locationsCopy[i];
			}
		}

		newArray.sort((a, b) => {
			return parseFloat(a.Miles) - parseFloat(b.Miles);
		});
		//console.log(newArray);
		newArray.forEach((element, index) => {
			//element.Miles = milesArray[index];
			this.setState({
				locations: [...this.state.locations, element],
				loading: false,
			});
		});
		console.log(this.state.locations.length);
		if (this.state.locations == 0) {
			this.setState({ loading: false });
		}
		//this.forceUpdate();
	};

	handleMouseOver(locationID) {
		this.setState({ cardHover: locationID });
		//	console.log(this.state);
	}
	handleMouseLeave() {
		this.setState({ cardHover: '' });
	}

	handleMoreInfo = (
		city,
		facility,
		address,
		type,
		phoneNumber,
		eligibility,
		link,
		lat,
		lng,
		hours,
		id,
		miles
	) => () => {
		this.setState(
			{
				moreInfoSelected: true,
				cityFView: city,
				facility: facility,
				address: address,
				type: type,
				number: phoneNumber,
				eligibility: eligibility,
				link: link,
				lat: lat,
				lng: lng,
				hours: hours,
				id: id,
				cardHover: 0,
				miles: miles,
			},
			() => {
				console.log(this.state);
			}
		);
	};

	handleCloseMoreInfo = () => {
		//	console.log('closed');
		this.setState(
			{
				moreInfoSelected: false,
				facility: '',
				address: '',
				type: '',
				number: '',
				eligibility: '',
				link: '',
				cardHover: '',
				hours: '',
				id: '',
			},
			() => {
				console.log(this.state);
			}
		);
	};

	//when called, changes the map zoom
	handleViewOnMap = (lat, lng) => () => {
		//console.log('handle view on map-> ' + lat + lng);
		this.setState({ defaultZoom: 15 }, () => {
			console.log(this.state);
		});
	};

	handleDrawerToggle = () => {
		this.setState(
			(prevState) => {
				return {
					drawerOpen: !prevState.drawerOpen,
					isLoaded: false,
					cardHover: '',
				};
			},
			() => {
				//console.log(this.state.drawerOpen);
			}
		);
	};

	handleScreenResize = () => {
		//console.log('ok');
		console.log('width = ' + window.innerWidth);
		if (window.innerWidth <= 2560 && window.innerWidth > 1824) {
			this.setState({ columnSize: 3 });
		}
		if (
			window.innerWidth <= 2560 &&
			window.innerWidth > 1824 &&
			this.state.radius == 5
		) {
			this.setState({ defaultZoom: 12 });
		}
		if (
			window.innerWidth <= 2560 &&
			window.innerWidth > 1824 &&
			this.state.radius == 10
		) {
			this.setState({ defaultZoom: 12 });
		}
		if (
			window.innerWidth <= 2560 &&
			window.innerWidth > 1824 &&
			this.state.radius == 25
		) {
			this.setState({ defaultZoom: 10 });
		}
		if (
			window.innerWidth <= 2560 &&
			window.innerWidth > 1824 &&
			this.state.radius == 50
		) {
			this.setState({ defaultZoom: 9 });
		}
		if (window.innerWidth <= 1279 && this.state.radius == 10) {
			this.setState({ defaultZoom: 10 });
		}

		if (window.innerWidth <= 1279 && this.state.radius == 5) {
			this.setState({ defaultZoom: 11 });
		}
		if (window.innerWidth <= 1279 && this.state.radius == 25) {
			this.setState({ defaultZoom: 9 });
		}
		if (window.innerWidth <= 1279 && this.state.radius == 50) {
			this.setState({ defaultZoom: 8 });
		}

		// } else if (window.innerWidth >= 1224 && window.innerWidth <= 1440) {
		// 	this.setState({ defaultZoom: 10 });
		// }
		this.radiusHandler();
	};

	radiusHandler = () => {
		// if (this.state.radius == 5) {
		// 	this.setState({ defaultZoom: 11 });
		// }
		// if (window.innerWidth <= 1279 && this.state.radius == 10) {
		// 	this.setState({ defaultZoom: 10 });
		// }
	};
	//if being viewed on a mobile device, no offsets will be useds
	handleMapOffsets = () => {
		//console.log('ok');
		if (window.innerWidth <= 1279) {
			this.setState({ offsetX: 0, offsetY: 0 });
		}
	};

	handleLoad = () => {
		this.setState({ isLoaded: true, onLoad: 1 });
	};

	//changes width of progress bar element on every scroll
	handleScroll = () => {
		let scrollTop = this.myRef.current.scrollTop;
		let scrollHeight = this.myRef.current.scrollHeight;
		let clientHeight = this.myRef.current.clientHeight;

		let height = scrollHeight - clientHeight;

		let scrolled = `${(scrollTop / height) * 100}%`;

		console.log('scroll');
		document.getElementById('myBar').style.width = `${scrolled}`;
	};

	updateCount = () => {
		//console.log('called');
		this.setState({ counter: this.state.counter + 1 }, () => {
			console.log('called');
		});
	};

	bounceMarker = (id, zoom) => () => {
		//console.log('hey-> ' + id);
		// if (this.state.id === id) {
		// 	console.log('state id-> ' + this.state.id + '  id-> ' + id);
		// } else
		if (zoom == 8) {
			this.setState({ cardHover: id, drawerOpen: false });
		} else {
			this.setState({ cardHover: id });
		}
	};

	render() {
		//	console.log(this.state);
		console.log('userLocation = ' + this.state.userLocation);
		if (this.state.loading === true) {
			return <Loading />;
		}

		if (this.state.loading === false && this.state.locations.length == 0) {
			return (
				<div>
					<h3 style={{ textAlign: 'center', marginTop: '20%' }}>
						{' '}
						No locations found in '{this.state.city}'
						<Link to="/"> click here </Link> to enter a different
						city
					</h3>
				</div>
			);
		}

		let toggleLocationContainer = 'location-column-container';
		let icon = 'show-list';
		//let count;
		if (this.state.drawerOpen == false) {
			//count = 0;

			// console.log('count false -> ' + count);
			toggleLocationContainer = 'location-column-container closed';
			icon = 'show-list closed';
			//count = 1;
			//	console.log(toggleLocationContainer);
		} else if (this.state.drawerOpen == true) {
			// console.log('count true -> ' + count);

			toggleLocationContainer = 'location-column-container';

			if (this.state.isLoaded == true) {
				icon = 'show-list';
			} else {
				icon = 'show-list closed';
			}
			//console.log(toggleLocationContainer);
		}

		return (
			<div className="city-view">
				<div className="navbar">
					<CityForm2 />
					<div className="scroll-container">
						<div
							className="indicator"
							id="myBar"
							style={{ width: '0%' }}
						></div>
					</div>

					{this.state.drawerOpen ? (
						<div className={icon} onClick={this.handleDrawerToggle}>
							<MapIcon />
						</div>
					) : (
						<div className={icon} onClick={this.handleDrawerToggle}>
							<List />
						</div>
					)}
				</div>

				<div className="locations">
					<Grid className="location-grid" container>
						<Grid
							className="location-map-container"
							item
							lg={12}
							xs={12}
							sm={12}
						>
							<WrappedMap
								googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAKHj80KlN5Y0jRboQGOcx_PYJj2odSTsk&libraries=geometry,drawing,places"
								loadingElement={
									<div style={{ height: `100%` }} />
								}
								containerElement={
									<div style={{ height: `91vh` }} />
								}
								mapElement={<div style={{ height: `100%` }} />}
								lat={parseFloat(this.state.defaultLat)}
								lng={parseFloat(this.state.defaultLng)}
								locations={this.state.locations}
								showingInfoWindow={this.state.showingInfoWindow}
								onMarkerClick={this.onMarkerClick}
								onMapClick={this.onMapClick}
								activeMarker={this.activeMarker}
								cardHover={this.state.cardHover}
								offsetX={this.state.offsetX}
								offsetY={this.state.offsetY}
								defaultZoom={this.state.defaultZoom}
								newLat={this.state.lat}
								newLng={this.state.lng}
								onLoad={this.state.onLoad}
								updateCount={this.updateCount}
								changeMarkerColor={this.state.changeMarkerColor}
								radius={this.state.radius}
							/>
						</Grid>
						<Grid
							className={toggleLocationContainer}
							item
							lg={this.state.columnSize}
							md={12}
							xs={12}
							ref={this.myRef}
							onScroll={this.handleScroll}
						>
							{this.state.moreInfoSelected ? (
								<FacilityView
									handleCloseMoreInfo={
										this.handleCloseMoreInfo
									}
									bounceMarker={this.bounceMarker}
									handleViewOnMap={this.handleViewOnMap}
									facility={this.state.facility}
									address={this.state.address}
									type={this.state.type}
									number={this.state.number}
									eligibility={this.state.eligibility}
									link={this.state.link}
									lat={this.state.lat}
									lng={this.state.lng}
									city={this.state.cityFView}
									hours={this.state.hours}
									id={this.state.id}
									zoom={this.state.defaultZoom}
									miles={this.state.miles}
								/>
							) : (
								<div>
									{this.state.userLocation == 'true' ? (
										<h1 className="header">
											Locations within {this.state.radius}{' '}
											miles away from you
										</h1>
									) : (
										<h1 className="header">
											Locations within {this.state.radius}{' '}
											miles away from {this.state.city},{' '}
											{this.state.state}{' '}
										</h1>
									)}

									<ul>
										{this.state.locations.map(
											(location) => (
												<li
													key={location.id}
													// onMouseOver={() => {
													// 	this.handleMouseOver(
													// 		location.id
													// 	);
													// }}
													// onMouseLeave={() => {
													// 	this.handleMouseLeave();
													// }}
												>
													<SiteCard
														handleMoreInfo={
															this.handleMoreInfo
														}
														bounceMarker={
															this.bounceMarker
														}
														id={location.id}
														locationFacility={
															location.facility
														}
														locationAddress={
															location.address
														}
														locationFacilityType={
															location.facility_type
														}
														phoneNumber={
															location.phone_number
														}
														eligibility={
															location.eligibility
														}
														link={location.link}
														lat={location.lat}
														lng={location.lng}
														city={location.city}
														hours={location.hours}
														zoom={
															this.state
																.defaultZoom
														}
														miles={location.Miles}
													/>
												</li>
											)
										)}
										{/* end of map */}
									</ul>
								</div>
							)}
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

export default UserView;
