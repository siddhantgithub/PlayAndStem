import * as React from 'react';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '../src/Link';
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
import { useRouter } from 'next/router'
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { signIn } from "next-auth/react"

//TODO: Show loading
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignIn() {

  const { register, handleSubmit, watch, control, formState: { errors },reset } = useForm();
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [severity, setSeverity] = React.useState('success');
  const [message, setMessage] = React.useState('');
  const router = useRouter()

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

  const onSubmit = userdata => {
    console.log(userdata);
    const {username,password} = userdata;
    signIn("credentials", {username:username,password:password, redirect: false}).then(data => {
      console.log ("The data received is ", data);
      setOpenSnackBar(true);
      if (!!data.error) {
          //setValues({ ...values, error: data.error, loading: false });
          setSeverity("error");
          setMessage("Cannot Login now. Check your password or create an account using SignUp");
      } else {
          // save user token to cookie
          // save user info to localstorage
          // authenticate user
          setSeverity("success");
          setMessage("Login successful. Redirecting to Learner Dashboard");
          reset();
          router.push("/test/LearnerDashboard_new");
      }
    });
    /*sendSigninRequest(userdata).then(data => {
      setOpenSnackBar(true);  
      if (data.error) {
          //setValues({ ...values, error: data.error, loading: false });
          setSeverity("error");
          setMessage(data.error);
      } else {
          // save user token to cookie
          // save user info to localstorage
          // authenticate user
          console.log(data);
          setSeverity("success");
          setMessage("Login successful. Redirecting to Learner Dashboard");
          reset();
      }
    });*/
  };

  useEffect(() => {
   
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
                name="username"
                control={control}
                defaultValue=""
                rules={{ required: 'Username required'}}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      autoFocus
                      InputLabelProps={{
                        shrink: true,
                    }}
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
                      InputLabelProps={{
                        shrink: true,
                    }}
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
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"Forgot Password or Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Grid item>
             { /*<Divider sx={{ mt: 3, mb: 2 }}>
                <Typography variant= "body3"> Login with</Typography>
                </Divider> */}
            </Grid>
              {/*<FirebaseSocial />*/}
          </Box>
        </Box>
        <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleSnackBarClose} anchorOrigin={{ vertical:'top', horizontal:'center' }}>
            <Alert onClose={handleSnackBarClose} severity={severity} sx={{ width: '100%' }}>
              {message}
            </Alert>
        </Snackbar>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}
