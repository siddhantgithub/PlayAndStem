import * as React from 'react';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FirebaseSocial from './auth-forms/FirebaseSocial';
import { useForm, Controller } from "react-hook-form";
import {sendSigninRequest,setLocalDataPostSignIn,isAuth} from "../actions/authRequestHandlers";
import Router from 'next/router';
import Copyright from '../components/Copyright'

//TODO: Show loading

export default function SignIn() {

  const { register, handleSubmit, watch, control, formState: { errors } } = useForm();

  const onSubmit = userdata => {
    console.log(userdata);
    sendSigninRequest(userdata).then(data => {
      if (data.error) {
          //setValues({ ...values, error: data.error, loading: false });
      } else {
          // save user token to cookie
          // save user info to localstorage
          // authenticate user
          console.log(data);
          setLocalDataPostSignIn(data, () => {
              //Router.push(`/parent/ParentDashboard`);
              Router.push({
                pathname: '/parent/ParentDashboard',
            })
          });
      }
  });
  };

  useEffect(() => {
    const isAuthResponse = isAuth();
    console.log (isAuthResponse);
    isAuth() && Router.push({
      pathname: '/parent/ParentDashboard'
  });
}, []);
  
  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: 'Email required', pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format"
                }}}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      autoFocus
                    />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: 'Password required' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      autoFocus
                    />
                )}
              />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Grid item>
              <Divider sx={{ mt: 3, mb: 2 }}>
                <Typography variant= "body3"> Login with</Typography>
              </Divider>
            </Grid>
              <FirebaseSocial />
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}
