import React, { Component } from 'react';
import './App.css';
import Home from './Components/Home/Home';
//import CityForm from './Components/CityForm/CityForm';
import CityForm from './Components/CityForm/CityForm';
import CityView from './Components/CityView/CityView';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FacilityView from './Components/FacilityView/FacilityView';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
	state = {};

	render() {
		//console.log('API KEY -> ' + process.env.REACT_APP_GOOGLE_API_KEY);
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
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
