import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import theme from './ui/Theme';
import Header from './ui/Header';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Header />
				<Switch>
					<Route exact path="/" component={() => <div>Home</div>} />
					<Route exact path="/services" component={() => <div>Services</div>} />
					<Route exact path="/customsoftware" component={() => <div>Custom</div>} />
					<Route exact path="/mobileapps" component={() => <div>Moible</div>} />
					<Route exact path="/websites" component={() => <div>Websites</div>} />
					<Route exact path="/revolution" component={() => <div>Revolution</div>} />
					<Route exact path="/about" component={() => <div>About us</div>} />
					<Route exact path="/contact" component={() => <div>Contact us</div>} />
					<Route exact path="/estimate" component={() => <div>Estimate</div>} />
				</Switch>
			</Router>
		</ThemeProvider>
	);
}

export default App;
