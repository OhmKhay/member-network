import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return (
    <Box
      component="img"
      src="https://static.haohaa.com/haohaa.png"
      sx={{ width: 120, height: 30, ...sx }}
    />
  );
}
