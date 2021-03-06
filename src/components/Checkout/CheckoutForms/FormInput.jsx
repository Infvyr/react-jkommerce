import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

function FormInput({ name, label }) {
	const { control } = useFormContext();
	const isError = false;

	return (
		<Grid item xs={12} sm={6}>
			<Controller
				control={control}
				name={name}
				render={({ field }) => (
					<TextField
						defaultValue=""
						fullWidth
						label={label}
						required
						error={isError}
					/>
				)}
			/>
		</Grid>
	);
}

export default FormInput;
