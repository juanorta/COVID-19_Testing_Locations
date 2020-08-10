/*global google*/
import React, { Component } from 'react';
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
} from 'react-google-maps';
import AutoComplete from 'react-google-autocomplete';
import SiteCard from '../Card/Card';
import CityForm2 from '../CityForm/CityForm2';

class CityView extends Component {
	constructor(props, { match }) {
		super(props);

		this.state = {
			locations: [],
			city: props.match.params.city,
			state: props.match.params.state,
			found: false,
		};
	}

	componentDidMount() {
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
	}

	componentWillReceiveProps() {
		console.log('willreceive');

		window.location.reload(true);
	}

	render() {
		console.log('final city state -> ' + this.state.city);
		//console.log(this.state.locations.length);

		const MapWithAMarker = withScriptjs(
			withGoogleMap((props) => (
				<GoogleMap
					defaultZoom={8}
					defaultCenter={{ lat: -34.397, lng: 150.644 }}
				>
					<Marker position={{ lat: -34.397, lng: 150.644 }} />
				</GoogleMap>
			))
		);
		if (this.state.locations.length == 0) {
			return (
				<div>
					<h3 style={{ textAlign: 'center' }}>
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
						<Grid className="location-column-container" item lg={4}>
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
										/>
									</li>
								))}
							</ul>
						</Grid>
						<Grid
							className="location-map-container"
							item
							lg={8}
							xs={0}
							sm={0}
						>
							<MapWithAMarker
								googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB5EDlBAl8nkDsIXYsXNm7e6ty1cmpeKAE&libraries=geometry,drawing,places"
								loadingElement={
									<div style={{ height: `100%` }} />
								}
								containerElement={
									<div style={{ height: `91vh` }} />
								}
								mapElement={<div style={{ height: `100%` }} />}
							/>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

export default CityView;
