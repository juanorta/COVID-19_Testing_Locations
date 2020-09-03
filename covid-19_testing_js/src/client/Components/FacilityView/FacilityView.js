import React, { Component } from 'react';
import CityForm2 from '../CityForm/CityForm2';
import { Grid } from '@material-ui/core';
import './FacilityView.css';

class FacilityView extends Component {
	constructor(props) {
		super(props);
		this.state = { locations: [], address: props.match.params.address };
	}

	componentDidMount() {
		console.log('didmount');
		fetch(`/api/covid_db/address/${this.state.address}`, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then((res) => res.json())
			.then((locations) =>
				this.setState({ locations }, () =>
					console.log('Locations fetched...', locations)
				)
			);
	}
	render() {
		console.log(this.state.locations[0]);

		return (
			<div className="facility-view">
				<CityForm2 />
				<Grid className="title-grid" container>
					<Grid className="facility-title" item lg={6}>
						{this.state.locations.map((location) => {
							return <h1>{location.facility}</h1>;
						})}
					</Grid>
				</Grid>

				<Grid className="map-grid" container>
					<Grid className="facility-map" item lg={6}>
						{this.state.locations.map((location) => {
							return <h1>{location.address}</h1>;
						})}
					</Grid>
				</Grid>

				<Grid className="info-grid" container>
					<Grid className="info" item lg={6}>
						<h1>INFo</h1>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default FacilityView;
