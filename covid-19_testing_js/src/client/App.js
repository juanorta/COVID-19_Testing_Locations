import React, { Component } from 'react';
import './App.css';
import Customers from './components/customers/customers';

class App extends Component {
	state = {};

	render() {
		return (
			<div style={{ textAlign: 'center' }}>
				<Customers />
			</div>
		);
	}
}

export default App;
