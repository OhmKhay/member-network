import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
import { connect } from 'react-redux';
import { register } from '../../../redux/actions/auth';
// ----------------------------------------------------------------------

const RegisterForm = ({ register, isAuthenticated }) => {
  const navigate = useNavigate();
  const [stateValues, setStateValues] = useState({
    role: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (isAuthenticated) {
      return navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated]);
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address')
  });

  const roles = [
    {
      value: 'member',
      label: 'Member'
    },
    {
      value: 'agent',
      label: 'Agent'
    }
  ];

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async () => {
      console.log('here is values:', values);
      // await register(values.email, values.password);
      // if (isAuthenticated) {
      //   return navigate('/dashboard', { replace: true });
      // }
    }
  });

  const handleChange = (event) => {
    setStateValues({
      ...stateValues,
      [event.target.name]: event.target.value
    });
  };

  const { errors, setFieldValue, touched, handleSubmit, isSubmitting, getFieldProps, values } =
    formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            label="Select Role"
            name="role"
            onChange={(e) => {
              setFieldValue('role', e.target.value);
            }}
            // required
            select
            defaultChecked={false}
            SelectProps={{ native: true }}
            value={stateValues.state}
            variant="outlined"
          >
            {roles.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            // disabled={!!(JSON.stringify(errors) === '{}')}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { register })(RegisterForm);
