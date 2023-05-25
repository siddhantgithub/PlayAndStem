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
import Image from 'next/image';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { LearnerScores } from './LearnerScores';
import { AllQuizList } from '../../assets/quizData/AllQuizList';
import { AllKeyConceptList } from '../../assets/lessons/ZacobiaMission/keyConcepts/AllKeyConceptList';
import { MissionMessageDashboard } from './MissionMessageBoard';
import { LearnerConceptsLearned } from './LearnerConceptsLearned';

export const ChapterState = {
  AvailableLater: 0, 
  Available: 1, 
  InProgress:2,
  Completed:3
}

export const ViewState = {
  AvailableLater: 0, 
  Available: 2, //Represents both available and in-progress as both will be visible in the same tab 
  InProgress:2,
  Completed:3,
  All:4
}

export  const LinearProgressWithLabel = React.forwardRef((props, ref) =>{

  const {completed,total} = props;
  const progress = (completed/total) * 100;
  const compeletedString = `${completed} of ${total}`;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', pt:2}}>
       <Typography variant="body2" color="text.secondary">Progress</Typography>
      <Box sx={{ width: '87%', m: 1 }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{compeletedString}</Typography>
      </Box>
    </Box>
  );
})

export function ModuleCard(props) {
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
        return "info";

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

  function returnButtonText (ms)
  {
    //console.log ("Value of ms is",ms);

    switch (ms)
    {
      case ChapterState.AvailableLater:
        return "Available Later";

      case ChapterState.Available:
        return "Continue";

      case ChapterState.InProgress:
        return "Continue";

      case ChapterState.Completed:
        return "Revisit";
    }
  }

  if (progress != ChapterState.AvailableLater)
  return (
    <Card sx={{ width: 200, height: 310,margin: 2}}>

    <CardActionArea onClick = {progress != ChapterState.AvailableLater && onClick}>
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

      <Button size="small" onClick= {onClick} sx={{ margin: 1 }}>{returnButtonText(progress)}</Button>
        {<Chip label={returnChipLabel(progress)} color={returnChipColor(progress)} variant="outlined" sx={{ margin: 1 }}/>}
    </Card>
  );
  else
  return (
    <Card sx={{ width: 200, height: 310,margin: 2}}>


      <Image alt = {name} src = {`/lessonImages/${image}`}  width={200} height={150}></Image>
      
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
        {<Chip label={returnChipLabel(progress)} color={returnChipColor(progress)} variant="outlined" sx={{ margin: 1 }}/>}
    </Card>

  );

}

