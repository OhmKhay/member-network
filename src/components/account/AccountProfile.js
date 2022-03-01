import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Typography,
} from "@mui/material";

const AccountProfile = ({ profile }) => (
	<Card>
		<CardContent>
			<Box
				sx={{
					alignItems: "center",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Avatar
					src={" "}
					sx={{
						height: 64,
						mb: 2,
						width: 64,
					}}
				/>
				<Typography color="textPrimary" gutterBottom variant="h5">
					{profile?.displayName}
				</Typography>
				<Typography color="textSecondary" variant="body2">
					{`${profile?.role}`}
				</Typography>
			</Box>
		</CardContent>
		<Divider />
		<CardActions>
			<Button color="primary" fullWidth variant="text">
				Upload picture
			</Button>
		</CardActions>
	</Card>
);

export default AccountProfile;
