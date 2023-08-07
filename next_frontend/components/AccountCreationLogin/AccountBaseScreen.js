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
import LoginIcon from '@mui/icons-material/Login';
//import { url } from 'inspector';
//import { backgroundImage } from '../ui_assets/images/UIThemes/colorThemes';

export default function AccountBaseScreen(props) {

    const router = useRouter();
    const {TitleText, ShowHomeButton, passedBackButtonClicked=null, showLoginButton=false} = props;

    const backgroundImageStyle = {
        backgroundImage: "url('/backgroundLight_try.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0% 0%",
        backgroundSize: "cover"
      };

    function onBackButtonClicked (evt)
    {
        if (passedBackButtonClicked)
        {
            passedBackButtonClicked(evt);
            return;
        }
        router.push("/");
    }

    React.useEffect(() => {
        document.body.classList.add("account-theme");
      //document.body.style.background  = "url('/backgroundLight_try.jpg') no-repeat 100% center"

        //for( var i in backgroundImageStyle){
          //  document.body.style[i] = backgroundImageStyle[i];
         //}
      return () => { document.body.classList.remove("account-theme"); };

    }, []);

    
    function loginButtonClicked (evt)
    {
      router.push ("/CombinedLoginScreen")
    }

  return (
      <Container component="main" maxWidth="sm" >
        
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: "white",
            p:5,
            mb: 5,
            borderRadius: 1,
            opacity: 0.9    
          }}
        >
            {showLoginButton && <Button onClick={loginButtonClicked} startIcon={<LoginIcon/>} color="success" size="small" variant="outlined" sx={{ mb: 3, ml:50, mt:-2, justifyContent:"flex-start" }} >
                Login
            </Button>}
        {ShowHomeButton && <Button startIcon={<ArrowBackIcon />} sx={{ mb: 3, ml:-55, mt:0, justifyContent:"flex-start" }} onClick={onBackButtonClicked}>
            Home
          </Button>}

            <Typography component="h1" variant="h5" align="center" sx={{mb:3}}>
                {TitleText}
            </Typography>

        <Image
            src="/Storybotics.png"
            width={497}
            height={136}
            alt="Company Logo"
        />
          
          {props.children}
          <Copyright sx={{ mt: 8 }} />
        </Box>

        

      </Container>
 );
}
