import * as React from 'react';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
//import Grid from '@mui/material/Grid';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm, Controller } from "react-hook-form";
import Router from 'next/router';
import Copyright from '../Copyright'
import Paper from '@mui/material/Paper'
import ChatBotImage from '../../public/chatbot.png'
import Image from 'next/image'
import { deepOrange, deepPurple } from '@mui/material/colors';
import Fade from '@mui/material/Fade';
import DoneIcon from '@mui/icons-material/Done';
import dynamic from 'next/dynamic'
import groovyWalkAnimation from "../../assets/lottie-animations/main-buddy.json";
import Typewriter from 'typewriter-effect';

const PythonEditor = dynamic(
  () => import("../ace-editor/PythonEditor"),
  { ssr: false }
)

function TypewriterText ({initFunction}) 
{
    return (
    <React.Fragment>
        <Typography gutterBottom variant="heading6" component="div" >
            <Typewriter options={{
            delay: 30,
            }}
        onInit={initFunction}/>
        </Typography>
    </React.Fragment>

    );
}

export  function TopScreenComponent (props) {
    const {learnersname} = props;
    return (
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p:2,
        }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Welcome {learnersname}
            </Typography>
        </Box>
    );
}

export function PythonCodeComponent (props) {
    const {value,onChange} = props;
    return (

    <Fade in={true} timeout = {1000}>
    <Grid container spacing={0} sx={{alignItems: 'center'} }>
        <Grid item xs={12} md={1} lg={1} sx={{maxHeight:"40px"} } >
        </Grid>
        <Grid item xs={12} md={11} lg={11}>
            <Paper
                            sx={{
                                p: 2,
                                mt:2,
                                mr:2,
                                display: 'flex',
                                flexDirection: 'column',
                            } } elevation = {5}
                            >
                 <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mb:2,
                    }}>
                        Please Type Code Below     
                 </Box>          
                <PythonEditor onChange = {onChange} value={value}/>   
            </Paper>
        </Grid>
    </Grid> 
    </Fade>
    );
}

export function PythonCodeComponentWithDialogInSide (props) {
    const {value,onChange} = props;
    return (

    <Fade in={true} timeout = {1000}>
    <Grid container spacing={0} sx={{alignItems: 'center'} }>
        <Grid item xs={12} md={1} lg={1} sx={{maxHeight:"40px"} } >
        </Grid>
        <Grid item xs={12} md={11} lg={11}>
            <Paper
                            sx={{
                                p: 2,
                                mt:2,
                                mr:2,
                                display: 'flex',
                                flexDirection: 'column',
                            } } elevation = {5}
                            >
                 <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb:2,
        }}>Please Type Code Below     </Box>          
                <PythonEditor onChange = {onChange} value={value}/>   
            </Paper>
        </Grid>
    </Grid> 
    </Fade>
    );
}



export  function ChatBotMessage (props) {

    const {message} = props;
    return (
        <Fade in={true} timeout = {1000}>
        <Grid container spacing={0} sx={{alignItems: 'center'} }>
            <Grid item xs={12} md={11} lg={11}>
                <Paper
                                sx={{
                                    p: 2,
                                    mt:2,
                                    mr:2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                } } elevation = {5}
                                >

                    <Typewriter
                    options={{
                        delay: 30,
                        cursor:""
                    }}
                    onInit={(typewriter) => {
                        typewriter.typeString(message)
                          .stop()
                          .start();
                      }}
                    />
                </Paper>
            </Grid>
        </Grid> 
        </Fade>
    );
}

export  function LearnerMessage (props) {

    const {message} = props;
    return (
        <Fade in={true} timeout = {1000}>
        <Grid container spacing={0} sx={{alignItems: 'center'} }>
            <Grid item xs={12} md={11} lg={11}>
                <Paper
                                sx={{
                                    p: 2,
                                    mt:2,
                                    mr: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                } } elevation = {5}
                                >

                    {message}
                </Paper>
            </Grid>
            <Grid item xs={12} md={1} lg={1} sx={{maxWidth:"40px"} } >
                <Avatar sx={{ bgcolor: deepOrange[500] }}>D</Avatar>
            </Grid>

        </Grid> 
        </Fade>
    );
}

export  const OptionsWithButtons = React.forwardRef((props, ref) =>{

    const {options} = props;
    var key = 0;

    return (  
        <Grid container spacing={0} sx={{alignItems: 'center'} }>    
            <Divider sx={{ mt: 3, mb: 2 }}>
                <Typography variant= "body3"> Provide your response</Typography>
            </Divider>  
             <Grid item xs={12} md={11} lg={11}>
                    <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    } } elevation = {5}
                                    >
                    
                    {
                        options.map((option) => {                 
                            return(
                                <Fade in={true} timeout = {1000} key = {key++}>
                                <Button variant="outlined" onClick={option.onClick} sx={{textTransform: "none"}}>{option.text}</Button>
                                </Fade>
                            )
                        })
                    }
                    </Paper>
                </Grid>
            </Grid>
   );
})

export  const LongOptionsWithButtons = React.forwardRef((props, ref) =>{

    const {options} = props;
    var key = 0;

    return (
        <Box ref={ref}>
            <Grid container  sx={{alignItems: 'center'} }>    
               
                
                    {
                    options.map((option) => {                 
                        return(
                            <Fade in={true} timeout = {1000}  >
                                 <Grid item xs={11} md={11} lg={11}>
                                <Button variant="outlined" onClick={option.onClick} sx={{mt:2, textTransform: "none"}}>{option.text}</Button>
                                </Grid>
                            </Fade>                
                    );
                    })}
    
            </Grid>
        </Box>
    );
})

export function AcknowledgementQuestion (props)
{
    const {message,onClick} = props;
    return (
            <Grid container  sx={{alignItems: 'center', pt:2} }>    
                <Grid item xs={11} md={11} lg={11}>
                    
                        <Fade in={true} timeout = {1000}>
                            <Box sx={{ justifyContent: 'left', width:1, display: 'flex' }}>
                                <Button variant="contained" startIcon={<DoneIcon />} onClick = {onClick}>
                                    Next
                            </Button>
                            </Box>
                        </Fade>
                </Grid>
            </Grid>
    );
}