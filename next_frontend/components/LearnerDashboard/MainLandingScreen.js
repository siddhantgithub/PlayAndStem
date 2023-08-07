import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SupportAgentIcon from '@mui/icons-material/Person';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../Copyright';
import MuiAlert from '@mui/material/Alert';
import { useRouter } from 'next/router'
import Image from 'next/image'
import { CreateGuestLearnerAccount } from '../../utils/CommonFunctions';
import { topicColors } from '../../ui_assets/images/UIThemes/colorThemes';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountBaseScreen from '../AccountCreationLogin/AccountBaseScreen';
//import { url } from 'inspector';
//import { backgroundImage } from '../ui_assets/images/UIThemes/colorThemes';

export default function MainLandingScreen({}) {

    const router = useRouter();

    const backgroundImageStyle = {
      backgroundImage: "url('/backgroundImages/4.png')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "0% 0%",
      backgroundSize: "cover"

    };


    function backButtonClicked (evt)
    {
      router.push("/")
    }

    return (
      <AccountBaseScreen TitleText={"Welcome to"} ShowHomeButton={false} showLoginButton={true}>
        <Typography component="h1" variant="body1" sx = {{ mb:5, mt:5}}>
            Choose An Option Below To Start Having Fun
        </Typography>
        <Box sx={{ mt: 0, flexDirection: 'column'}} display={"flex"}>
          <Button variant="contained" sx={{ mb: 3, flexDirection: 'row', width:"300px" }} onClick = {()=> {CreateGuestLearnerAccount();}}>Try As A Guest</Button> 
          <Button variant="contained" sx={{ mb: 3, flexDirection: 'row' , width:"300px"}} onClick = {()=> {router.push("/LearnerSignUpFlow")}}>Join As A Learner</Button>
          <Button variant="contained" sx={{  flexDirection: 'row' , width:"300px"}} onClick = {()=> {router.push("/ParentSignUp")}}>Join As A Parent</Button>        
        </Box>
      </AccountBaseScreen>
    );

  return (
      <Container component="main" maxWidth="sm" >
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: "#FFCF71",
            pb:4, pt:8,
            borderRadius: 1,
            opacity: 0.80
          }}
        >

          <Box sx = {{ mb:3,  backgroundColor: "#542E0F"}} width="500px" >

            <Typography component="h1" variant="h5" align="center" color={"white"}>
              StoryBotics
            </Typography>

          </Box>


        <Image
            src="/PlayAndStemLogo.png"
            width={75}
            height={75}
            alt="Company Logo"
        />
          
          <Typography component="h1" variant="h6" sx = {{ mb:3, mt:3}}>
            Choose An Option Below To Start Having Fun
          </Typography>
          <Box sx={{ mt: 0, flexDirection: 'column'}} display={"flex"}>
            <Button variant="contained" sx={{ mb: 3, flexDirection: 'row', width:"300px" }} onClick = {()=> {CreateGuestLearnerAccount();}}>Try As A Guest</Button> 
            <Button variant="contained" sx={{ mb: 3, flexDirection: 'row' , width:"300px"}} onClick = {()=> {router.push("/LearnerLogin")}}>Login As A Learner</Button>   
            <Button variant="contained" sx={{ mb: 3, flexDirection: 'row' , width:"300px"}} onClick = {()=> {router.push("/AccountLandingScreen")}}>Create A Learner Account</Button>
            <Button variant="contained" sx={{ mb: 3, flexDirection: 'row' , width:"300px"}} onClick = {()=> {router.push("/ParentSignIn")}}>Login/Join As A Parent</Button>         
          </Box>
          <Copyright sx={{ mt: 1 }} />
        </Box>

      </Container>
 );
}
