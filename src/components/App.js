import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import theme from './ui/Theme';
import Header from './ui/Header';
import Footer from './ui/Footer';

function App() {
	const [ value, setValue ] = useState(0); //used to manage which tab is open
	const [ selectedIndex, setSelectedIndex ] = useState(0); //which menu item is selected

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Header
					value={value}
					setValue={setValue}
					selectedIndex={selectedIndex}
					setSelectedIndex={setSelectedIndex}
				/>
				<Switch>
					<Route exact path="/" component={() => <div style={{ height: '2000px' }}>Home</div>} />
					<Route exact path="/services" component={() => <div>Services</div>} />
					<Route exact path="/customsoftware" component={() => <div>Custom</div>} />
					<Route exact path="/mobileapps" component={() => <div>Moible</div>} />
					<Route exact path="/websites" component={() => <div>Websites</div>} />
					<Route exact path="/revolution" component={() => <div>Revolution</div>} />
					<Route exact path="/about" component={() => <div>About us</div>} />
					<Route exact path="/contact" component={() => <div>Contact us</div>} />
					<Route exact path="/estimate" component={() => <div>Estimate</div>} />
				</Switch>
				<Footer
					value={value}
					setValue={setValue}
					selectedIndex={selectedIndex}
					setSelectedIndex={setSelectedIndex}
				/>
			</Router>
		</ThemeProvider>
	);
}

export default App;
