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
		marginBottom: '3em'
	},
	logo: {
		height: '7em'
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
	}
}));

function Header() {
	const classes = useStyles();
	const [ value, setValue ] = useState(0); //used to manage which tab is open
	const [ anchorEl, setAnchorEl ] = useState(null); //used to manage menu dropdown (services tab)
	const [ open, setOpen ] = useState(false); //whether menu is open or not
	const [ selectedIndex, setSelectedIndex ] = useState(0); //which menu item is selected

	const handleChange = (e, value) => {
		setValue(value);
	};

	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
		setOpen(true);
	};

	const handleClose = (e) => {
		setAnchorEl(null);
		setOpen(false);
	};

	const handleMenuItemClick = (event, index) => {
		setAnchorEl(null);
		setOpen(false);
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
						<Tabs
							value={value}
							onChange={handleChange}
							className={classes.tabContainer}
							indicatorColor="primary"
						>
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
							open={open}
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
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</React.Fragment>
	);
}

export default Header;
