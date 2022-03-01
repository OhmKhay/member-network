// material
import { Container, Typography, Box } from '@mui/material';
import { SettingsNotifications } from '../components/settings/settingsNotifications';
import { SettingsPassword } from '../components/settings/settingsPassword';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function Settings() {
  return (
    <Page title="Dashboard: Settings | HaoHaa">
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
              Settings
            </Typography>
            <SettingsNotifications />
            <Box sx={{ pt: 3 }}>
              <SettingsPassword />
            </Box>
          </Container>
        </Box>
      </Container>
    </Page>
  );
}
