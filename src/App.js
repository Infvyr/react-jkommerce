import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { commerce } from './lib/commerce';

import { Navbar, Products, Cart } from './components/';

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
		const item = await commerce.cart.add(productId, quantity);

		setCart(item.cart);
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
					<Cart cart={cart} />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
