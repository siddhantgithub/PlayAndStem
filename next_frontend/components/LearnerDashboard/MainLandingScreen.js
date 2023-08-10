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
import LoadingDialogBox from '../dialogBoxes/LoadingBox';
import { isScreenMobileSize } from '../../utils/CommonFunctions';
//import { url } from 'inspector';
//import { backgroundImage } from '../ui_assets/images/UIThemes/colorThemes';

export default function MainLandingScreen({openLoadingDialogBox}) {

    const router = useRouter();
    const [loadingDialogOpen, setLoadingDialogOpen] = React.useState(false);
    const [dialogMessage, setDialogMessage] = React.useState ("");
    const [showLoadingSymbol, setShowLoadingSymbol] = React.useState (true);
    const acceptedForSmallScreen = React.useRef(false);

    const backgroundImageStyle = {
      backgroundImage: "url('/backgroundImages/4.png')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "0% 0%",
      backgroundSize: "cover"

    };

    const isScreenMobile = isScreenMobileSize();

    function acceptedForSmallScreenClicked ()
    {
      acceptedForSmallScreen.current = true;
      setDialogMessage("Creating A Guest Account");
    }

/*     if (isScreenMobile)
    {
      setDialogMessage("StoryRobotics experience will be limited on a mobile device. For the best experience, please access using a Chrome browser on a desktop device")
      setLoadingDialogOpen(true);

    } */

    function onTryGuestAccountClicked ()
    {
      setDialogMessage("Creating A Guest Account")
      setLoadingDialogOpen(true);
      CreateGuestLearnerAccount();
    }

    return (
      <AccountBaseScreen TitleText={"Welcome to"} ShowHomeButton={false} showLoginButton={true}>
        {!acceptedForSmallScreen.current && isScreenMobile &&

          <LoadingDialogBox 
          open 
          loadingText = "StoryRobotics experience will be limited on a small-screen device. For the best experience, please access using a Chrome browser on a desktop device"
          showLoadingSymbol = {false}
          onClose = {() => setLoadingDialogOpen(false)}
          showOkButton = {true}
          okButtonText = {"Continue Anyway"}
          onOkButtonClicked= {acceptedForSmallScreenClicked}
          />
          
        }
         <LoadingDialogBox 
            open = {loadingDialogOpen}
            loadingText = {dialogMessage}
            showLoadingSymbol = {showLoadingSymbol}
            onClose = {() => setLoadingDialogOpen(false)}
          />
        <Typography component="h1" variant="body1" sx = {{ mb:5, mt:5}}>
            Choose An Option Below To Start Having Fun
        </Typography>
        <Box sx={{ mt: 0, flexDirection: 'column'}} display={"flex"}>
          <Button variant="contained" sx={{ mb: 3, flexDirection: 'row', width:"300px" }} onClick = {onTryGuestAccountClicked}>Try As A Guest</Button> 
          <Button variant="contained" sx={{ mb: 3, flexDirection: 'row' , width:"300px"}} onClick = {()=> {router.push("/LearnerSignUpFlow")}}>Join As A Learner</Button>
          <Button variant="contained" sx={{  flexDirection: 'row' , width:"300px"}} onClick = {()=> {router.push("/ParentSignUp")}}>Join As A Parent</Button>        
        </Box>
      </AccountBaseScreen>
    );
}
