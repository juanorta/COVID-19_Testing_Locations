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
import CityForm from '../CityForm/CityForm';

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
				<h1>Locations in {this.state.city}</h1>

				<ul>
					{this.state.locations.map((location) => (
						<li key={location.id}>
							{location.id} {'->'} {location.state} |{' '}
							{location.facility} | {location.address} |{' '}
							{location.city} |{location.facility_type} |{' '}
							{location.phone_number} |{location.eligibility} |{' '}
							{location.link}
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default CityView;
