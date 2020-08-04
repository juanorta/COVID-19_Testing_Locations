import React, { Component } from 'react';
import './CityForm.css';
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
class CityForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			submitted: false,
			city: 'default',
			found: true,
		};
	}

	handleCityChange = (event) => {
		this.setState({ city: event.target.value }, () => {
			console.log(this.state.city);
		});

		/*
		if (this.state.submitted) {
			this.setState({ submitted: false });
        }
        */
	};

	handleSubmit = (event) => {
		//console.log(this.state.city);
		//alert(`${this.state.city}`);
		//this.setState({ city: event.target.value });
		console.log('ok');
		this.setState({ submitted: true });
		event.preventDefault();
		//this.forceUpdate();
		//return <Redirect to="/city" />;
	};

	render() {
		//console.log(this.props.notFound);
		return (
			<div className="form">
				<h2>Enter City</h2>
				<form onSubmit={this.handleSubmit}>
					<input type="text" onChange={this.handleCityChange}></input>
					<Link to={`/city/${this.state.city}`}>
						<button type="submit">Submit</button>
					</Link>
				</form>
			</div>
		);
	}
}

export default CityForm;
