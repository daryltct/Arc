import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonArrow from './ButtonArrow';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import background from '../../assets/background.jpg';
import mobileBackground from '../../assets/mobileBackground.jpg';

const useStyles = makeStyles((theme) => ({
	learnButton: {
		...theme.typography.learnButton,
		fontSize: '0.75rem',
		height: 35,
		padding: 5,
		[theme.breakpoints.down('sm')]: {
			marginBottom: '2em'
		}
	},
	background: {
		backgroundImage: `url(${background})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
		height: '60em',
		width: '100%',
		[theme.breakpoints.down('md')]: {
			backgroundImage: `url(${mobileBackground})`,
			backgroundAttachment: 'inherit'
		}
	},
	estimateButton: {
		...theme.typography.estimate,
		borderRadius: 50,
		height: 80,
		width: 205,
		backgroundColor: theme.palette.common.orange,
		fontSize: '1.5rem',
		marginRight: '5em',
		marginLeft: '2em',
		'&:hover': {
			backgroundColor: theme.palette.secondary.light
		},
		[theme.breakpoints.down('sm')]: {
			marginLeft: 0,
			marginRight: 0
		}
	}
}));

function CallToAction({ setValue }) {
	const classes = useStyles();
	const theme = useTheme();
	const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Grid
			container
			direction={isSmall ? 'column' : 'row'}
			alignItems="center"
			justify={isSmall ? 'center' : 'space-between'}
			className={classes.background}
		>
			<Grid item style={{ marginLeft: isSmall ? 0 : '5em', textAlign: isSmall ? 'center' : 'inherit' }}>
				<Grid container direction="column">
					<Grid item>
						<Typography variant="h2">
							Simple Software. <br />Revolutionary Results.
						</Typography>
						<Typography variant="subtitle2" style={{ fontSize: '1.5rem' }}>
							Take advantage of the 21st century.
						</Typography>
						<Grid container item justify={isSmall ? 'center' : undefined}>
							<Button
								variant="outlined"
								className={classes.learnButton}
								component={Link}
								to="/revolution"
								onClick={() => setValue(2)}
							>
								<span style={{ marginRight: 5 }}>Learn More</span>
								<ButtonArrow width={10} height={10} fill={theme.palette.common.blue} />
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<Button
					variant="contained"
					className={classes.estimateButton}
					component={Link}
					to="/estimate"
					onClick={() => setValue(5)}
				>
					Free Estimate
				</Button>
			</Grid>
		</Grid>
	);
}

export default CallToAction;
