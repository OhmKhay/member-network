// material
import { Grid, Container, Typography, Box } from '@mui/material';
// components
import Page from '../components/Page';
import { AccountProfile } from '../components/account/AccountProfile';
import { AccountProfileDetails } from '../components/account/AccountDetail';

// ----------------------------------------------------------------------

export default function CreateUser() {
  return (
    <Page title="Dashboard: Create User | HaoHaa">
      <Container>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Container maxWidth="lg">
            <Typography sx={{ mb: 3 }} variant="h4">
              Create User
            </Typography>
            <Grid container spacing={3}>
              {/* <Grid item lg={4} md={6} xs={12}>
                <AccountProfile />
              </Grid> */}
              <Grid item lg={8} md={6} xs={12}>
                <AccountProfileDetails />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Container>
    </Page>
  );
}
