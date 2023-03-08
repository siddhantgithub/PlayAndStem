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

export  const LinearProgressWithLabel = React.forwardRef((props, ref) =>{

  const {completed,total} = props;
  const progress = (completed/total) * 100;
  const compeletedString = `${completed} of ${total}`;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
       <Typography variant="body2" color="text.secondary">Progress</Typography>
      <Box sx={{ width: '80%', m: 1 }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{compeletedString}</Typography>
      </Box>
    </Box>
  );
})

function ModuleCard(props) {
  const {name,fileName, imageName, onLessonClicked,description} = props;

  const onClick = () => {
    onLessonClicked(name,fileName);
  };

  return (
    <Card sx={{ width: 300, height: 400,margin: 2}}>
      <CardActionArea onClick = {onClick}>
      <CardMedia
        sx={{ height: 200 }}
          image={`/lessonImages/${imageName}`}
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



function AllModuleList (props) {

  const {onLessonClicked} = props;
  return (
    <React.Fragment>
    <LinearProgressWithLabel completed={0} total={13}/>
    <Fade in={true} timeout = {1000}>

        <Grid container spacing={0}  alignItems= "center" justifyContent="left">
            <Grid item xs={12} md={11} lg={12} justifyContent="center">
            </Grid>
            {
              ModuleList.map((module) => {
                return <ModuleCard name={module.name} fileName={module.fileName} imageName={module.image} onLessonClicked = {onLessonClicked} description = {module.description}/>
              })
            }
            
            <Grid item xs={12} md={11} lg={5}>    
            </Grid>
        </Grid> 
    </Fade>
    </React.Fragment>

  );
}


const ModuleListDisplay = (props) => {

  const onLessonClicked = (lessonName,fileName) => {
    console.log ("Lesson clicked is", lessonName, fileName );
    
    (async function () {
      const response = await require(`../../assets/lessons/MicroBitIntroductionCourse/${fileName}`);
      console.log ("hereerere",response.LessonText);
      setLessonText(response.LessonText);
      setLessonInProgress(true);

    })()
    
  };

  const backToModulesClicked = (props) => {
    setLessonInProgress(false);
  }

  const lessonEndReached = (props) => {
    setLessonInProgress(false);
  }
  

    useEffect(() => {
        
      }, []);

      const [lessonInProgress,setLessonInProgress] = React.useState(false);
      const [lessonText,setLessonText] = React.useState([]);

      if (!lessonInProgress)
        return (  
          <Grid container spacing={0}  alignItems= "center" justifyContent="left">   
            <Grid item xs={12} md={12} lg={12}>
              {/*<Button variant="outlined" startIcon={<ArrowBackIcon />}>Mission Modules</Button>*/}
            </Grid>
            <Grid item xs={12} md={12} lg={12}>   
              <AllModuleList onLessonClicked={onLessonClicked}/> 
            </Grid>
          </Grid>         
        );
      else
        return (
          <Grid container spacing={0}  alignItems= "center" justifyContent="left" sx={{ display: 'flex', flexDirection:'column' }}>   
          <Grid item xs={12} md={12} lg={12}>
            <Button variant="outlined" onClick = {backToModulesClicked} startIcon={<ArrowBackIcon />}>Mission Modules</Button>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>   
            <LearningConversation LessonText={lessonText} OnLessonEnd = {lessonEndReached}/>
          </Grid>
        </Grid>  
          
        );      
}

export default ModuleListDisplay;