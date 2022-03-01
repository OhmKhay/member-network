// material
import { Grid, Container, Typography, Box } from "@mui/material";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../redux/actions/user";
// components
import Page from "../components/Page";
import AccountProfile from "../components/account/AccountProfile";
import { AccountProfileDetails } from "../components/account/AccountDetail";

// ----------------------------------------------------------------------

const Account = ({ profile, getUserProfile, updateUserProfile }) => {
	// Get ID from URL
	const params = useParams();
	useEffect(() => {
		if (params.id) {
			getUserProfile(params.id);
		}
	}, [params.id]);

	return (
		<Page title="Dashboard: Account | HaoHaa">
			<Container>
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						py: 8,
					}}
				>
					<Container maxWidth="lg">
						<Typography sx={{ mb: 3 }} variant="h4">
							Account
						</Typography>
						<Grid container spacing={3}>
							<Grid item lg={4} md={6} xs={12}>
								<AccountProfile
									profile={profile}
									id={params.id}
								/>
							</Grid>
							<Grid item lg={8} md={6} xs={12}>
								<AccountProfileDetails
									id={params.id}
									updateUserProfile={updateUserProfile}
								/>
							</Grid>
						</Grid>
					</Container>
				</Box>
			</Container>
		</Page>
	);
};

const mapStateToProps = (state) => ({
	profile: state.user.profile,
});
export default connect(mapStateToProps, { getUserProfile, updateUserProfile })(
	Account
);
