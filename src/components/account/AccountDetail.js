import { useState, useEffect } from "react";
// import * as Yup from "yup";
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
import { toast } from "react-toastify";
// const ProfleSchema = Yup.object().shape({
// 	firstName: Yup.string()
// 	.min(2, "Too Short!")
// 	.max(50, "Too Long!")
// 	.required("First name required"),
//  lastName: Yup.string()
// 	.min(2, "Too Short!")
// 	.max(50, "Too Long!")
// 	.required("Last name required"),
//   email: Yup.string().email("Email must be a valid email address"),
// })

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

export const AccountProfileDetails = ({ id, profile, updateUserProfile }) => {
	// const navigate = useNavigate();

	// const { profile } = useSelector((state) => state.user)
	// const [profile, setProfile] = useState({});



	const [values, setValues] = useState({
		firstName: "",
		lastName: "",
		email: "",
		role: "",
	});

	useEffect(() => {
		setValues({
			firstName: profile?.firstName,
			lastName: profile?.lastName,
			email: profile?.email,
			role: profile?.role,
		   })
	}, [profile])


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
		
		toast.success("Profile Updated Successfully!!");
		
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
