import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SupportAgentIcon from "@mui/icons-material/Person";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../components/Copyright";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { RequestTypeForParentLogin } from "../constants/AllEnums";
import { GetSetParentDataThroughAPI } from "../actions/ParentRequestHandler";
import ParentDashboard from "../components/parentDashboard/ParentDashboard";
import { useStore } from "zustand";
import LearnerStore from "../store/LearnerStore";
import { backgroundImage } from "../ui_assets/images/UIThemes/colorThemes";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ParentSignupFlow() {
  const { data: session, status } = useSession();
  const isUser = !!session && session.user;
  const loading = status === "loading";
  const [parentObj, setParentObj] = React.useState(null);
  const { currTheme } = useStore(LearnerStore);
  const [parentImage, setParentImage] = React.useState(null);
  const router = useRouter()

  React.useEffect(() => {
    //console.log ("Use effect called");
    if (loading) return; // Do nothing while loading
    if (!isUser) {
      console.log("No user found");
      //Need to redirect to parent login
    } // If not authenticated, force log in
    //console.log ("The value of session is", session);
    if (isUser) {
      setParentImage(session.user.image);
      var reqObj = {
        reqType: RequestTypeForParentLogin.Login,
        user: session.user,
      };
      console.log("Will get the learners information from the parent", reqObj);
      GetSetParentDataThroughAPI(reqObj).then((resp) => {
        console.log("Data got for the parent is", resp);
        setParentObj(resp);
      });
    }
  }, [isUser, loading]);

  async function GoogleSignIn() {
    console.log("Signing in now");
    //var result = signIn("google", { callbackUrl: '/foo' }).then ((result)=> {console.log ("result", result)});
    var result = signIn("google", { redirect: false }).then((result) => {
      console.log("result", result);
    });
    console.log("Result is ", result);
  }

  async function FacebookSignIn() {
    console.log("Facebook Signing in now");
  }

  function onBackClicked (e)
  {
    e.preventDefault()
    router.push("/LandingScreen")

  }

  return (
    <Container component="main">
      
      <Box
        sx={{
          marginTop: 18,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow:1
        }}
      >
        
        {!parentObj && (
          <>
          <Button
          onClick={onBackClicked}
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3, flexDirection: "row", alignItems:"flex-start" }}
        >
          Dashboard
        </Button>
            <Button
              variant="contained"
              sx={{ mb: 3, flexDirection: "row", alignItems:"flex-start" }}
              onClick={GoogleSignIn}
            >
              Continue With Google
            </Button>
            <Button
              variant="contained"
              sx={{ mb: 3, flexDirection: "row" }}
              onClick={FacebookSignIn}
            >
              Continue With Facebook
            </Button>
          </>
        )}
        {parentObj && <ParentDashboard parentObj={parentObj} parentImage = {parentImage} />}
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
