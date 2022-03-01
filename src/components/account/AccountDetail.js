import { useState } from "react";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"

const states = [
	{
		value: "agent",
		label: "Agent",
	},
	{
		value: "member",
		label: "Member",
	},
	{
		value: "admin",
		label: "Admin",
	},
];

export const AccountProfileDetails = ({ id, updateUserProfile }) => {
	// const navigate = useNavigate();

	const { profile } = useSelector((state) => state.user)

	console.log("here is profileData:", profile)

	const [values, setValues] = useState({
		firstName: profile?.firstName || "",
		lastName: profile?.lastName || "",
		email: profile?.email || "",
		role: profile?.role || "",
	});

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};
	const handleSave = async (e) => {
	 await updateUserProfile({
			id,
			...values,
		});
		
		
	};

	return (
		<form autoComplete="off" noValidate>
			<Card>
				<CardHeader
					subheader="The information can be edited"
					title="Profile"
				/>
				<Divider />
				<CardContent>
					<Grid container spacing={3}>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								helperText="Please specify the first name"
								label="First name"
								name="firstName"
								onChange={handleChange}
								required
								value={values.firstName}
								variant="outlined"
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label="Last name"
								name="lastName"
								onChange={handleChange}
								required
								value={values.lastName}
								variant="outlined"
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label="Select Role"
								name="role"
								onChange={handleChange}
								required
								select
								SelectProps={{ native: true }}
								value={values.role}
								variant="outlined"
							>
								{states.map((option) => (
									<option
										key={option.value}
										value={option.value}
									>
										{option.label}
									</option>
								))}
							</TextField>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label="Email Address"
								name="email"
								onChange={handleChange}
								// required
								value={values.email}
								variant="outlined"
							/>
						</Grid>
						{/* <Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label="Phone Number"
								name="phone"
								onChange={handleChange}
								type="number"
								value={values.phone}
								variant="outlined"
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label="Country"
								name="country"
								onChange={handleChange}
								required
								value={values.country}
								variant="outlined"
							/>
						</Grid> */}
					</Grid>
				</CardContent>
				<Divider />
				<Box
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						p: 2,
					}}
				>
					<Button
						onClick={handleSave}
						color="primary"
						variant="contained"
					>
						Save details
					</Button>
				</Box>
			</Card>
		</form>
	);
};
