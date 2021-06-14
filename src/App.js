import { useState, useEffect } from 'react';
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
		<>
			<Navbar totalCartItems={cart.total_items} />
			{/* <Products products={products} onAddToCart={handleAddToCart} /> */}
			<Cart cart={cart} />
		</>
	);
};

export default App;
