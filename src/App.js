import { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navbar, Products, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';

const App = () => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});
	const [order, setOrder] = useState({});
	const [errorMessage, setErrorMessage] = useState('');

	const fetchProducts = async () => {
		try {
			const { data } = await commerce.products.list();
			setProducts(data);
		} catch (error) {
			console.log('Error occured: ', error);
		}
	};

	const fetchCart = async () => {
		try {
			setCart(await commerce.cart.retrieve());
		} catch (error) {
			console.log('Error occured: ', error);
		}
	};

	const handleAddToCart = async (productId, quantity) => {
		try {
			const item = await commerce.cart.add(productId, quantity);
			setCart(item.cart);
		} catch (error) {
			console.log('Error occured: ', error);
		}
	};

	const handleUpdateCartQty = async (lineItemId, quantity) => {
		try {
			const response = await commerce.cart.update(lineItemId, { quantity });
			setCart(response.cart);
		} catch (error) {
			console.log('Error occured: ', error);
		}
	};

	const handleRemoveFromCart = async (lineItemId) => {
		try {
			const response = await commerce.cart.remove(lineItemId);
			setCart(response.cart);
		} catch (error) {
			console.log('Error occured: ', error);
		}
	};

	const handleEmptyCart = async () => {
		try {
			const response = await commerce.cart.empty();
			setCart(response.cart);
		} catch (error) {
			console.log('Error occured: ', error);
		}
	};

	const refreshCart = async () => {
		try {
			const newCart = await commerce.cart.refresh();
			setCart(newCart);
		} catch (error) {
			console.log('Error occured: ', error);
		}
	};

	const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
		try {
			const incomingOrder = await commerce.checkout.capture(
				checkoutTokenId,
				newOrder
			);

			setOrder(incomingOrder);
			refreshCart();
		} catch (error) {
			setErrorMessage(error.data.error.message);
		}
	};

	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

	return (
		<Router>
			<div style={{ display: 'flex' }}>
				<CssBaseline />
				<Navbar
					totalItems={cart.total_items}
					handleDrawerToggle={handleDrawerToggle}
				/>
				<Switch>
					<Route exact path="/">
						<Products
							products={products}
							onAddToCart={handleAddToCart}
							handleUpdateCartQty
						/>
					</Route>
					<Route exact path="/cart">
						<Cart
							cart={cart}
							onUpdateCartQty={handleUpdateCartQty}
							onRemoveFromCart={handleRemoveFromCart}
							onEmptyCart={handleEmptyCart}
						/>
					</Route>
					<Route exact path="/checkout">
						<Checkout
							cart={cart}
							order={order}
							onCaptureCheckout={handleCaptureCheckout}
							error={errorMessage}
						/>
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
