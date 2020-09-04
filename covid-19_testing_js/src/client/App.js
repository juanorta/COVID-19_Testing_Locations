import React, { Component } from 'react';
import './App.css';
<<<<<<< HEAD
import Home from './components/Home/Home';
import CityForm from './components/CityForm/CityForm';
import CityView from './components/CityView/CityView';
=======
import Home from './Components/Home/Home';
//import CityForm from './Components/CityForm/CityForm';
import CityForm from './Components/CityForm/CityForm';
import CityView from './Components/CityView/CityView';
>>>>>>> master
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FacilityView from './components/FacilityView/FacilityView';
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
