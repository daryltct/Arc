import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonArrow from '../../components/ui/ButtonArrow';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CallToAction from '../ui/CallToAction';

import animationData from '../../animations/landinganimation/data';
import customSoftwareIcon from '../../assets/Custom Software Icon.svg';
import mobileAppsIcon from '../../assets/mobileIcon.svg';
import websiteIcon from '../../assets/websiteIcon.svg';
import revolutionBackground from '../../assets/repeatingBackground.svg';
import infoBackground from '../../assets/infoBackground.svg';

const useStyles = makeStyles((theme) => ({
	animation: {
		maxWidth: '50em',
		minWidth: '21em',
		marginTop: '2em',
		marginLeft: '10%',
		[theme.breakpoints.down('sm')]: {
			maxWidth: '30em'
		}
	},
	estimateButton: {
		...theme.typography.estimate,
		backgroundColor: theme.palette.common.orange,
		borderRadius: 50,
		height: 45,
		width: 145,
		marginRight: 40,
		'&:hover': {
			backgroundColor: theme.palette.secondary.light
		}
	},
	buttonContainer: {
		marginTop: '1em'
	},
	learnButtonHero: {
		...theme.typography.learnButton,
		fontSize: '0.9rem',
		height: 45,
		width: 145
	},
	learnButton: {
		...theme.typography.learnButton,
		fontSize: '0.75rem',
		height: 35,
		padding: 5,
		[theme.breakpoints.down('sm')]: {
			marginBottom: '2em'
		}
	},
	mainContainer: {
		marginTop: '5em',
		[theme.breakpoints.down('md')]: {
			marginTop: '3em'
		},
		[theme.breakpoints.down('sm')]: {
			marginTop: '2em'
		}
	},
	heroTextContainer: {
		minWidth: '21.5em',
		marginLeft: '1em',
		[theme.breakpoints.down('sm')]: {
			marginLeft: 0
		}
	},
	specialText: {
		fontFamily: 'Pacifico',
		color: theme.palette.common.orange
	},
	icon: {
		marginLeft: '2em',
		[theme.breakpoints.down('xs')]: {
			marginLeft: 0
		}
	},
	servicesContainer: {
		marginTop: '12em',
		[theme.breakpoints.down('sm')]: {
			padding: 25
		}
	},
	revolutionBackground: {
		backgroundImage: `url(${revolutionBackground})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		height: '100%',
		width: '100%'
	},
	revolutionCard: {
		position: 'absolute',
		boxShadow: theme.shadows[10],
		borderRadius: 15,
		padding: '10em',
		[theme.breakpoints.down('sm')]: {
			padding: '8em 0',
			borderRadius: 0,
			width: '100%'
		}
	},
	infoBackground: {
		backgroundImage: `url(${infoBackground})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		height: '100%',
		width: '100%'
	}
}));

