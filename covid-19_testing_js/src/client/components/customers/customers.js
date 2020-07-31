import React, { Component } from 'react';
import './customers.css';

class Customers extends Component {
	constructor() {
		super();
		this.state = {
			customers: [],
		};
	}

	componentDidMount() {
		fetch('/api/customers', {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then((res) => res.json())
			.then((customers) =>
				this.setState({ customers }, () =>
					console.log('Customers fetched...', customers)
				)
			);
	}

	render() {
		return (
			<div>
				<h1>COVID-19 Test Locations</h1>
				<ul>
					{this.state.customers.map((customer) => (
						<li key={customer.id}>
							{customer.firstName} {customer.lastName}
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default Customers;
