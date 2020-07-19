import { createMuiTheme } from '@material-ui/core/styles';

const arcBlue = '#0B72B9';
const arcOrange = '#FFBA60';
const arcGrey = '#868686';

export default createMuiTheme({
	palette: {
		common: {
			blue: `${arcBlue}`,
			orange: `${arcOrange}`
		},
		primary: {
			main: `${arcBlue}`
		},
		secondary: {
			main: `${arcOrange}`
		}
	},
	typography: {
		tab: {
			fontFamily: 'Raleway',
			fontWeight: 700,
			color: 'white'
		},
		estimate: {
			fontFamily: 'Pacifico',
			fontSize: '1rem',
			textTransform: 'none',
			color: 'white'
		},
		h2: {
			fontFamily: 'Raleway',
			fontWeight: 700,
			fontSize: '2.3rem',
			color: arcBlue
		},
		h4: {
			fontFamily: 'Raleway',
			fontSize: '1.75rem',
			color: arcBlue,
			fontWeight: 700
		},
		subtitle1: {
			fontSize: '1.25rem',
			color: arcGrey,
			fontWeight: 300
		},
		learnButton: {
			borderColor: arcBlue,
			color: arcBlue,
			borderWidth: 2,
			textTransform: 'none',
			borderRadius: 50,
			fontFamily: 'Roboto'
		}
	}
});
