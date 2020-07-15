import { createMuiTheme } from '@material-ui/core/styles';

const arcBlue = '#0B72B9';
const arcOrange = '#FFBA60';

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
			fontWeight: 700
		},
		estimate: {
			fontFamily: 'Pacifico',
			fontSize: '1rem',
			textTransform: 'none',
			color: 'white'
		}
	}
});
