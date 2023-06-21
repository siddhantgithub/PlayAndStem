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
          <Avatar sx={{ m: 3, bgcolor: 'secondary.main' }}>
            <SupportAgentIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            I am a
          </Typography>
          <Box  sx={{ mt: 3, flexDirection: 'row' }}>
            <Button variant="contained" sx={{ m: 3, flexDirection: 'row' }} onClick = {()=> {router.push("/ParentLandingScreen")}}>Parent</Button>
            <Button variant="contained">Learner</Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
 );
}
