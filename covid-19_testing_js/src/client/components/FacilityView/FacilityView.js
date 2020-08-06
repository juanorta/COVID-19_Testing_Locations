import React, { Component } from 'react';
class FacilityView extends Component {
	constructor(props) {
		super(props);
		this.state = { facility: props.match.params.facility };
	}
	render() {
		return <h1>{this.state.facility}</h1>;
	}
}

export default FacilityView;
