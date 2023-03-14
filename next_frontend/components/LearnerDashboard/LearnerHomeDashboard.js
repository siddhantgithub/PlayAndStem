import * as React from 'react';
import { useEffect } from 'react';
import Fade from '@mui/material/Fade';
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import {ModuleList} from '../../assets/moduleList/ModuleList'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import LearningConversation from './ShowLearningConversation';
import { CardActionArea } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import ShowAssessment from './ShowAssessment';
import ModuleListDisplay from './DisplayLearningModules'


function AssessmentCard({onClick}) {
    //const {name,fileName, imageName, onLessonClicked,description} = props;
    const name = "Spring Break Initial Assessment";
    const description = "Please take this initial assessment at the start of Spring Break";
    //const description = "Please take this initial assessment at the start of Spring Break";
  
    return (
      <Card sx={{ width: 300, height: 400,margin: 2}}>
        <CardActionArea onClick = {onClick}>
        <CardMedia
          sx={{ height: 200 }}
            image={`/assessment.png`}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" onClick= {onClick}>Start</Button>
          <Chip label="Completed" color="success" variant="outlined" sx={{ margin: 1 }}/>
        </CardActions>
  
      </Card>
    );
  }

  function ZacobiaMissionCard({onClick}) {
    //const {name,fileName, imageName, onLessonClicked,description} = props;
    const name = "Mission: Save Planet Zacobia";
    const description = "We save planet Zacobia and start learning Python programming with Microbit";
    //const description = "Please take this initial assessment at the start of Spring Break";
  
    return (
      <Card sx={{ width: 300, height: 400,margin: 2}}>
        <CardActionArea onClick = {onClick}>
        <CardMedia
          sx={{ height: 200 }}
            image={`/zacobiamission.png`}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" onClick= {onClick}>Start</Button>
         {/* <Chip label="Completed" color="success" variant="outlined" sx={{ margin: 1 }}/>*/}
        </CardActions>
  
      </Card>
    );
  }

function ShowInitialDashboard ({assessmentClicked,zacobiaMissionClicked})
{
    return (
        <Fade in={true} timeout = {1000}>

        <Grid container spacing={0}  alignItems= "center" justifyContent="left">
            <Grid item xs={12} md={11} lg={12} justifyContent="center">
            </Grid>
            {/*<AssessmentCard onClick={assessmentClicked}/>*/}
            <ZacobiaMissionCard onClick={zacobiaMissionClicked}/>

            
            <Grid item xs={12} md={11} lg={5}>    
            </Grid>
        </Grid> 
    </Fade>

        
    );
}
export function HomeDashboard ()
{
    const [showAssessment, setShowAssesment] = React.useState(false);
    const [showZacobiaMission, setShowZacobiaMission] = React.useState(false);
    const [assessmentArray, setAssessmentArray] = React.useState([]);

    function onAssessmentEnd (evt)
    {
        console.log ("assessment has ended");


        
    }

    function showInitialDashboard (evt)
    {
        setShowAssesment(false);
        setShowZacobiaMission (false);

    }

    function assessmentClicked (evt)
    {
        
        console.log ("Assessment clicked");
        (async function () {
            const response = await require(`../../assets/SpringBreakAssessment/AssessmentQuiz`);
            console.log ("hereerere",response.AssessmentArray);
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
        {!showAssessment && !showZacobiaMission && <ShowInitialDashboard assessmentClicked={assessmentClicked} zacobiaMissionClicked={zacobiaMissionClicked}/>}
        {showAssessment && <ShowAssessment/>}
        {showZacobiaMission && <ModuleListDisplay showInitialDashboard={showInitialDashboard}/>}
      </Box>

        
    );

}