import React, { Component } from 'react';
import CityForm2 from '../CityForm/CityForm2';
import { Grid } from '@material-ui/core';
import './FacilityView.css';

class FacilityView extends Component {
	constructor(props) {
		super(props);
		//this.state = { locations: [], address: props.match.params.address };
	}

	componentDidMount() {
		// console.log('didmount');
		// fetch(`/api/covid_db/address/${this.state.address}`, {
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Accept: 'application/json',
		// 	},
		// })
		// 	.then((res) => res.json())
		// 	.then((locations) =>
		// 		this.setState({ locations }, () =>
		// 			console.log('Locations fetched...', locations)
		// 		)
		// 	);
	}
	render() {
		//console.log(this.state.locations[0]);

		return (
			<div className="facility-view">
				<button onClick={this.props.handleCloseMoreInfo}>back</button>
				<h1>{this.props.facility}</h1>
				<h2>Address: {this.props.address}</h2>
				<h2>Type: {this.props.type}</h2>
				<h2>Number: {this.props.number}</h2>
				<h2>Eligibility: {this.props.eligibility}</h2>
				<h2>Link: {this.props.link}</h2>
			</div>
		);
	}
}

export default FacilityView;
