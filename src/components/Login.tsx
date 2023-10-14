import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Divider, TextField, Button, Stack, Link, Box, Typography, Alert, Paper } from "@mui/material";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios, { AxiosError } from 'axios'; // Import Axios
import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';
//import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3050',
});

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('errors.required')
    .email('errors.invalidEmail'),
  password: Yup.string()
    .required('errors.required')
})

export function Login() {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false); //Wait for server response
  // For displaying errors with registration
  const [error, setError] = React.useState('');

  // For displaying registration successful
  const [success, setSuccess] = React.useState('');

  // Initialize navigation
  //const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true); // Set loading to true while the request is in progress
        // Send a POST request to your login API endpoint
        const response = await axiosInstance.post('/api/login', values);

        // Store the JWT token in localStorage
        localStorage.setItem('token', response.data.token);
        console.log(response.data.message);
        
        setSuccess('success.loginSuccess');
        setError(''); // Clear previous error message

        // Redirect the user to a dashboard or other protected route example:
        // navigate(`/`, {replace: true});
      } catch (error) {
        const axiosError = error as AxiosError; // Type assertion
        // Handle login errors, such as invalid credentials
        if (axiosError.response) {
          const responseData = axiosError.response.data as {message: string}; // Type assertion

          // The server responded with an error
          console.error('Login error:', responseData.message);

          if (responseData.message === 'User not found' || responseData.message === 'Invalid credentials') {
            setError('errors.invalidCredentials')
          }
        } else if (axiosError.request) {
          // The request was made but no response was received
          console.error('Request error:', axiosError.request);
          setError('errors.noResponse');
        } else {
          // Something else went wrong
          console.error('Other error:', axiosError.message);
          setError('errors.otherError');
        }
        setSuccess(''); // Clear any previous success messages
      } finally {
        setLoading(false);
      }
    },
  });

  return(
    <>
      <Box sx={{
        flex: '1 0 0%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Paper sx={{
          padding: '15px',
          width: {xs: '100%', sm: '400px'},
          borderRadius: {xs: 0, sm: '10px'},
          borderLeft: {xs: 0, sm: '8px solid rgb(106, 48, 172)'}
        }}>
          <Typography variant="h4" fontWeight={600} sx={{
            margin: '0 0 10px',
          }}>
            {t('login.loginTitle')}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={1.2} direction="column" sx={{marginBottom: 1}}>
              <TextField
                required
                id="email" 
                label={t('login.email')} 
                variant="outlined" 
                type="email"
                autoComplete="current-email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && t(formik.errors.email || '')}
              />
              <TextField
                required 
                id="password" 
                label={t('login.password')}
                variant="outlined" 
                type="password" 
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && t(formik.errors.password || '')}
              />
              <Button 
                variant="contained" 
                disabled={loading}
                type="submit" 
                sx={{
                  height: 50, 
                  fontSize: 18, 
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(53, 65, 145, 0.9)',
                  ":hover": {
                    backgroundColor: 'rgb(53, 65, 145)'
                  }
                }}>
                {!loading && t('login.loginBtn')} {loading && <CircularProgress size={35}/>}
              </Button>
              {error && <Alert severity="error">{t(error)}</Alert>}
              {success && <Alert severity="success">{t(success)}</Alert>}
            </Stack>
          </form>
          <Stack spacing={1.2} sx={{textAlign: 'center'}}>
            <Typography sx={{
              alignSelf: 'center',
              textDecoration: 'none', 
              color: 'rgb(0, 102, 204)',
              ':hover' : {
                textDecoration: 'underline'
              }
            }}>
              <Link component={RouterLink} to="#" style={{
                color: 'inherit', 
                textDecoration: 'inherit',
                height: 'inherit',
                display: 'inline-block'
                }}>{t('login.forgotPassword')}</Link>
            </Typography>
            <Divider />
            <Link component={RouterLink} underline="none" to = "../register">
              <Button
                variant="contained"
                sx={{
                  height: 42,
                  width: '70%',
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(100, 209, 78, 0.9)',
                  color: 'rgb(17, 48, 48)',
                  ":hover": {
                    backgroundColor: 'rgb(95, 200, 75)'
                  }
                }}
              >{t('login.registerBtn')}</Button>
            </Link>
          </Stack>
        </Paper>
      </Box>
    </>
  )
}