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

const options = {
	styles: MapStyles,
};

function Map(props) {
	let lat;
	let lng;
	//console.log(props.defaultZoom);

	const [selectedMarker, setSelectedMarker] = useState(null);
	const [currentZoom, setCurrentZoom] = useState(props.defaultZoom);
	const [load, setLoad] = useState(1);
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
		lat = selectedLat;
		lng = selectedLng;
		setLoad(0);
	}

	function handleCenterChange2() {
		//console.log(this.getCenter().toJSON());
		lat = this.getCenter().toJSON().lat;
		lng = this.getCenter().toJSON().lng;
		setLoad(0);
	}
	//sets the zoom level to the current zoom
	//this prevents the map from loading to the default city zoom on every marker click
	function handleZoomChange() {
		//console.log('zoom changed ' + this.getZoom());
		setCurrentZoom(this.getZoom());
		//console.log('currentzoom ' + currentZoom);
	}
	console.log(props.newLat + ' ' + props.newLng);
	// if (props.defaultZoom != currentZoom) {
	// 	console.log('different default');
	// 	//handleCenterChange(1, 2);
	// 	lat = props.newLat;
	// 	lng = props.newLng;
	// 	//setSelectedMarker(props.cardHover);
	// 	setCurrentZoom(props.defaultZoom);
	// }

	console.log('current center: ' + lat + ' ' + lng);
	return (
		<GoogleMap
			key={new Date().getTime()}
			defaultZoom={currentZoom}
			center={{
				lat: lat,
				lng: lng,
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
			//onGoogleApiLoaded={console.log('loaded')}
		>
			{props.locations.map((location) => (
				<Marker
					key={location.id}
					position={{
						lat: parseFloat(location.lat),
						lng: parseFloat(location.lng),
					}}
					animation={
						props.cardHover === location.id
							? google.maps.Animation.BOUNCE
							: null
					}
					onClick={() => {
						setSelectedMarker(location);
						handleCenterChange(location.lat, location.lng);
					}}
					icon={{
						url: '/marker.svg',
						scaledSize: new window.google.maps.Size(45, 45),
					}}
				/>
			))}
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
			facility: '',
			address: '',
			type: '',
			number: '',
			eligibility: '',
			link: '',
			lat: '',
			lng: '',
		};
		//	this.moreInfoSelected = this.moreInfoSelected.bind(this);
		this.myRef = React.createRef();
	}

	componentDidMount() {
		this.handleScreenResize();
		this.handleMapOffsets();
		this.handleLoad();
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
				this.setState({ locations }, () =>
					console.log('Locations fetched...', locations)
				)
			);

		this.geocodeAddress(this.state.city + this.state.state);
	}

	componentDidUpdate() {
		//this.handleScreenResize();
		// console.log('update');
		// this.handleLoad();
	}

	geocodeAddress = (address) => {
		console.log('PARSE CALLED = ' + address);
		setTimeout(function () {}, 3000);
		this.geocoder.geocode(
			{ address: address },
			function handleResults(results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					this.setState(
						{
							defaultLat: results[0].geometry.location.lat(),
							defaultLng: results[0].geometry.location.lng(),
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

	componentWillReceiveProps() {
		//console.log('willreceive');

		window.location.reload(true);
	}

	handleMouseOver(locationID) {
		this.setState({ cardHover: locationID });
		//	console.log(this.state);
	}
	handleMouseLeave() {
		//	this.setState({ cardHover: '' });
	}

	handleMoreInfo = (
		facility,
		address,
		type,
		phoneNumber,
		eligibility,
		link,
		lat,
		lng
	) => () => {
		//console.log('facility: ' +facility, address, type, phoneNumber, eligibility, link);
		// console.log('facility: ' + facility);
		// console.log('address: ' + address);
		// console.log('type: ' + type);
		// console.log('number: ' + phoneNumber);
		// console.log('eligibility: ' + eligibility);
		// console.log('link: ' + link);

		this.setState(
			{
				moreInfoSelected: true,
				facility: facility,
				address: address,
				type: type,
				number: phoneNumber,
				eligibility: eligibility,
				link: link,
				lat: lat,
				lng: lng,
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
			},
			() => {
				console.log(this.state);
			}
		);
	};
	handleViewOnMap = (lat, lng) => () => {
		//console.log('handle view on map-> ' + lat + lng);
		this.setState({ defaultZoom: 15 }, () => {
			console.log(this.state);
		});
	};
	handleDrawerToggle = () => {
		this.setState(
			(prevState) => {
				return { drawerOpen: !prevState.drawerOpen, isLoaded: false };
			},
			() => {
				//console.log(this.state.drawerOpen);
			}
		);
	};

	handleScreenResize = () => {
		//console.log('ok');
		if (window.innerWidth <= 2560 && window.innerWidth > 1824) {
			this.setState({ columnSize: 3 });
		} else if (window.innerWidth <= 768) {
			this.setState({ defaultZoom: 10 });
		} else if (window.innerWidth >= 1224 && window.innerWidth <= 1440) {
			this.setState({ defaultZoom: 10 });
		}
	};

	handleMapOffsets = () => {
		//console.log('ok');
		if (window.innerWidth <= 768) {
			this.setState({ offsetX: 0, offsetY: 0 });
		}
	};

	handleLoad = () => {
		this.setState({ isLoaded: true });
	};

	handleScroll = () => {
		let scrollTop = this.myRef.current.scrollTop;
		let scrollHeight = this.myRef.current.scrollHeight;
		let clientHeight = this.myRef.current.clientHeight;

		let height = scrollHeight - clientHeight;

		let scrolled = `${(scrollTop / height) * 100}%`;

		console.log('scroll');
		document.getElementById('myBar').style.width = `${scrolled}`;
	};

	render() {
		if (this.state.locations.length == 0) {
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
						<FaMapMarkedAlt
							className={icon}
							onClick={this.handleDrawerToggle}
						/>
					) : (
						<FaList
							className={icon}
							onClick={this.handleDrawerToggle}
						/>
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
								lat={this.state.defaultLat}
								lng={this.state.defaultLng}
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
									handleViewOnMap={this.handleViewOnMap}
									facility={this.state.facility}
									address={this.state.address}
									type={this.state.type}
									number={this.state.number}
									eligibility={this.state.eligibility}
									link={this.state.link}
									lat={this.state.lat}
									lng={this.state.lng}
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
													onMouseOver={() => {
														this.handleMouseOver(
															location.id
														);
													}}
													onMouseLeave={() => {
														this.handleMouseLeave();
													}}
												>
													<SiteCard
														handleMoreInfo={
															this.handleMoreInfo
														}
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

export default CityView;
