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
	Card,
	CardHeader,
	CardTitle,
	CardImg,
	CardBody,
	CardFooter,
	Button,
} from 'shards-react';
import SiteCard from '../Card/Card';
import CityForm2 from '../CityForm/CityForm2';

class CityView extends Component {
	constructor(props, { match }) {
		super(props);

		this.state = {
			locations: [],
			city: props.match.params.city,
			found: false,
		};
	}

	componentDidMount() {
		this.forceUpdate();
		console.log('didmount');
		fetch(`/api/covid_db/city/${this.state.city}`, {
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

	componentWillReceiveProps() {
		console.log('willreceive');
		/*
		this.setState({ city: this.props.match.params.city }, () => {
			console.log(this.state);
		});
		*/
		window.location.reload(true);
	}

	render() {
		console.log('final city state -> ' + this.state.city);
		//console.log(this.state.locations.length);

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
						<Grid className="location-column-container" item lg={3}>
							<h1>Locations in {this.state.city} </h1>

							<ul>
								{this.state.locations.map((location) => (
									<li key={location.id}>
										<SiteCard
											locationFacility={location.facility}
											locationAddress={location.address}
											locationFacilityType={
												location.facility_type
											}
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
							MAP
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

export default CityView;
