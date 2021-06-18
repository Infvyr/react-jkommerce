import { useState, useEffect } from 'react';
import {
	CssBaseline,
	Paper,
	Stepper,
	Step,
	StepLabel,
	Typography,
	CircularProgress,
	Divider,
	Button,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

import { commerce } from '../../lib/commerce';

import AddressForm from './CheckoutForms/AddressForm';
import PaymentForm from './CheckoutForms/PaymentForm';

import useStyles from './styles';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
	const [checkoutToken, setCheckoutToken] = useState(null);
	const [activeStep, setActiveStep] = useState(0);
	const [shippingData, setShippingData] = useState({});
	const [isFinished, setIsFinished] = useState(false);
	const history = useHistory();
	const classes = useStyles();

	const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
	const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
	const test = (data) => {
		setShippingData(data);
		nextStep();
	};

	useEffect(() => {
		if (cart.id) {
			const generateToken = async () => {
				try {
					const token = await commerce.checkout.generateToken(cart.id, {
						type: 'cart',
					});

					setCheckoutToken(token);
				} catch {
					if (activeStep !== steps.length) history.push('/');
				}
			};

			generateToken();
		}
	}, [cart]);

	const timeout = () => {
		setTimeout(() => {
			setIsFinished(true);
		}, 3000);
	};

	let Confirmation = () =>
		order.customer ? (
			<>
				<div>
					<Typography variant="h5">
						Thank you for your purchase, {order.customer.firstname}
						{order.customer.lastname}!
					</Typography>
					<Divider className={classes.divider} />
					<Typography variant="subtitle2">
						Order reference: {order.customer_reference}
					</Typography>
				</div>
				<br />
				<Button to="/" component={Link} variant="outlined" type="button">
					Back to home
				</Button>
			</>
		) : isFinished ? (
			<>
				<div>
					<Typography variant="h5">Thank you for your purchase!</Typography>
				</div>
				<br />
				<Button to="/" component={Link} variant="outlined" type="button">
					Back to home
				</Button>
			</>
		) : (
			<div className={classes.spinner}>
				<CircularProgress />
			</div>
		);

	if (error) {
		Confirmation = () => (
			<>
				<Typography variant="h5">Error: {error}</Typography>
				<br />
				<Button to="/" component={Link} variant="outlined" type="button">
					Back to home
				</Button>
			</>
		);
	}

	const Form = () =>
		activeStep === 0 ? (
			<AddressForm
				checkoutToken={checkoutToken}
				nextStep={nextStep}
				setShippingData={setShippingData}
				test={test}
			/>
		) : (
			<PaymentForm
				checkoutToken={checkoutToken}
				nextStep={nextStep}
				backStep={backStep}
				shippingData={shippingData}
				onCaptureCheckout={onCaptureCheckout}
				timeout={timeout}
			/>
		);

	return (
		<>
			<CssBaseline />
			<div className={classes.toolbar} />
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography variant="h4" align="center">
						Checkout
					</Typography>
					<Stepper activeStep={activeStep} className={classes.stepper}>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					{activeStep === steps.length ? (
						<Confirmation />
					) : (
						checkoutToken && <Form />
					)}
				</Paper>
			</main>
		</>
	);
};

export default Checkout;
