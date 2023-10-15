import * as React from 'react';
import { Link } from "react-router-dom";
import { Stack, TextField, Button, Typography, Box, Checkbox, Alert, Paper } from '@mui/material';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios, { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';
import { DatePicker } from '@mui/x-date-pickers';

dayjs.extend(customParseFormat);

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3050', //IP to backend server
});

const registerSchema = Yup.object().shape({
  username: Yup.string()
    .required('errors.required')
    .min(4, 'errors.usernameShort')
    .max(20, 'errors.usernameLong')
    .matches(/^[a-z0-9]+$/, 'usernameChars'),
  email: Yup.string()
    .required('errors.required')
    .email('errors.invalidEmail'),
  password: Yup.string()
    .required('errors.required')
    .min(8, 'errors.passwordShort')
    .matches(/[0-9]/, 'errors.passwordDigit')
    .matches(/[a-z]/, 'errors.passwordLowercase')
    .matches(/[A-Z]/, 'errors.passwordUppercase')
    .matches(/[@#$%^&+=!]/, 'errors.passwordSpecialCharacter'),
  dateOfBirth: Yup.mixed()
    .required('errors.required')
    .test('age', 'errors.dateOfBirthYoung', (value) => {
      if (!value) return false;

      // Check if the value is a valid Date object
      if (!(value instanceof Date) || isNaN(value.getTime())) {
        throw new Yup.ValidationError('errors.invalidDate', null, 'dateOfBirth'); // Return false for an invalid date
      }

      const currentDate = new Date();
      const selectedDate = new Date(value);
      const timeDiff = currentDate.getTime() - selectedDate.getTime();
      const ageInYears = Math.floor(timeDiff / (1000 * 3600 * 24 * 365.25));

      return ageInYears >= 18;
    }),
})

export function Register() {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false); //Wait for server response
  const [checked, setChecked] = React.useState(false); //Check if user agreed to ToS

  // For displaying errors with registration
  const [error, setError] = React.useState('');

  // For displaying registration successful
  const [success, setSuccess] = React.useState('');

  // Check if user ticked "I've read the terms"
  const handleChangeTick = (event : any) => {
    setChecked(event.target.checked);
  }

  const handleDateChange = (date: any | null) => {
    formik.setFieldValue('dateOfBirth', date.$d);
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      dateOfBirth: null
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true); // Set loading to true while the request is in progress
        // Make the registration request
        const response = await axiosInstance.post('/api/register', values);

        // Registration successful, you can handle the response here
        console.log(response.data.message);
        setSuccess('success.registerSuccess');
        setError('');
      } catch (error) {
        const axiosError = error as AxiosError; // Type assertion
      
        // Handle the Axios error
        if (axiosError.response) {
          const responseData = axiosError.response.data as {message: string}; // Type assertion

          // The server responded with an error
          console.error('Registration error:', responseData.message);

          if (responseData.message === 'Email is already in use') {
            // Set the emailInUseError state variable with the error message
            setError('errors.emailInUse');
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
        setSuccess('');
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
          <Typography variant="h4" fontWeight={600}>{t('register.registerTitle')} </Typography>
          <Typography variant="subtitle1">{t('register.registerCaption')} </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2.5} sx={{marginTop: 1}}>
              <TextField 
                required
                id="username" 
                label={t('register.username')} 
                variant="outlined" 
                type="username" 
                autoComplete="username"
                size="small"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && t(formik.errors.username || '')}
              />
              <TextField
                required 
                id="email" 
                label={t('login.email')} 
                variant="outlined" 
                type="email" 
                autoComplete="email"
                size="small"
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
                autoComplete="password"
                size="small"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && t(formik.errors.password || '')}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  minDate={dayjs('1950-01-01T12:00:00')}
                  maxDate={dayjs()}
                  label={t('register.dateOfBirth')} 
                  format="DD/MM/YYYY"
                  value={formik.values.dateOfBirth}
                  onChange={handleDateChange}
                  views={['year', 'month', 'day']}
                  openTo='year'
                  slotProps={{ 
                    textField: {
                      required: true,
                      id: 'dateOfBirth',
                      size: 'small', 
                      onBlur: formik.handleBlur,
                      error: formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth),
                      helperText: formik.touched.dateOfBirth && t(formik.errors.dateOfBirth || ''),
                    },
                    }}
                />
              </LocalizationProvider>
              <Typography variant="caption" sx={{
                alignItems: 'center',
                display: 'flex'
              }}>
                <Checkbox checked={checked} onChange={handleChangeTick} sx={{
                  padding: 0,
                  margin: '0 5px 0 0'
                }}/> 
                {t('register.readTerms')}&nbsp;
                <Box sx={{             
                  display: 'inline',   
                  textDecoration: 'none', 
                  color: 'rgb(0, 102, 204)',
                  ':hover' : {
                    textDecoration: 'underline'
                  }}}>
                  <a href="/" style={{
                    textDecoration: 'inherit', 
                    color: 'inherit',
                    height: 'inherit',
                    display: 'inline-block' 
                    }}>{t('register.termsOfService')}</a></Box>.
              </Typography>
              <Button
                variant="contained"
                type='submit'
                disabled={!checked || loading}
                sx={{
                  height: 42,
                  alignSelf: 'center',
                  width: '70%',
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(100, 209, 78, 0.9)',
                  color: 'rgb(17, 48, 48)',
                  ":hover": {
                    backgroundColor: 'rgb(95, 200, 75)'
                  }
                }}
              >{!loading && t('login.registerBtn')} {loading && <CircularProgress size={35}/>} </Button>
              {error && <Alert severity="error">{t(error)}</Alert>}
              {success && <Alert severity="success">{t(success)}</Alert>}
              <Typography sx={{
                alignSelf: 'center',
                textDecoration: 'none', 
                color: 'rgb(0, 102, 204)',
                ':hover' : {
                  textDecoration: 'underline'
                }
                }}>
                <Link to = "../login" style={{
                  color: 'inherit', 
                  textDecoration: 'inherit', 
                  height: 'inherit',
                  display: 'inline-block'
                  }}>{t('register.haveAccount')} </Link>
              </Typography> 
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  )
}