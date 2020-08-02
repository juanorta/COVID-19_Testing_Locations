import React, { Component } from 'react';
import './customers.css';

class Home extends Component {
	constructor() {
		super();
		this.state = {
			locations: [],
			query: '/api/covid_db/id/1',
		};
	}

	componentDidMount() {
		fetch(this.state.query, {
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

		//console.log("-> "+this.state.locations);
	}

	render() {
		return (
			<div>
				<h1>COVID-19 Test Locations</h1>
				<ul>
					{this.state.locations.map((location) => (
						<li key={location.id}>
							{location.state} | {location.facility} |{' '}
							{location.address} | {location.city} |
							{location.facility_type} | {location.phone_number} |
							{location.eligibility} | {location.link}
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default Home;
