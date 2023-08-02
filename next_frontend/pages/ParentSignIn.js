import * as React from "react";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "../src/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FirebaseSocial from "./auth-forms/FirebaseSocial";
import { useForm, Controller } from "react-hook-form";
import {
  sendSigninRequest,
  setLocalDataPostSignIn,
  isAuth,
} from "../actions/authRequestHandlers";
import Router from "next/router";
import Copyright from "../components/Copyright";
import { useRouter } from "next/router";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from 'next/image'

//TODO: Show loading
 const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignIn() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [severity, setSeverity] = React.useState("success");
  const [message, setMessage] = React.useState("");
  const router = useRouter();
  const { data: session, status } = useSession();
  const isUser = !!session && session.user;
  const loading = status === "loading";

  React.useEffect(() => {
    console.log ("Use effect called");
    if (loading) return // Do nothing while loading
    if (!isUser) return // If not authenticated, force log in
    //console.log ("The value of session is", session);
    if (isUser) {
      console.log ("user is", session.user);
      if (session.user.loginType == "parent")
        router.push("/ParentLandingScreen")
      else
        router.push("/main/LearnerDashboard_new");
      return;
    }
  }, [isUser, loading]);

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const onSubmit = (userdata) => {
    console.log(userdata);
    const { email, password } = userdata;
    signIn("parentlogin", {
      email: email,
      password: password,
      redirect: false,
    }).then((data) => {
      //console.log("The data received is ", data);
      setOpenSnackBar(true);
      if (!!data.error) {
        //setValues({ ...values, error: data.error, loading: false });
        setSeverity("error");
        setMessage(
          "Cannot Login now. Check your password or create an account using SignUp"
        );
      } else {
        // save user token to cookie
        // save user info to localstorage
        // authenticate user
        setSeverity("success");
        setMessage("Login successful. Redirecting to Parent Dashboard");
        reset();
        router.push("/ParentLandingScreen");
      }
    });
  };

  useEffect(() => {}, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >

        <Image
          src="/PlayAndStemLogo.png"
          width={75}
          height={75}
          alt="Company Logo"
        />

        <Typography component="h1" variant="h5" sx={{mt:3}}>
          Parent Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
        <Divider sx={{ mt: 3, mb: 3 }}>
          <Typography variant= "heading1"> Login with social</Typography>
        </Divider>
        <FirebaseSocial/>
        <Divider sx={{ mt: 3, mb: 3 }}>
          <Typography variant= "body3"> Login with email and password</Typography>
        </Divider>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: "Email required", pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format"
            }}}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                autoFocus
                autoComplete='off' 
                inputProps={{autoComplete: "off"}}
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
            rules={{ required: "Password required" }}
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
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
        <Link href="/ParentSignUp" variant="body2">
                {"Signup For Email/Password account"}
              </Link>
      </Box>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Copyright sx={{ mt: 2, mb: 4 }} />
    </Container>
  );
}
