/*global google*/
import React, { Component, useState } from 'react';
import './CityView.css';
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
import '../Loading/Loading';
import Loading from '../Loading/Loading';

const options = {
	styles: MapStyles,
};

//handles map logic
let animation = 2;
//let safecounter = 0;
let counter = 0;

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

	console.log(props.newLat + ' ' + props.newLng);

	if (counter != 1) {
		animation = 0;
	}

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
				/>
			))}

			<Circle
				defaultCenter={{
					lat: props.lat,
					lng: props.lng,
				}}
				radius={24000}
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

class CityView extends Component {
	constructor(props, { match }) {
		super(props);

		this.state = {
			loading: true,
			columnSize: 4,
			offsetX: 0.01,
			offsetY: 0.23,
			defaultZoom: 11,
			isLoaded: true,
			locations: [],
			city: props.match.params.city,
			state: props.match.params.state,
			defaultLat: '',
			defaultLng: '',
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
			onLoad: 0,
			changeMarkerColor: '/marker.svg',
		};
		//	this.moreInfoSelected = this.moreInfoSelected.bind(this);
		this.myRef = React.createRef();
	}

	componentDidMount() {
		this.handleScreenResize();
		this.handleMapOffsets();
		this.handleLoad();
		let onLoad = 1;
		console.log('onload->' + onLoad);
		//console.log(this.myRef.current.current.clientHeight);
		console.log(this.myRef.current);

		this.geocoder = new google.maps.Geocoder();
		fetch(
			`/api/covid_db/citystate/${this.state.city}&${this.state.state}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		)
			.then((res) => res.json())
			.then((locations) =>
				this.setState({ locations, loading: false }, () =>
					console.log('Locations fetched...', locations)
				)
			);

		this.geocodeAddress(this.state.city + this.state.state);
	}

	//gets coordinates for the city that was received
	geocodeAddress = (address) => {
		console.log('PARSE CALLED = ' + address);
		setTimeout(function () {}, 3000);
		this.geocoder.geocode(
			{ address: address },
			function handleResults(results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					this.setState(
						{
							defaultLat: parseFloat(
								results[0].geometry.location.lat()
							),
							defaultLng: parseFloat(
								results[0].geometry.location.lng()
							),
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

	componentDidCatch() {
		//	console.log('uh');
	}

	componentWillReceiveProps() {
		//console.log('willreceive');

		window.location.reload(true);
	}

	//sends location id of card that was hovered to map function
	//map function then makes marker bounce
	handleMouseOver(locationID) {
		this.setState({ cardHover: locationID });
		//	console.log(this.state);
	}
	handleMouseLeave() {
		this.setState({ cardHover: '' });
	}

	//receives data from 'more info' button
	//sets state of individual location properties to be used in FacilityView
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
		id
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
			},
			() => {
				console.log(this.state);
			}
		);
	};

	//sets the state of the location properties to empty
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

	//switches the state of drawerOpen on icon click
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

	//adjusts the location list container to an appropriate size depending on screen size
	handleScreenResize = () => {
		//console.log('ok');
		console.log('width = ' + window.innerWidth);
		if (window.innerWidth <= 2560 && window.innerWidth > 1824) {
			this.setState({ columnSize: 3 });
		} else if (window.innerWidth <= 1279) {
			this.setState({ defaultZoom: 10 });
		}
		// } else if (window.innerWidth >= 1224 && window.innerWidth <= 1440) {
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

	//used to indicate when map-icon should bounce
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
		if (zoom == 10) {
			this.setState({ cardHover: id, drawerOpen: false });
		} else {
			this.setState({ cardHover: id });
		}
	};

	render() {
		if (this.state.loading == true) {
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

		// <div>
		// 			<h3 style={{ textAlign: 'center', marginTop: '20%' }}>
		// 				{' '}
		// 				No locations found in '{this.state.city}'
		// 				<Link to="/"> click here </Link> to enter a different
		// 				city
		// 			</h3>
		// 		</div>

		// if (this.state.counter == 0) {
		// 	console.log('counter is 0');
		// 	this.updateCount();
		// } else if (this.state.counter == 1) {
		// 	console.log('counter is 1');
		// }

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
								googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJqYsvcCWQGQvK2wvl67_8BS-Kz92KwRw&libraries=geometry,drawing,places"
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
								/>
							) : (
								<div>
									<h1 className="header">
										Locations in {this.state.city},{' '}
										{this.state.state}{' '}
									</h1>

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
													/>
												</li>
											)
										)}
										{/* end of map */}
									</ul>
									<div className="helper"></div>
								</div>
							)}
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

export default CityView;

// animation={
// 	props.cardHover === location.id
// 		? google.maps.Animation.BOUNCE
// 		: null
// }
