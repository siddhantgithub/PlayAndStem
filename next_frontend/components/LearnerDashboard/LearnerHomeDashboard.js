import * as React from 'react';
import { useEffect } from 'react';
import Fade from '@mui/material/Fade';
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import {AllMissionList} from '../../assets/moduleList/AllMissionChapterList'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import LearningConversation from '../ChatInterface/ShowLearningConversationWithAnimation';
import Paper from '@mui/material/Paper';
import { CardActionArea } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import ShowAssessment from './ShowAssessment';
import ModuleListDisplay from './DisplayChaptersWithinMission'
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/lottie-animations/main-buddy.json";
import Typewriter from 'typewriter-effect';
import TopChatBotComponent from './TopChatBotComponent';
import DisplayMissionsInCategories from './DisplayMissionInCategories';
import ScrollTop from '../ScrollTop';

//This file shows the right-side of the complete Learner Dashboard
//It comprises of mainly two components - Top chat component and missions distributed across categories

function ShowInitialDashboard ({onMissionClicked})
{
    return (
    <Fade in={true} timeout = {1000}>
        <Grid container spacing={0}  alignItems= "center" justifyContent="left">
        <Grid item xs={12} md={12} lg={12} sx={{ minHeight: 400 }}>   
            <TopChatBotComponent/> 
        </Grid>
          <DisplayMissionsInCategories onMissionClicked={onMissionClicked}/>
        </Grid> 
    </Fade>
    );
}
export function HomeDashboard ({signedInLearner})
{
    const [showAssessment, setShowAssesment] = React.useState(false);
    const [showMission, setShowMission] = React.useState(false);
    const [assessmentArray, setAssessmentArray] = React.useState([]);
    const [moduleList, setModuleList] = React.useState([]);

    function onAssessmentEnd (evt)
    {
        console.log ("assessment has ended");
    }

    function onMissionClicked (moduleList)
    {
      console.log ("Module list is", moduleList)
      setModuleList(moduleList);
      setShowAssesment(false);
      setShowMission(true);
      
    }

    function showInitialDashboard (evt)
    {
        setShowAssesment(false);
        setShowMission (false);

    }

    function assessmentClicked (evt)
    {
        
        console.log ("Assessment clicked");
        (async function () {
            const response = await require(`../../assets/SpringBreakAssessment/AssessmentQuiz`);
            setAssessmentArray(response.AssessmentArray);
            setShowAssesment(true);
          })()
    }
    function zacobiaMissionClicked (evt)
    {
        
        console.log ("Assessment clicked");
        (async function () {
            //const response = await require(`../../assets/SpringBreakAssessment/AssessmentQuiz`);
            //console.log ("hereerere",response.AssessmentArray);
            //setAssessmentArray(response.AssessmentArray);
            setShowAssesment(false);
            setShowZacobiaMission(true);
          })()
    }


    return (
      <Box>
          
        {!showAssessment && !showMission && <ShowInitialDashboard assessmentClicked={assessmentClicked} onMissionClicked={onMissionClicked}/>}
        {showAssessment && <ShowAssessment/>}
        {showMission && <ModuleListDisplay showInitialDashboard={showInitialDashboard} moduleList = {moduleList}/>}
      </Box>

        
    );

}