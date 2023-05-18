import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SupervisorDropdown from './SupervisorDropDown';
import ResponseBox from './ResponseBox';
import LoadingSpinner from './LoadingSpinner';
import { useSupervisorData } from '../hooks/getData';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const NotificationForm = () => {
  const { loading, SupervisorData } = useSupervisorData();
  const [notificationResponse, setNotificationResponse] = useState(false);
  const [notificationInfo, setNotificationInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    supervisor: '',
  });

  const handleChange = (event) => {
    setNotificationInfo({ ...notificationInfo, [event.target.name]: event.target.value });
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {};
    for(const property in notificationInfo) {
      if(notificationInfo[property] !== '') {
        if(property === 'supervisor') {
          body[property] = SupervisorData[notificationInfo.supervisor];
        } else {
          body[property] = notificationInfo[property];
        }
      }
    }
      
    return fetch('/api/submit', {
      method:'Post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })      
      .then((res) => res.json())
      .then(res => {
        if(res.body) {
          setNotificationResponse(res.body);
          setNotificationInfo({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            supervisor: '',
          });
        } else setNotificationResponse(res);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl">
        { loading ? <LoadingSpinner />
          : <>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h2">
            Notification Form
              </Typography>
              {notificationResponse ? <ResponseBox response={notificationResponse} /> : null}
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Grid container spacing={20}>
                  <Grid item>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      value={notificationInfo.firstName}
                      autoFocus
                      onChange={(event) => handleChange(event)}                    
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="lastName"
                      label="Last Name"
                      type="lastName"
                      id="lastName"
                      value={notificationInfo.lastName}
                      onChange={(event) => handleChange(event)}
                    />
                  </Grid>
                </Grid>
                <Typography component="h1" variant="h6">
            How Would you like to be contacted?
                </Typography>
                <Grid container spacing={20}>
                  <Grid item>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="phoneNumber"
                      label="Phone Number"
                      name="phoneNumber"
                      autoFocus
                      value={notificationInfo.phoneNumber}
                      onChange={(event) => handleChange(event)}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      margin="normal"
                      fullWidth
                      name="email"
                      label="Email"
                      type="email"
                      id="email"
                      value={notificationInfo.email}
                      onChange={(event) => handleChange(event)}
                    />
                  </Grid>
                </Grid>
                <SupervisorDropdown supervisorData={SupervisorData} selectValue={notificationInfo.supervisor} handleChangeFunction={handleChange}/>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
              Submit
                </Button>
              </Box>
            </Box>
          </>}
      </Container>
    </ThemeProvider>
  );
};


export default NotificationForm;