export function AllModuleList (props) {
  const messagesEndRef = React.useRef(null);
  var categoryMissionMapG = React.useRef(null);
  const [tabSelected, setTabSelected] = React.useState(ViewState.All);
  const [chapterCompleted, setChapterCompleted] = React.useState(null);

  const {onLessonClicked, showInitialDashboard, moduleList, chapterProgress, quizProgress,retryQuizClicked,viewAllQuizClicked,reviewConceptClicked,viewAllConceptsClicked } = props;
  const backToModulesClicked = (props) => {
    showInitialDashboard();
  }

  useEffect(() => {
    //console.log ("Chapter progress is", chapterProgress);
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block:"end" })
  }, []);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const handleChange = (event, newValue) => {
    setTabSelected(newValue);
  };

  function distributChaptersInCategories ()
  {
    var numChapterCompleted = 0;
    categoryMissionMapG.current = new Map();
    var categoryMissionMap = categoryMissionMapG.current;
    categoryMissionMap.set ("In Progress/Up Next", []);
    categoryMissionMap.set ("Completed", []);
    categoryMissionMap.set ("Available Later", []);
    categoryMissionMap.set ("Available", []);
    //console.log ("Module list is ", moduleList);
    for (var i = 0; i < moduleList.length; ++i)
    {
      //Iterate over all the missions
      var module = moduleList[i];

      switch (chapterProgress[module.id])
      {
  
        case ChapterState.AvailableLater:
          categoryMissionMap.get("Available Later").push(module);
          break;
        case ChapterState.Available:
          categoryMissionMap.get("Available").push(module);
          break;
        case ChapterState.InProgress:
          categoryMissionMap.get("In Progress/Up Next").push(module);
          break;
        case ChapterState.Completed:
          numChapterCompleted++;
          categoryMissionMap.get("Completed").push(module);
          break;
      }
    }
    setChapterCompleted(numChapterCompleted);
  }
  //distributChaptersInCategories();
  useEffect(() => {
    distributChaptersInCategories();
    //console.log ("Distributed chapters are",categoryMissionMap );
      
  }, [chapterProgress]);

  //Ideal view state should be
  //First should be visible, what is in-progress or up next
  //Second should be visible completed
  //Third Avalilable later
  return (
    <React.Fragment>
       <Button variant="outlined" ref = {messagesEndRef} onClick = {backToModulesClicked} startIcon={<ArrowBackIcon />}>Learning Home</Button>
       <LinearProgressWithLabel completed={chapterCompleted} total={chapterProgress.length}/>        
       <Fade in={true} timeout = {1000}>
    

        <Grid container spacing={0}  alignItems= "center" justifyContent="left">
        { quizProgress && <Grid item xs={12} md={4} lg={4} >
                <MissionMessageDashboard
                    chapterProgress= {chapterProgress} chapterlist = {moduleList} onLessonClicked = {onLessonClicked} 
                    quizProgress={quizProgress}  quizList = {AllQuizList} retryQuizClicked={retryQuizClicked}
                    sx={{ width: 360, height: 350, mt:2}}
                />
              </Grid>}
              { quizProgress && <Grid item xs={12} md={4} lg={4} >
                <LearnerScores
                    products={AllQuizList.slice(0,3)}
                    quizProgress={quizProgress}
                    sx={{ width: 360, height: 350, mt:2}}
                    retryQuizClicked={retryQuizClicked} 
                    viewAllQuizClicked={viewAllQuizClicked}
                />
              </Grid>}
              {<Grid item xs={12} md={4} lg={4} >
              <LearnerConceptsLearned
                products={AllKeyConceptList.slice(0,3)}
                reviewConceptClicked = {reviewConceptClicked}
                viewAllConceptsClicked = {viewAllConceptsClicked}
                sx={{ width: 360, height: 350, mt:2 }}
            />
              </Grid>}
          <Grid item xs={12} md={12} lg={12} sx ={{mt:2}} >
          <Tabs value={tabSelected} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="All" value = {ViewState.All} {...a11yProps(2)} />
            <Tab label="In Progress/Up Next" value = {ViewState.Available}  />
            <Tab label="Completed" value = {ViewState.Completed}  />
            <Tab label="Available Later" value = {ViewState.AvailableLater}  />      
          </Tabs>
          </Grid>
        {

          categoryMissionMapG.current && ["In Progress/Up Next","Completed", "Available", "Available Later"].map ((category => {
              var categoryMissionMap = categoryMissionMapG.current;
              //console.log ("Categories are",category, "category mission map is ", categoryMissionMap.get(category).length);
              if (categoryMissionMap && categoryMissionMap.has(category) && categoryMissionMap.get(category).length> 0)
              {
                return (
                  <React.Fragment key={category}>
                  {tabSelected == ViewState.All && categoryMissionMap.get(category).length > 0 && <Grid item xs={12} md={12} lg={12} sx ={{mt:2}} >
                      <Typography gutterBottom variant="h5" component="div">
                        {category}
                      </Typography>
                   </Grid>}
                
                   { categoryMissionMap.get(category).map(chapter => {
                      //console.log ("Chapter is ", chapter);
                        return (chapterProgress[chapter.id] == tabSelected || tabSelected == ViewState.All) && <ModuleCard key={chapter.id} progress = {chapterProgress[chapter.id]} module={chapter} onLessonClicked = {onLessonClicked} />
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


const ModuleListDisplay = ({viewAllQuizClicked, showInitialDashboard, clickedMission,learnerId, onChapterClicked, quizProgress,chapterProgress,retryQuizClicked}) => {

  //const [chapterProgress, setChapterProgress] = React.useState(null);

  
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


  

 /* useEffect(() => {
    var reqType = "GETCHAPTERPROGRESS";
    var _id = learnerId;
    var reqObj = {reqType,_id};
    GetSetLearnerDataThroughAPI(reqObj).then (
      (resp => {
        //console.log ("resp is", resp, );
        setChapterProgress(resp.chapterProgress);
        //console.log ("Chapter progress xxxxx", chapterProgress, resp.chapterProgress[clickedMission.id]);
      }))
      
  }, []);*/

    return (  
      <Grid container spacing={0}  alignItems= "center" justifyContent="left">   
        <Grid item xs={12} md={12} lg={12}>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>   
          {chapterProgress && <AllModuleList retryQuizClicked = {retryQuizClicked} quizProgress = {quizProgress} viewAllQuizClicked={viewAllQuizClicked}
                                chapterProgress = {chapterProgress[clickedMission.id]} onLessonClicked={onChapterClicked } moduleList = {moduleList} showInitialDashboard={showInitialDashboard}/> }
        </Grid>
      </Grid>         
    );    
}

export default ModuleListDisplay;