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
			<div className="home">
				<h1 className="line anim-typewriter">
					COVID-19 Testing Location Finder
				</h1>

				<CityForm />
			</div>
		);
	}
}

export default Home;
