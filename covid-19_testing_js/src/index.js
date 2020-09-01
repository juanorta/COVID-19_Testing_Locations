import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './client/App';
import * as serviceWorker from './serviceWorker';
/*
import '/Users/mac/Desktop/covid_testing/COVID-19_Testing_Locations/covid-19_testing_js/src/Fonts/AirbnbCerealBlack.ttf';
import '/Users/mac/Desktop/covid_testing/COVID-19_Testing_Locations/covid-19_testing_js/src/Fonts/AirbnbCerealBold.ttf';
import '/Users/mac/Desktop/covid_testing/COVID-19_Testing_Locations/covid-19_testing_js/src/Fonts/AirbnbCerealBook.ttf';
import '/Users/mac/Desktop/covid_testing/COVID-19_Testing_Locations/covid-19_testing_js/src/Fonts/AirbnbCerealExtraBold.ttf';
import '/Users/mac/Desktop/covid_testing/COVID-19_Testing_Locations/covid-19_testing_js/src/Fonts/AirbnbCerealLight.ttf';
import '/Users/mac/Desktop/covid_testing/COVID-19_Testing_Locations/covid-19_testing_js/src/Fonts/AirbnbCerealMedium.ttf';
*/
ReactDOM.render(
	<React.Fragment>
		<App />
	</React.Fragment>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
