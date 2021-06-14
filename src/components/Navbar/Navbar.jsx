import React from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	Badge,
	MenuItem,
	Menu,
	Typography,
} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

import logo from '../../assets/commerce.png';

import useStyles from './styles';

const Navbar = ({ totalCartItems }) => {
	const classes = useStyles();

	return (
		<>
			<AppBar position="fixed" color="inherit" className={classes.appBar}>
				<Toolbar>
					<Typography variant="h6" className={classes.title} color="inherit">
						<img
							src={logo}
							alt="JKommerce"
							height="25px"
							className={classes.image}
						/>
						JKommerce
					</Typography>
					<div className={classes.grow} />
					<div className={classes.button}>
						<IconButton aria-label="Show cart items" color="inherit">
							<Badge badgeContent={totalCartItems} color="secondary">
								<ShoppingCart />
							</Badge>
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Navbar;
