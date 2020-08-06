import React, { Component } from 'react';
import './CityForm2.css';
import CityView from '../CityView/CityView';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	withRouter,
	button,
	Link,
} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { FaSearch } from 'react-icons/fa';

class CityForm2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			submitted: false,
			city: 'default',
			found: true,
		};
	}

	//sets city everytime there's a change in the textbox
	handleCityChange = (event) => {
		this.setState({ city: event.target.value }, () => {
			console.log(this.state.city);
		});
	};

	handleSubmit = (event) => {
		this.setState({ submitted: true });
		event.preventDefault();
	};

	render() {
		return (
			<div className="form">
				<form onSubmit={this.handleSubmit} className="search-box2">
					<input
						type="text"
						onChange={this.handleCityChange}
						className="textbox2"
						placeholder="Enter City"
					/>

					<Link to={`/city/${this.state.city}`}>
						<a className="search-btn2">
							<FaSearch /> <button />
						</a>
					</Link>
				</form>
			</div>
		);
	}
}

export default CityForm2;
