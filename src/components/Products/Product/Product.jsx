import {
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Typography,
	IconButton,
	Button,
	ButtonGroup,
} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './styles';

const Product = ({ product, onAddToCart }) => {
	const classes = useStyles();
	// console.log(product);

	return (
		<Card className={classes.root}>
			<CardMedia
				className={classes.media}
				image={product.media.source}
				title={product.name}
			/>
			<CardContent>
				<div className={classes.cardContent}>
					<Typography variant="subtitle2" gutterBottom>
						{product.name}
					</Typography>
					<Typography variant="subtitle2">
						{product.price.formatted_with_symbol}
					</Typography>
				</div>
			</CardContent>
			<CardContent className={classes.categories}>
				{product.categories.map((category) => (
					<ButtonGroup key={category.id} size="small">
						<Button variant="text" style={{ textTransform: 'initial' }}>
							{category.name}
						</Button>
					</ButtonGroup>
				))}
			</CardContent>
			<CardActions className={classes.cardActions} disableSpacing>
				<IconButton
					aria-label="Add to cart"
					onClick={() => onAddToCart(product.id, 1)}>
					<AddShoppingCart />
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default Product;
