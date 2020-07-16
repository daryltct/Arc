import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import logo from '../../assets/logo.svg';

function ElevationScroll(props) {
	const { children } = props;
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0
	});
}

const useStyles = makeStyles((theme) => ({
	toolbarMargin: {
		...theme.mixins.toolbar,
		marginBottom: '2em',
		[theme.breakpoints.down('md')]: {
			marginBottom: '1em'
		},
		[theme.breakpoints.down('xs')]: {
			marginBottom: '0.25em'
		}
	},
	logo: {
		height: '7em',
		[theme.breakpoints.down('md')]: {
			height: '6em'
		},
		[theme.breakpoints.down('xs')]: {
			height: '4.5em'
		}
	},
	tabContainer: {
		marginLeft: 'auto'
	},
	tab: {
		...theme.typography.tab,
		minWidth: 10,
		marginLeft: '25px'
	},
	button: {
		...theme.typography.estimate,
		borderRadius: '50px',
		marginLeft: '50px',
		marginRight: '25px',
		fontFamily: 'Pacifico',
		height: '45px'
	},
	logoContainer: {
		padding: 0,
		'&:hover': {
			backgroundColor: 'transparent'
		}
	},
	menu: {
		backgroundColor: theme.palette.common.blue,
		color: 'white',
		textTransform: 'uppercase',
		borderRadius: 0
	},
	menuItem: {
		...theme.typography.tab,
		opacity: 0.7,
		'&:hover': {
			opacity: 1
		}
	},
	drawerIcon: {
		height: '35px',
		width: '35px'
	},
	drawerIconContainer: {
		marginLeft: 'auto',
		'&:hover': {
			backgroundColor: 'transparent'
		}
	},
	drawer: {
		backgroundColor: theme.palette.common.blue
	},
	drawerItem: {
		...theme.typography.tab,
		opacity: 0.7
	},
	drawerItemSelected: {
		opacity: 1
	},
	drawerItemEstimate: {
		backgroundColor: theme.palette.common.orange
	}
}));

