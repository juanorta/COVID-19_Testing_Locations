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

const options = {
	styles: MapStyles,
};

function Map(props) {
	const [selectedMarker, setSelectedMarker] = useState(null);
	return (
		<GoogleMap
			key={new Date().getTime()}
			defaultZoom={11}
			defaultCenter={{
				lat: parseFloat(props.lat),
				lng: parseFloat(props.lng),
			}}
			defaultOptions={{ styles: MapStyles }}
		>
			{props.locations.map((location) => (
				<Marker
					key={location.id}
					position={{
						lat: parseFloat(location.lat),
						lng: parseFloat(location.lng),
					}}
					onClick={() => {
						console.log('clicked');
						setSelectedMarker(location);
						console.log(location);
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
			locations: [],
			city: props.match.params.city,
			state: props.match.params.state,
			found: false,
			defaultLat: '',
			defaultLng: '',
			markers: [
				{
					lat: '',
					lng: '',
				},
			],
			activeMarker: null,
			selectedPlace: {},
			showingInfoWindow: false,
			isOpen: false,
		};
		this.onMarkerClick = this.onMarkerClick.bind(this);
		this.setMarker = this.setMarker.bind(this);
	}

	componentDidMount() {
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
		console.log('update');
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
		console.log('willreceive');

		window.location.reload(true);
	}

	onMarkerClick = (markerID) => {
		// console.log('clicked');
		// console.log(markerID);
		// this.activeMarker = markerID;
		this.setState({ activeMarker: markerID });
		//this.setMarker(activeMarker);
	};

	setMarker = (markerID) => {
		this.setState({ activeMarker: markerID });
	};

	onMapClick = () => {
		this.setState({ activeMarker: null, isOpen: false });
	};

	render() {
		//setTimeout(this.MapWithAMarker, 1000);

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

		return (
			<div className="city-view">
				<CityForm2 />

				<div className="locations">
					<Grid className="location-grid" container>
						<Grid
							className="location-column-container"
							item
							lg={3}
							xs={0}
						>
							<h1>
								Locations in {this.state.city},{' '}
								{this.state.state}{' '}
							</h1>

							<ul>
								{this.state.locations.map((location) => (
									<li key={location.id}>
										<SiteCard
											locationFacility={location.facility}
											locationAddress={location.address}
											locationFacilityType={
												location.facility_type
											}
											phoneNumber={location.phoneNumber}
											eligibility={location.eligibility}
											link={location.link}
											lat={location.lat}
											lng={location.lng}
										/>
									</li>
								))}
							</ul>
						</Grid>
						<Grid
							className="location-map-container"
							item
							lg={9}
							xs={0}
							sm={0}
						>
							<WrappedMap
								googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB5EDlBAl8nkDsIXYsXNm7e6ty1cmpeKAE&libraries=geometry,drawing,places"
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
							/>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

export default CityView;
