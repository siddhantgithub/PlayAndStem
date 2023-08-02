import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SupportAgentIcon from '@mui/icons-material/Person';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright'
import MuiAlert from '@mui/material/Alert';
import { useRouter } from 'next/router'
import Image from 'next/image'
//import { url } from 'inspector';
//import { backgroundImage } from '../ui_assets/images/UIThemes/colorThemes';

export default function LandingPage({}) {

    const router = useRouter();

    const backgroundImageStyle = {
      backgroundImage: "url('/backgroundImages/4.png')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "0% 0%",
      backgroundSize: "cover"

    };

    React.useEffect(() => {
      for( var i in backgroundImageStyle){
        document.body.style[i] = backgroundImageStyle[i];
    }
      //document.body.style = backgroundImageStyle;
      //document.body.style.backgroundImage = "url('/background_login.png')";

    }, []);

  return (
      <Container component="main" maxWidth="xs" >
        <Box
          sx={{
            marginTop: 18,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: "white",
            pb:10, pt:10,
            borderRadius: 1
          }}
        >
        <Image
                        src="/PlayAndStemLogo.png"
                        width={75}
                        height={75}
                        alt="Company Logo"
                />
          <Typography component="h1" variant="h5" sx = {{mt:3}}>
            I am a
          </Typography>
          <Box  sx={{ mt: 0, flexDirection: 'row' }}>
            <Button variant="contained" sx={{ m: 3, flexDirection: 'row' }} onClick = {()=> {router.push("/ParentSignIn")}}>Parent</Button>
            <Button variant="contained" sx={{ m: 3, flexDirection: 'row' }} onClick = {()=> {router.push("/LearnerLandingScreen")}}>Learner</Button>          
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Box>

      </Container>
 );
}