function Header() {
	const classes = useStyles();
	const theme = useTheme();
	const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent); //for SwipeableDrawer
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	const [ value, setValue ] = useState(0); //used to manage which tab is open
	const [ anchorEl, setAnchorEl ] = useState(null); //used to manage menu dropdown (services tab)
	const [ openMenu, setOpenMenu ] = useState(false); //whether menu is open or not
	const [ selectedIndex, setSelectedIndex ] = useState(0); //which menu item is selected
	const [ openDrawer, setOpenDrawer ] = useState(false);

	const handleChange = (e, newValue) => {
		setValue(newValue);
	};

	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
		setOpenMenu(true);
	};

	const handleClose = (e) => {
		setAnchorEl(null);
		setOpenMenu(false);
	};

	const handleMenuItemClick = (event, index) => {
		setAnchorEl(null);
		setOpenMenu(false);
		setSelectedIndex(index);
	};

	const menuOptions = [
		{ name: 'Services', link: '/services' },
		{ name: 'Customer Software Development', link: '/customsoftware' },
		{ name: 'Mobile App Development', link: '/mobileapps' },
		{ name: 'Website Development', link: '/websites' }
	];

	useEffect(
		() => {
			switch (window.location.pathname) {
				case '/':
					if (value !== 0) {
						setValue(0);
					}
					break;
				case '/services':
					if (value !== 1) {
						setValue(1);
						setSelectedIndex(0);
					}
					break;
				case '/customsoftware':
					if (value !== 1) {
						setValue(1);
						setSelectedIndex(1);
					}
					break;
				case '/mobileapps':
					if (value !== 1) {
						setValue(1);
						setSelectedIndex(2);
					}
					break;
				case '/websites':
					if (value !== 1) {
						setValue(1);
						setSelectedIndex(3);
					}
					break;
				case '/revolution':
					if (value !== 2) {
						setValue(2);
					}
					break;
				case '/about':
					if (value !== 3) {
						setValue(3);
					}
					break;
				case '/contact':
					if (value !== 4) {
						setValue(4);
					}
					break;
				case '/estimate':
					if (value !== 5) {
						setValue(5);
					}
					break;
				default:
					break;
			}
		},
		[ value ]
	);

	const tabs = (
		<React.Fragment>
			<Tabs value={value} onChange={handleChange} className={classes.tabContainer} indicatorColor="primary">
				<Tab className={classes.tab} component={Link} to="/" label="Home" />
				<Tab
					aria-owns={anchorEl ? 'simple-menu' : undefined}
					aria-haspopup={anchorEl ? 'true' : undefined}
					onMouseOver={(event) => handleClick(event)}
					className={classes.tab}
					component={Link}
					to="/services"
					label="Services"
				/>
				<Tab className={classes.tab} component={Link} to="/revolution" label="The Revolution" />
				<Tab className={classes.tab} component={Link} to="/about" label="About Us" />
				<Tab className={classes.tab} component={Link} to="/contact" label="Contact Us" />
			</Tabs>
			<Button variant="contained" color="secondary" className={classes.button}>
				Free Estimate
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				open={openMenu}
				onClose={handleClose}
				classes={{ paper: classes.menu }}
				MenuListProps={{ onMouseLeave: handleClose }}
				elevation={0}
			>
				{menuOptions.map((option, index) => (
					<MenuItem
						key={option}
						component={Link}
						to={option.link}
						classes={{ root: classes.menuItem }}
						onClick={(event) => {
							handleMenuItemClick(event, index);
							setValue(1);
							handleClose();
						}}
						selected={index === selectedIndex && value === 1}
					>
						{option.name}
					</MenuItem>
				))}
			</Menu>
		</React.Fragment>
	);

	const drawer = (
		<React.Fragment>
			<SwipeableDrawer
				classes={{ paper: classes.drawer }}
				disableBackdropTransition={!iOS}
				disableDiscovery={iOS}
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
				onOpen={() => setOpenDrawer(true)}
			>
				<List disablePadding>
					<ListItem
						divider
						button
						onClick={() => {
							setOpenDrawer(false);
							setValue(0);
						}}
						selected={value === 0}
						component={Link}
						to="/"
					>
						<ListItemText
							className={
								value === 0 ? [ classes.drawerItem, classes.drawerItemSelected ] : classes.drawerItem
							}
							disableTypography
						>
							Home
						</ListItemText>
					</ListItem>
					<ListItem
						divider
						button
						onClick={() => {
							setOpenDrawer(false);
							setValue(1);
						}}
						selected={value === 1}
						component={Link}
						to="/services"
					>
						<ListItemText
							className={
								value === 1 ? [ classes.drawerItem, classes.drawerItemSelected ] : classes.drawerItem
							}
							disableTypography
						>
							Services
						</ListItemText>
					</ListItem>
					<ListItem
						divider
						button
						onClick={() => {
							setOpenDrawer(false);
							setValue(2);
						}}
						selected={value === 2}
						component={Link}
						to="/revolution"
					>
						<ListItemText
							className={
								value === 2 ? [ classes.drawerItem, classes.drawerItemSelected ] : classes.drawerItem
							}
							disableTypography
						>
							The Revolution
						</ListItemText>
					</ListItem>
					<ListItem
						divider
						button
						onClick={() => {
							setOpenDrawer(false);
							setValue(3);
						}}
						selected={value === 3}
						component={Link}
						to="/about"
					>
						<ListItemText
							className={
								value === 3 ? [ classes.drawerItem, classes.drawerItemSelected ] : classes.drawerItem
							}
							disableTypography
						>
							About Us
						</ListItemText>
					</ListItem>
					<ListItem
						divider
						button
						onClick={() => {
							setOpenDrawer(false);
							setValue(4);
						}}
						selected={value === 4}
						component={Link}
						to="/contact"
					>
						<ListItemText
							className={
								value === 4 ? [ classes.drawerItem, classes.drawerItemSelected ] : classes.drawerItem
							}
							disableTypography
						>
							Contact Us
						</ListItemText>
					</ListItem>
					<ListItem
						className={
							value === 0 ? (
								[ classes.drawerItemEstimate, classes.drawerItemSelected ]
							) : (
								classes.drawerItemEstimate
							)
						}
						divider
						button
						onClick={() => {
							setOpenDrawer(false);
							setValue(5);
						}}
						selected={value === 5}
						component={Link}
						to="/estimate"
					>
						<ListItemText className={classes.drawerItem} disableTypography>
							Free Estimate
						</ListItemText>
					</ListItem>
				</List>
			</SwipeableDrawer>
			<IconButton
				className={classes.drawerIconContainer}
				onClick={() => setOpenDrawer(!openDrawer)}
				disableRipple
			>
				<MenuIcon className={classes.drawerIcon} />
			</IconButton>
		</React.Fragment>
	);

	return (
		<React.Fragment>
			<ElevationScroll>
				<AppBar position="fixed" color="primary">
					<Toolbar disableGutters>
						<Button
							className={classes.logoContainer}
							component={Link}
							to="/"
							onClick={() => setValue(0)}
							disableRipple
						>
							<img alt="company logo" className={classes.logo} src={logo} />
						</Button>
						{matches ? drawer : tabs}
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</React.Fragment>
	);
}

export default Header;
