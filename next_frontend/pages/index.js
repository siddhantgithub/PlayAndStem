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

export default function LandingPage({}) {

    const router = useRouter();

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 18,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: "200px"
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
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
 );
}