function LandingPage(props) {
	const classes = useStyles();
	const theme = useTheme();
	const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
	const isExtraSmall = useMediaQuery(theme.breakpoints.down('xs'));

	const { setValue, setSelectedIndex } = props;

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	return (
		<Grid container direction="column" className={classes.mainContainer}>
			{/* Hero Block */}
			<Grid item>
				<Grid container justify="flex-end" alignItems="center">
					<Grid item sm className={classes.heroTextContainer}>
						<Typography variant="h2" align="center">
							Bringing West Coast Technology <br /> to the Midwest
						</Typography>
						<Grid container justify="center" className={classes.buttonContainer}>
							<Grid item>
								<Button
									className={classes.estimateButton}
									variant="contained"
									component={Link}
									to="/estimate"
									onClick={() => setValue(5)}
								>
									Free Estimate
								</Button>
							</Grid>
							<Grid item>
								<Button
									variant="outlined"
									className={classes.learnButtonHero}
									component={Link}
									to="/revolution"
									onClick={() => setValue(2)}
								>
									<span style={{ marginRight: 10 }}>Learn More</span>{' '}
									<ButtonArrow width={15} height={15} fill={theme.palette.common.blue} />
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid item sm className={classes.animation}>
						<Lottie options={defaultOptions} height={'100%'} width={'100%'} />
					</Grid>
				</Grid>
			</Grid>
			{/* Services Block - Custom Software Development */}
			<Grid item>
				<Grid container className={classes.servicesContainer} justify={isSmall ? 'center' : undefined}>
					<Grid item style={{ marginLeft: isSmall ? 0 : '5em', textAlign: isSmall ? 'center' : undefined }}>
						<Typography variant="h4">Custom Software Development</Typography>
						<Typography variant="subtitle1">Save Energy. Save Time. Save Money.</Typography>
						<Typography variant="subtitle1">
							Complete digital solutions, from investigation to{' '}
							<span className={classes.specialText}>celebration.</span>
						</Typography>
						<Button
							variant="outlined"
							className={classes.learnButton}
							component={Link}
							to="/customsoftware"
							onClick={() => {
								setValue(1);
								setSelectedIndex(1);
							}}
						>
							<span style={{ marginRight: 10 }}>Learn More</span>
							<ButtonArrow width={10} height={10} fill={theme.palette.common.blue} />
						</Button>
					</Grid>
					<Grid item>
						<img className={classes.icon} alt="custom software icon" src={customSoftwareIcon} />
					</Grid>
				</Grid>
			</Grid>
			{/* Services Block -  Mobile App Development*/}
			<Grid item>
				<Grid container className={classes.servicesContainer} justify={isSmall ? 'center' : 'flex-end'}>
					<Grid item style={{ textAlign: isSmall ? 'center' : undefined }}>
						<Typography variant="h4">Mobile App Development</Typography>
						<Typography variant="subtitle1">
							Extend Functionality. Extend Access. Increase Engagement
						</Typography>
						<Typography variant="subtitle1">
							Integrate your web experience or create a standalone app {isSmall ? null : <br />} with
							either mobile platform.
						</Typography>
						<Button
							variant="outlined"
							className={classes.learnButton}
							component={Link}
							to="/mobileapps"
							onClick={() => {
								setValue(1);
								setSelectedIndex(2);
							}}
						>
							<span style={{ marginRight: 10 }}>Learn More</span>
							<ButtonArrow width={10} height={10} fill={theme.palette.common.blue} />
						</Button>
					</Grid>
					<Grid item style={{ marginRight: isSmall ? 0 : '5em' }}>
						<img className={classes.icon} alt="mobile app icon" src={mobileAppsIcon} />
					</Grid>
				</Grid>
			</Grid>
			{/* Services Block - Website Development */}
			<Grid item>
				<Grid container className={classes.servicesContainer} justify={isSmall ? 'center' : undefined}>
					<Grid item style={{ marginLeft: isSmall ? 0 : '5em', textAlign: isSmall ? 'center' : undefined }}>
						<Typography variant="h4">Website Development</Typography>
						<Typography variant="subtitle1">Reach More. Discover More. Sell More.</Typography>
						<Typography variant="subtitle1">Optimized for Search Engines, built for speed.</Typography>
						<Button
							variant="outlined"
							className={classes.learnButton}
							component={Link}
							to="/websites"
							onClick={() => {
								setValue(1);
								setSelectedIndex(3);
							}}
						>
							<span style={{ marginRight: 10 }}>Learn More</span>
							<ButtonArrow width={10} height={10} fill={theme.palette.common.blue} />
						</Button>
					</Grid>
					<Grid item>
						<img className={classes.icon} alt="website icon" src={websiteIcon} />
					</Grid>
				</Grid>
			</Grid>
			{/* Revolution Block */}
			<Grid item>
				<Grid container style={{ height: '100em', marginTop: '12em' }} alignItems="center" justify="center">
					<Card className={classes.revolutionCard}>
						<CardContent>
							<Grid container direction="column" style={{ textAlign: 'center' }}>
								<Grid item>
									<Typography variant="h3" gutterBottom>
										The Revolution
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant="subtitle1">
										Visionary insights coupled with cutting-edge technology is a recipe for
										revolution
									</Typography>
									<Button
										variant="outlined"
										className={classes.learnButtonHero}
										component={Link}
										to="/revolution"
										onClick={() => setValue(2)}
									>
										<span style={{ marginRight: 10 }}>Learn More</span>{' '}
										<ButtonArrow width={15} height={15} fill={theme.palette.common.blue} />
									</Button>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
					<div className={classes.revolutionBackground} />
				</Grid>
			</Grid>
			{/* Information Block */}
			<Grid item>
				<Grid container style={{ height: '80em' }} alignItems="center" className={classes.infoBackground}>
					<Grid
						item
						container
						style={{ textAlign: isExtraSmall ? 'center' : 'inherit' }}
						direction={isExtraSmall ? 'column' : 'row'}
					>
						<Grid item sm style={{ marginLeft: isExtraSmall ? 0 : isSmall ? '2em' : '5em' }}>
							<Grid container direction="column" style={{ marginBottom: isExtraSmall ? '10em' : 0 }}>
								<Typography variant="h2" style={{ color: 'white' }}>
									About Us
								</Typography>
								<Typography variant="subtitle2">Let's get personal.</Typography>
								<Grid item>
									<Button
										variant="outlined"
										className={classes.learnButton}
										style={{ color: 'white', borderColor: 'white' }}
										component={Link}
										to="/about"
										onClick={() => setValue(3)}
									>
										<span style={{ marginRight: 10 }}>Learn More</span>
										<ButtonArrow width={10} height={10} fill="white" />
									</Button>
								</Grid>
							</Grid>
						</Grid>
						<Grid
							item
							sm
							style={{
								marginRight: isExtraSmall ? 0 : isSmall ? '2em' : '5em',
								textAlign: isExtraSmall ? 'center' : 'right'
							}}
						>
							<Grid container direction="column">
								<Typography variant="h2" style={{ color: 'white' }}>
									Contact Us
								</Typography>
								<Typography variant="subtitle2">
									Say hello!{' '}
									<span role="img" aria-label="waving hand">
										👋🏻
									</span>
								</Typography>
								<Grid item>
									<Button
										variant="outlined"
										className={classes.learnButton}
										style={{ color: 'white', borderColor: 'white' }}
										component={Link}
										to="/contact"
										onClick={() => setValue(4)}
									>
										<span style={{ marginRight: 10 }}>Learn More</span>
										<ButtonArrow width={10} height={10} fill="white" />
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			{/* Call to Action Block */}
			<Grid item>
				<CallToAction setValue={setValue} />
			</Grid>
		</Grid>
	);
}

export default LandingPage;
