import * as React from 'react';
import { useEffect } from 'react';
import Fade from '@mui/material/Fade';
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import {ModuleList} from '../../assets/moduleList/AllMissionChapterList'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import LearningConversation from '../ChatInterface/ShowLearningConversationWithAnimation';
import { CardActionArea } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { GetSetLearnerDataThroughAPI } from '../../actions/LearnerMissionProgressRequestHandler';
import Image from 'next/image'

export const ChapterState = {
  AvailableLater: 0, 
  Available: 1, 
  InProgress:2,
  Completed:3

}

export  const LinearProgressWithLabel = React.forwardRef((props, ref) =>{

  const {completed,total} = props;
  const progress = (completed/total) * 100;
  const compeletedString = `${completed} of ${total}`;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', pt:2}}>
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
  const {module,onLessonClicked,progress} = props;
  const {name,fileName, image, description,id} = module;

  const onClick = () => {
    onLessonClicked(module);
  };

  function returnChipColor (ms)
  {
    switch (ms)
    {
      case ChapterState.AvailableLater:
        return "warning";

      case ChapterState.Available:
        return "primary";

      case ChapterState.InProgress:
        return "secondary";

      case ChapterState.Completed:
          return "success";
    }
  }

  function returnChipLabel (ms)
  {
    //console.log ("Value of ms is",ms);

    switch (ms)
    {
      case ChapterState.AvailableLater:
        return "Available Later";

      case ChapterState.Available:
        return "Available";

      case ChapterState.InProgress:
        return "In Progress";

      case ChapterState.Completed:
        return "Completed";
    }
  }



  return (
    <Card sx={{ width: 200, height: 310,margin: 2}}>
      <CardActionArea onClick = {onClick}>

      <Image alt = {name} src = {`/lessonImages/${image}`}  width={200} height={150}></Image>
      
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      </CardActionArea>

        <Button size="small" onClick= {onClick}>Start</Button>
        {<Chip label={returnChipLabel(progress)} color={returnChipColor(progress)} variant="outlined" sx={{ margin: 1 }}/>}

    </Card>
  );
}



function AllModuleList (props) {
  const messagesEndRef = React.useRef(null);
  var categoryMissionMap;

  const {onLessonClicked, showInitialDashboard, moduleList, chapterProgress} = props;
  const backToModulesClicked = (props) => {
    showInitialDashboard();
  }

  useEffect(() => {
    //console.log ("Chapter progress is", chapterProgress);
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block:"end" })
  }, []);

  function distributChaptersInCategories ()
  {
    categoryMissionMap = new Map();
    categoryMissionMap.set ("InProgress", []);
    categoryMissionMap.set ("Completed", []);
    categoryMissionMap.set ("AvailableLater", []);
    for (var i = 0; i < moduleList.length; ++i)
    {
      //Iterate over all the missions
      var module = moduleList[i];

      switch (chapterProgress[module.id])
      {
  
        case ChapterState.AvailableLater:
          categoryMissionMap.get("AvailableLater").push(module);
          break;
        case ChapterState.Available:
        case ChapterState.InProgress:
          categoryMissionMap.get("InProgress").push(module);
          break;
        case ChapterState.Completed:
          categoryMissionMap.get("Completed").push(module);
          break;
      }
    }
  }
  distributChaptersInCategories();
  useEffect(() => {
    //distributChaptersInCategories();
    //console.log ("Distributed chapters are",categoryMissionMap );
      
  }, []);

  return (
    <React.Fragment>
       <Button variant="outlined" ref = {messagesEndRef} onClick = {backToModulesClicked} startIcon={<ArrowBackIcon />}>Learning Home</Button>
    <LinearProgressWithLabel completed={0} total={13}/>
    <Fade in={true} timeout = {1000}>

        <Grid container spacing={0}  alignItems= "center" justifyContent="left">
        {
            ["InProgress","Completed","AvailableLater"].map ((category => {
              //console.log ("Categories are",category, "category mission map is ", categoryMissionMap.get(category).length);
              if (categoryMissionMap && categoryMissionMap.has(category) && categoryMissionMap.get(category).length> 0)
              {
                return (
                  <React.Fragment key={category}>
                  <Grid item xs={12} md={12} lg={12} sx ={{mt:2}} >
                      <Typography gutterBottom variant="h5" component="div">
                        {category}
                      </Typography>
                   </Grid>
                
                   { categoryMissionMap.get(category).map(chapter => {
                      //console.log ("Chapter is ", chapter);
                        return <ModuleCard key={chapter.id} progress = {chapterProgress[chapter.id]} module={chapter} onLessonClicked = {onLessonClicked} />
                    })}
                  </React.Fragment>
                )
              }
            }))
        }  
        </Grid> 
    </Fade>
    </React.Fragment>

  );
}


