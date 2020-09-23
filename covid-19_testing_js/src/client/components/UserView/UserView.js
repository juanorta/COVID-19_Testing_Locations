/*global google*/
import React, { Component } from 'react';
import './UserView.css';

class UserView extends Component {
	constructor(props, { match }) {
		super(props);

		this.state = {
			lat: props.match.params.lat,
			lng: props.match.params.lng,
			state: props.match.params.state,
			radius: props.match.params.radius,
			locations: [],
		};
		//	this.moreInfoSelected = this.moreInfoSelected.bind(this);
		this.myRef = React.createRef();
	}

	componentDidMount() {
		console.log('state = ' + this.state.state);
		console.log('lat = ' + this.state.lat);
		console.log('lng = ' + this.state.lng);
		console.log('radius = ' + this.state.radius);

		this.geocoder = new google.maps.Geocoder();
		fetch(
			`/api/covid_db/userlocation/${this.state.lat}&${this.state.lng}&${this.state.radius}&${this.state.state}`,
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
	// 32.7554883
	// -97.3307658

	// 32.7766642
	// -96.79698789999999
	getLocations = () => {
		if (this.state.radius == 0) {
			console.log('state should increase');
			this.setState({ radius: 5 });
		}
		//console.log(this.state);
		//console.log(this.state.stateLocations[1].facility);

		// for (let i = 0; i < this.state.stateLocations.length; i++) {
		// 	console.log('lat ' + i + ' = ' + this.state.stateLocations[i].lat);
		// 	console.log('lng ' + i + ' = ' + this.state.stateLocations[i].lng);
		// 	console.log('=====================================');

		// }
		let counter = 0;
		this.state.stateLocations.forEach((element) => {
			element.Miles = 2;
		});
		let locationsCopy = { ...this.state.stateLocations };
		let newArray = [];
		let milesArray = [];
		for (let i = 0; i < this.state.stateLocations.length; i++) {
			let myLatLngA = new google.maps.LatLng({
				lat: parseFloat(this.state.lat),
				lng: parseFloat(this.state.lng),
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

			// this.setState({
			// 	...this.state.stateLocations,
			// 	miles: 'hey',
			// });

			//locationsCopy[i].Miles = resultInMiles;
			//console.log(locationsCopy[i]);

			//console.log(this.state.stateLocations[i]);

			// console.log(resultInMiles + ' miles');
			// console.log(this.state);

			if (resultInMiles <= this.state.radius) {
				counter++;
				//	console.log('---> ' + counter);
				milesArray[counter] = resultInMiles;
				//console.log(this.state.stateLocations[i]);
				// this.setState({
				// 	locations: [...this.state.locations, locationsCopy[i]],
				// });

				milesArray.sort((a, b) => {
					return a - b;
				});

				newArray[counter] = this.state.stateLocations[i];

				//	console.log('counter  = ' + counter);
				//console.log(milesArray);
				//this.state.stateLocations[i].Miles = milesArray[counter];
				//console.log(this.state.stateLocations[i]);
				// newArray[counter] = this.state.stateLocations[i];
				// newArray[counter].Miles = milesArray[counter];
				// console.log(newArray);
				//console.log(milesArray);
				//console.log(locationsCopy[i].Miles);
			}
		}

		//console.log(milesArray[1]);
		newArray.forEach((element, index) => {
			element.Miles = milesArray[index];
			this.setState({
				locations: [...this.state.locations, element],
			});
			console.log(this.state.locations);
		});

		//console.log(this.state);
	};

	render() {
		console.log(this.state);
		return (
			<div>
				<h1>User View</h1>
				<ul>
					<h2>{this.state.locations.length} locations found</h2>
					{this.state.locations.map((location) => {
						return (
							<div>
								<li key={location.id}>
									<h3>
										{location.facility} {location.Miles}{' '}
										miles away{' '}
									</h3>
								</li>
							</div>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default UserView;
