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
import Link from '../src/Link';
import Copyright from '../components/Copyright'
import { useRouter } from 'next/router'
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Image from 'next/image';
import { RequestTypeForParentLogin } from '../constants/AllEnums';
import { GetSetParentDataThroughAPI } from '../actions/ParentRequestHandler';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountBaseScreen from '../components/AccountCreationLogin/AccountBaseScreen';
import FirebaseSocial from './auth-forms/FirebaseSocial';
import Divider from "@mui/material/Divider";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ParentSignUp({}) {

  const { register, handleSubmit, watch, control, formState: { errors },reset } = useForm();
  const router = useRouter();
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [severity, setSeverity] = React.useState('success');
  const [message, setMessage] = React.useState('');

  const onSubmit = data => {
    console.log ("Data is", data);
    var reqObj = {
      reqType: RequestTypeForParentLogin.CREATEACCOUNT,
      user: data,
    };
    GetSetParentDataThroughAPI(reqObj).then((resp) => {
      console.log("Data got for the parent is", resp);
      if (Object.keys(resp)[0] == "error")
        {
          console.log ("Error occurred", resp.error)
          setSeverity("error");
          setMessage(resp.error);
          setTimeout(router.push("/"),2000);
        }
        else
        {
          //Operation was successful
          //router.push("/SignIn")
          //setParentObj(resp);
          setSeverity("success");
          setMessage("Parent account successfully created");
          //setTimeout(router.push("/"),2000);
          //reset();
        }
        setOpenSnackBar(true);
    });
    return;
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
    <AccountBaseScreen TitleText={"Parent Sign Up"} ShowHomeButton={true}>
        <Divider sx={{ mt: 3, mb: 3 }} variant="fullWidth" style={{width:'100%'}}>
          <Typography variant= "body1"> Join With Social</Typography>
        </Divider>
        <FirebaseSocial/>
        <Divider sx={{ mt: 3 }} variant="fullWidth" style={{width:'100%'}}>
          <Typography variant= "body1"> Join With Email & Password</Typography>
        </Divider>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'First name required' }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <TextField
                        autoComplete="given-name"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
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
                name="email"
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
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="Email"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
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

          </Box>
          <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleSnackBarClose} anchorOrigin={{ vertical:'top', horizontal:'center' }}>
              <Alert onClose={handleSnackBarClose} severity={severity} sx={{ width: '100%' }}>
                {message}
              </Alert>
            </Snackbar>

    </AccountBaseScreen>
  );
}
