import React, { Component } from 'react';
import './App.css';
import Home from './components/Home/Home';
import Button from '@material-ui/core/Button';

class App extends Component {
	state = {
		clicked: false,
	};

	allButtonHandler = () => {
		console.log('All button clicked');
		this.setState((prevState) => {
			return { clicked: !prevState.clicked };
		});
	};

	cityButtonHandler = () => {
		console.log('City button clicked');
	};

	render() {
		console.log(this.state.clicked);
		return (
			<div style={{ textAlign: 'center' }}>
				<h1>COVID-19 Test Locations</h1>
				<div>
					<h3>Select Data</h3>
					<Button
						variant="contained"
						color="primary"
						onClick={this.allButtonHandler}
					>
						All Query
					</Button>
					<Button
						variant="outlined"
						color="primary"
						onClick={this.cityButtonHandler}
					>
						City Query
					</Button>
					<Button variant="outlined" color="secondary">
						State Query
					</Button>
				</div>
			</div>
		);
	}
}

export default App;
