import React, { Component } from 'react';
import './App.css';
<<<<<<< Updated upstream
import Home from './components/Home/Home';
import CityForm from './components/CityForm/CityForm';
import CityView from './components/CityView/CityView';
=======
import Home from './Components/Home/Home';
//import CityForm from './Components/CityForm/CityForm';
import CityForm from './Components/CityForm/CityForm';
import CityView from './Components/CityView/CityView';
>>>>>>> Stashed changes
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FacilityView from './Components/FacilityView/FacilityView';
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
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
