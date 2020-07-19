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
		height: '45px',
		'&:hover': {
			backgroundColor: theme.palette.secondary.light
		}
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
		'& .MuiListItemText-root': {
			opacity: 1
		}
	},
	drawerItemEstimate: {
		backgroundColor: theme.palette.common.orange
	},
	//clipped appbar
	appbar: {
		zIndex: theme.zIndex.modal + 1
	}
}));

function Header(props) {
	const classes = useStyles();
	const theme = useTheme();
	const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent); //for SwipeableDrawer
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	const { value, setValue, selectedIndex, setSelectedIndex } = props;
	const [ anchorEl, setAnchorEl ] = useState(null); //used to manage menu dropdown (services tab)
	const [ openMenu, setOpenMenu ] = useState(false); //whether menu is open or not

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
		{ name: 'Services', link: '/services', activeIndex: 1, selectedIndex: 0 },
		{ name: 'Customer Software Development', link: '/customsoftware', activeIndex: 1, selectedIndex: 1 },
		{ name: 'Mobile App Development', link: '/mobileapps', activeIndex: 1, selectedIndex: 2 },
		{ name: 'Website Development', link: '/websites', activeIndex: 1, selectedIndex: 3 }
	];

	const routes = [
		{ name: 'Home', link: '/', activeIndex: 0 },
		{
			name: 'Services',
			link: '/services',
			activeIndex: 1,
			ariaOwns: anchorEl ? 'simple-menu' : undefined,
			ariaPopup: anchorEl ? 'true' : undefined,
			mouseOver: (event) => handleClick(event)
		},
		{ name: 'The Revolution', link: '/revolution', activeIndex: 2 },
		{ name: 'About Us', link: '/about', activeIndex: 3 },
		{ name: 'Contact Us', link: '/contact', activeIndex: 4 }
	];

	useEffect(
		() => {
			//prevent active tab from defaulting upon refresh
			[ ...menuOptions, ...routes ].forEach((route) => {
				switch (window.location.pathname) {
					case `${route.link}`:
						if (value !== route.activeIndex) {
							setValue(route.activeIndex);
							if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
								setSelectedIndex(route.selectedIndex);
							}
						}
						break;
					default:
						break;
				}
			});
		},
		[ value, menuOptions, selectedIndex, routes ]
	);

	const tabs = (
		<React.Fragment>
			<Tabs value={value} onChange={handleChange} className={classes.tabContainer} indicatorColor="primary">
				{routes.map((route, index) => (
					<Tab
						key={`${route}${index}`}
						className={classes.tab}
						component={Link}
						to={route.link}
						label={route.name}
						aria-owns={route.ariaOwns}
						aria-haspopup={route.ariaPopup}
						onMouseOver={route.mouseOver}
					/>
				))}
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
				style={{ zIndex: 1302 }}
				keepMounted
			>
				{menuOptions.map((option, index) => (
					<MenuItem
						key={`${option}${index}`}
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
				<div className={classes.toolbarMargin} />
				<List disablePadding>
					{routes.map((route) => (
						<ListItem
							key={`${route}${route.activeIndex}`}
							divider
							button
							component={Link}
							to={route.link}
							selected={value === route.activeIndex}
							classes={{ selected: classes.drawerItemSelected }}
							onClick={() => {
								setOpenDrawer(false);
								setValue(route.activeIndex);
							}}
						>
							<ListItemText className={classes.drawerItem} disableTypography>
								{route.name}
							</ListItemText>
						</ListItem>
					))}

					<ListItem
						classes={{ root: classes.drawerItemEstimate, selected: classes.drawerItemSelected }}
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
				<AppBar className={classes.appbar} position="fixed" color="primary">
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
