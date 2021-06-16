import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { commerce } from './lib/commerce';

import { Navbar, Products, Cart, Checkout } from './components/';

const App = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});

	const fetchProducts = async () => {
		await commerce.products
			.list()
			.then((products) => {
				setProducts(products.data);
			})
			.catch((error) => {
				console.log('There was an error fetching the products', error);
			});
	};

	const fetchCart = async () => {
		setCart(
			await commerce.cart.retrieve().catch((error) => {
				console.error('There was an error fetching the cart', error);
			})
		);
	};

	const handleAddToCart = async (productId, quantity) => {
		const { cart } = await commerce.cart.add(productId, quantity);

		setCart(cart);
	};

	const handleUpdateCartQty = async (productId, quantity) => {
		const { cart } = await commerce.cart.update(productId, { quantity });
		setCart(cart);
	};

	const handleRemoveFromCart = async (productId) => {
		const { cart } = await commerce.cart.remove(productId);
		setCart(cart);
	};

	const handleEmptyCart = async () => {
		const { cart } = await commerce.cart.empty();
		setCart(cart);
	};

	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	return (
		<Router>
			<Navbar totalCartItems={cart.total_items} />
			<Switch>
				<Route exact path="/">
					<Products products={products} onAddToCart={handleAddToCart} />
				</Route>
				<Route exact path="/cart">
					<Cart
						cart={cart}
						handleUpdateCartQty={handleUpdateCartQty}
						handleRemoveFromCart={handleRemoveFromCart}
						handleEmptyCart={handleEmptyCart}
					/>
				</Route>
				<Route>
					<Checkout cart={cart} />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
