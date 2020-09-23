import React, { Component } from 'react';
import './App.css';
import Home from './components/Home/Home';
import CityForm from './components/CityForm/CityForm';
import CityView from './components/CityView/CityView';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FacilityView from './components/FacilityView/FacilityView';
import UserView from './components/UserView/UserView';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
	state = {};

	render() {
		return (
			<div>
				<Router>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route
							exact
							path="/facility"
							component={FacilityView}
						/>
						<Route
							path="/citystate/:city&:state"
							component={CityView}
						/>
						<Route
							path="/address/:address"
							component={FacilityView}
						/>
						<Route
							path="/userlocation/:lat&:lng&:radius&:state"
							component={UserView}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
