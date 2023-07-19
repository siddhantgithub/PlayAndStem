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
import LearnerLogin from "../components/LearnerDashboard/LearnerAccountFlow";


export default function LearnerLandingScreen ()
{
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        //minHeight="100vh"
        sx = {{mt:10}}
      >
        <LearnerLogin/>
      </Box>
        
        
    );
}