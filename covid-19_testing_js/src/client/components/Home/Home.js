import React, { Component } from 'react';
import './Home.css';
import CityForm from '../CityForm/CityForm';
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<h1>COVID-19 TEST LOCATIONS</h1>
				<CityForm />
			</div>
		);
	}
}

export default Home;