const ModuleListDisplay = ({showInitialDashboard, clickedMission,learnerId, onChapterClicked}) => {

  const [chapterProgress, setChapterProgress] = React.useState(null);
  
  function onLessonClicked (lessonName,fileName,id)  {
    //console.log ("Lesson clicked is", setChapterProgress );

    setChapterProgress((chapterProgress) => {chapterProgress[clickedMission.id - 1][id] = 1; return [...chapterProgress]} );
    var reqType = "UPDATECHAPTERPROGRESS";
    var _id = learnerId;
    var data = chapterProgress;
    var reqObj = {reqType,_id,data};
    GetSetLearnerDataThroughAPI(reqObj).then (
      (resp => {
        //console.log ("resp is", resp, );
        setChapterProgress(resp.chapterProgress);
        //console.log ("Chapter progress xxxxx", chapterProgress, resp.chapterProgress[clickedMission.id]);
      }));
    
    (async function () {
      const response = await require(`../../assets/lessons/${fileName}`);
      //console.log ("hereerere",response.LessonText);
      setLessonText(response.LessonText);
      setLessonInProgress(true);
    })()
    
  };

  var moduleList = clickedMission.moduleList;

  const backToModulesClicked = (props) => {
    setLessonInProgress(false);
  }

  const lessonEndReached = (props) => {
    setLessonInProgress(false);
  }
  

  useEffect(() => {
    var reqType = "GETCHAPTERPROGRESS";
    var _id = learnerId;
    var reqObj = {reqType,_id};
    GetSetLearnerDataThroughAPI(reqObj).then (
      (resp => {
        //console.log ("resp is", resp, );
        setChapterProgress(resp.chapterProgress);
        //console.log ("Chapter progress xxxxx", chapterProgress, resp.chapterProgress[clickedMission.id]);
      }))
      
  }, []);

     // if (!lessonInProgress)
        return (  
          <Grid container spacing={0}  alignItems= "center" justifyContent="left">   
            <Grid item xs={12} md={12} lg={12}>
              {/*<Button variant="outlined" startIcon={<ArrowBackIcon />}>Mission Modules</Button>*/}
            </Grid>
            <Grid item xs={12} md={12} lg={12}>   
              {chapterProgress && <AllModuleList chapterProgress = {chapterProgress[clickedMission.id]} onLessonClicked={onChapterClicked } moduleList = {moduleList} showInitialDashboard={showInitialDashboard}/> }
            </Grid>
          </Grid>         
        );
    /*  else
        return (
          <Grid container spacing={0}  alignItems= "center" justifyContent="left" sx={{ display: 'flex', flexDirection:'column' }}>   
          <Grid item xs={12} md={12} lg={12}>
            <Button variant="outlined" onClick = {backToModulesClicked} startIcon={<ArrowBackIcon />}>Mission Modules</Button>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>   
            <LearningConversation LessonText={lessonText} OnLessonEnd = {lessonEndReached} onEventAck={onLearnerEvent}/>
          </Grid>
        </Grid>  
          
        ); */     
}

export default ModuleListDisplay;