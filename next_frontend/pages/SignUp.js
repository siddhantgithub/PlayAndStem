import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, Controller } from "react-hook-form";
import {sendSignupPostRequest} from "../actions/authRequestHandlers";
import Link from '../src/Link';
import Copyright from '../components/Copyright'
import { useRouter } from 'next/router'
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignUp({}) {

  const { register, handleSubmit, watch, control, formState: { errors },reset } = useForm();
  const router = useRouter();
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [severity, setSeverity] = React.useState('success');
  const [message, setMessage] = React.useState('');

  const onSubmit = data => {
      sendSignupPostRequest(data).then(data => {
        if (Object.keys(data)[0] == "error")
        {
          console.log ("Error occurred", data.error)
          setSeverity("error");
          setMessage(data.error);
        }
        else
        {
          //Operation was successful
          //router.push("/SignIn")
          setSeverity("success");
          setMessage(data.message);
          reset();
        }
        setOpenSnackBar(true);
      });
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

  //console.log ("Is Connected", isConnected)
  //console.log (watch())

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <Controller
                name="firstname"
                control={control}
                defaultValue=""
                rules={{ required: 'First name required' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      autoComplete="given-name"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      name="firstname"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      autoFocus
                    />
                )}
              />

              </Grid>
              <Grid item xs={12} sm={6}>
              <Controller
                name="lastname"
                control={control}
                defaultValue=""
                rules={{ required: 'Last name required' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="off"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      autoFocus
                    />
                )}
              />
              </Grid>
              <Grid item xs={12}>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="Username"
                      autoComplete="User Name"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      autoFocus
                    />
                )}
              />
              </Grid>
              <Grid item xs={12}>
              <Controller
                name="parentemail"
                control={control}
                defaultValue=""
                rules={{ required: "Parent's Email required", pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format"
                }}}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      required
                      fullWidth
                      id="peml"
                      label="Parent's Email Address"
                      name="parentseml"
                      autoComplete="Parent's Email"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      autoFocus
                    />
                )}
              />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Password required', validate: (val) => {if (watch ('confirmpassword') != val) return "Your passwords do not match"}}}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={value}
                        onChange={onChange}
                        autoComplete="Learner's Password"
                        error={!!error}
                        helperText={error ? error.message : null}
                        autoFocus
                      />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="confirmpassword"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Confirm Password required' }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextField
                        required
                        fullWidth
                        name="confirmpassword"
                        label="Confirm Password"
                        id="confirmpassword"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        autoFocus
                      />
                  )}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleSnackBarClose} anchorOrigin={{ vertical:'top', horizontal:'center' }}>
              <Alert onClose={handleSnackBarClose} severity={severity} sx={{ width: '100%' }}>
                {message}
              </Alert>
            </Snackbar>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
 );
}
