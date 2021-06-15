import {
	Typography,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
} from '@material-ui/core';

import useStyles from './styles';

const CartItem = ({ item }) => {
	const classes = useStyles();

	return (
		<Card>
			<CardMedia
				image={item.media.source}
				alt={item.name}
				className={classes.media}></CardMedia>
			<CardContent className={classes.cardContent}>
				<Typography variant="subtitle2">{item.name}</Typography>
				<Typography variant="subtitle2">
					{item.line_total.formatted_with_symbol}
				</Typography>
			</CardContent>
			<CardActions className={classes.cartActions}>
				<div className={classes.buttons}>
					<Button type="button" size="small" color="secondary">
						-
					</Button>
					<Typography className={classes.quantity}>{item.quantity}</Typography>
					<Button type="button" size="small" color="primary">
						+
					</Button>
				</div>
				<Button
					type="button"
					size="small"
					variant="contained"
					color="secondary">
					Remove
				</Button>
			</CardActions>
		</Card>
	);
};

export default CartItem;
