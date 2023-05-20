import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { signIn, signOut, useSession } from "next-auth/react"
import TopChatBotComponent from "../../components/LearnerDashboard/TopChatBotComponent"
import DisplayMissionsInCategories from "../../components/LearnerDashboard/DisplayMissionInCategories"
import QuizAndScore from '../../components/LearnerDashboard/QuizAndScore';
import { LearnerScores } from '../../components/LearnerDashboard/LearnerScores';
import { LearnerConceptsLearned } from '../../components/LearnerDashboard/LearnerConceptsLearned';
import { AllModuleList, ChapterState } from '../../components/LearnerDashboard/DisplayChaptersWithinMission';
import {AllMissionList} from '../../assets/moduleList/AllMissionChapterList'
import { UpdateLearnerMissionProgress } from '../../actions/LearnerMissionProgressRequestHandler';
import { GetLearnerMissionProgress } from '../../actions/LearnerMissionProgressRequestHandler';
import MissionLockedDialog from '../../components/dialogBoxes/MissionLockedDialog';
import { GetSetLearnerDataThroughAPI } from '../../actions/LearnerMissionProgressRequestHandler';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LearningConversation from '../../components/ChatInterface/ShowLearningConversationWithAnimation';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AllQuizList } from '../../assets/quizData/AllQuizList';
import { TopQuizGames } from '../../components/LearnerDashboard/TopQuizGames';
import { MissionWithFriends } from '../../components/LearnerDashboard/JoinMissionWithFriends';
import { deepPurple, deepOrange, cyan } from '@mui/material/colors';
import { AllKeyConceptList } from '../../assets/lessons/ZacobiaMission/keyConcepts/AllKeyConceptList';
import LearnerStore, {LearnerActivityState} from '../../store/LearnerStore';


const drawerWidth = 240;
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: '#AF2BBF',
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

function DashboardAppBar (props)
{
  const {signedUser} = props;
  const settings = [{text:'Logout',onClick:logoutClicked}];
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function logoutClicked()
  {
    signOut()

  }

  var learnerFullName = signedUser.firstname + " " + signedUser.lastname;
  //console.log ("Learner full name is",learnerFullName);
  return (
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {true && <AppBar component="nav">
          <Toolbar
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Welcome {signedUser.username}
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" {...stringAvatar(learnerFullName)} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.text} onClick={setting.onClick}>
                  <Typography textAlign="center">{setting.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
            {/*<IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>*/}
          </Toolbar>
        </AppBar>}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
          }}
        >
          <Toolbar/>
          <Container sx={{ pt:2, mt: 1, minHeight:800}}>
          {props.children}
          </Container>
        </Box>
      </Box>
  );
}

function ShowPostLoginContent({quizProgress, signedUser, onMissionClicked,onEventAck, learnerMissionProgress,callBackHandlers })
{
  //callBackHandlers = {[retryQuizClicked, viewAllQuizClicked, reviewConceptClicked, viewAllConceptsClicked]}
  const [open, setOpen] = React.useState(false);

  return (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={8} sx={{ minHeight: 400 }}> 
                <Paper
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: 350
                      }}
                    > 
                  <TopChatBotComponent onEventAck={onEventAck} learnerQuizProgress={quizProgress}/> 
                </Paper>
              </Grid>

             { <Grid item xs={12} md={4} lg={4} >
                <MissionWithFriends
                    products={[
                      {
                        id: '1',
                        image: '/zacobiamission.jpg',
                        name: 'Create a digital piano',
                        updatedAt: '2/3 places available'
                      },
                      {
                        id: '2',
                        image: '/nonummission.png',
                        name: 'Make a driving car',
                        updatedAt: '1/2 positions available'
                      },
                      {
                        id: '3',
                        image: '/missionImages/MissionSados.png',
                        name: 'Make a dancing robot',
                        updatedAt: 'Basic introduction to loops'
                      }
                    ]}
                    quizProgress={quizProgress}
                    sx={{ width: 360, height: 350 }}
                    retryQuizClicked={callBackHandlers[0]} 
                    viewAllQuizClicked={callBackHandlers[1]}
                />
              </Grid>}

              <Grid item xs={12} md={8} lg={8}>
                <Paper
                  sx={{
                    p: 1,
                    mt: -4,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <DisplayMissionsInCategories learnerMissionProgress={learnerMissionProgress} onMissionClicked={onMissionClicked}/>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={4}  sx={{
                    p: 1,
                    mt: -4,
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                <TopQuizGames  products={[
                      {
                        id: '1',
                        image: '/zacobiamission.jpg',
                        name: 'Remid Sharpner',
                        score: '12000',
                        color: deepOrange[500]
                      },
                      {
                        id: '2',
                        image: '/nonummission.png',
                        name: 'Travio Hoggards',
                        score: '8000',
                        color: deepPurple[500]
                      },
                      {
                        id: '3',
                        image: '/missionImages/MissionSados.png',
                        name: 'Agnes Molarity',
                        score: '7000',
                        color: cyan[500]
                      },
                      {
                        id: 'b393ce1b09c1254c3a92c827',
                        image: '/missionImages/MissionSados.png',
                        name: 'Clara Montana',
                        score: '6900',
                        color: cyan[500]
                      }
                    ]} sx={{ width: 360, height: 360 }} reviewConceptClicked={callBackHandlers[2]} viewAllConceptsClicked={callBackHandlers[3]}/>
              </Grid>
            </Grid>
  );
} 

function LearnerReviseConcepts ()
{
  return (
    <LearnerConceptsLearned
      products={[
        {
          id: '5ece2c077e39da27658aa8a9',
          image: '/zacobiamission.jpg',
          name: 'Statements & Syntax',
          updatedAt: 'Statements and syntax'
        },
        {
          id: '5ece2c0d16f70bff2cf86cd8',
          image: '/nonummission.png',
          name: 'Variables',
          updatedAt: 'Variables and how they are used'
        },
        {
          id: 'b393ce1b09c1254c3a92c827',
          image: '/missionImages/MissionSados.png',
          name: 'Loops',
          updatedAt: 'Basic introduction to loops'
        }
      ]}
      sx={{ width: 360, height: 362 }}
    />

  );
}

function ShowLearningConversationForAChapter({chapterText, chapterEndReached, onLearnerEvent,backToModulesClicked, learnerQuizProgress})
{
  console.log ("Show learner quiz progress", learnerQuizProgress);
  return (
    <Grid container spacing={0}  alignItems= "left" sx={{ display: 'flex', flexDirection:'column' }}>   
    <Grid item xs={12} md={12} lg={12}>
      <Button variant="outlined" onClick = {backToModulesClicked} startIcon={<ArrowBackIcon />}>Mission Modules</Button>
    </Grid>
    <Grid item xs={12} md={12} lg={12}>   
      <LearningConversation LessonText={chapterText} OnLessonEnd = {chapterEndReached} onEventAck={onLearnerEvent} learnerQuizProgress={learnerQuizProgress}/>
    </Grid>
  </Grid>  
  ); 
}

function ShowLearningConversationForAQuiz({chapterText, chapterEndReached, onLearnerEvent,showInitialDashboard, learnerQuizProgress})
{
  console.log ("Show learner quiz progress", learnerQuizProgress);
  return (
    <Grid container spacing={0}  alignItems= "left" sx={{ display: 'flex', flexDirection:'column' }}>   
    <Grid item xs={12} md={12} lg={12}>
      <Button variant="outlined" onClick = {showInitialDashboard} startIcon={<ArrowBackIcon />}>Dashboard</Button>
    </Grid>
    <Grid item xs={12} md={12} lg={12}>   
      <LearningConversation LessonText={chapterText} OnLessonEnd = {chapterEndReached} onEventAck={onLearnerEvent} learnerQuizProgress={learnerQuizProgress}/>
    </Grid>
  </Grid>  
  ); 
}

function ShowAllQuizScreen({showInitialDashboard,quizProgress,retryQuizClicked})
{
  return (
    <Grid container spacing={2}  alignItems= "left" sx={{ display: 'flex', flexDirection:'column' }}>   
    <Grid item xs={12} md={12} lg={12}>
      <Button variant="outlined" onClick = {showInitialDashboard} startIcon={<ArrowBackIcon />}>Dashboard</Button>
    </Grid>
    <Grid item xs={12} md={12} lg={12}>   
      <LearnerScores
            products={AllQuizList}
            quizProgress={quizProgress}
            sx={{ width: 360}}
            retryQuizClicked={retryQuizClicked} 
            hideViewAll
      />
    </Grid>
  </Grid>  
  ); 
}

function ShowAllConceptsScreen({showInitialDashboard,quizProgress,reviewConceptClicked})
{
  return (
    <Grid container spacing={2}  alignItems= "left" sx={{ display: 'flex', flexDirection:'column' }}>   
    <Grid item xs={12} md={12} lg={12}>
      <Button variant="outlined" onClick = {showInitialDashboard} startIcon={<ArrowBackIcon />}>Dashboard</Button>
    </Grid>
    <Grid item xs={12} md={12} lg={12}>   
      <LearnerConceptsLearned
            products={AllKeyConceptList}
            quizProgress={quizProgress}
            sx={{ width: 360}}
            reviewConceptClicked={reviewConceptClicked} 
            hideViewAll
      />
    </Grid>
  </Grid>  
  ); 
}

//Main component that shows or replaces the components based on the state
function DashboardContent(props) {

  const DashboardState = {
    UserDataLoading: 0,
    ShowInitialDashboard: 1,
    ChapterInprogress: 2,
    ShowRetryQuiz: 3,
    ShowAllQuiz: 4,
    ShowReviseConcepts: 5,
    ShowAllConcepts:6,
    ShowChaptersInMission:7,
    ChapterInprogress_New: 8
  };
  const { data: session, status } = useSession();
  const isUser = !!session && session.user;
  const loading = status === "loading"

  const [clickedMission, setClickedMission] = React.useState([]);
  const [learnerMissionProgress, setLearnerMissionProgress] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState (false);
  const [dialogText, setDialogText] = React.useState ("text not set");
  const [chapterProgress, setChapterProgress] = React.useState(null);
  const [quizProgress, setQuizProgress] = React.useState(null);
  const [chapterText, setChapterText] = React.useState(null);
  const [componentState, setComponentState] = React.useState(DashboardState.UserDataLoading);
  const [ currentChapter, setCurrentChapter] = React.useState(0);

  var updatedLearnerMissionProgress = React.useRef();



  const [currentActivityState,updateMissionProgress,updateChapterProgress,updateQuizProgress,updateCurrrentActivityState] = LearnerStore (
    (state) => [state.currentActivityState, state.updateMissionProgress,state.updateChapterProgress, state.updateQuizProgress, state.updateCurrrentActivityState]
  );

  //React useeffect for initial signing up the user
  React.useEffect(() => {
    //console.log ("Use effect called");
    if (loading) return // Do nothing while loading
    if (!isUser) signIn() // If not authenticated, force log in
    //console.log ("The value of session is", session);
    if (isUser)
    {
      console.log ("Getting all user progress");
      var reqType = "GETALLPROGRESS";
      var _id = session.user._id;
      var reqObj = {reqType,_id};
      GetSetLearnerDataThroughAPI(reqObj).then ((resp) => {
        setLearnerMissionProgress(resp.missionProgress);
        setChapterProgress(resp.chapterProgress);
        setQuizProgress(resp.quizProgress);
        updateMissionProgress(resp.missionProgress);
        updateChapterProgress(resp.chapterProgress);
        updateQuizProgress(resp.quizProgress);
        setComponentState(DashboardState.ShowInitialDashboard);
      });
    }
  }, [isUser, loading])

  //React useeffect for gettign chapter progress for all three missions
 /* React.useEffect(() => {
    if (!!session)
    {
    var reqType = "GETCHAPTERPROGRESS";
    var _id = session.user._id;
    var reqObj = {reqType,_id};
    GetSetLearnerDataThroughAPI(reqObj).then (
      (resp => {
        //console.log ("resp is", resp, );
        setChapterProgress(resp.chapterProgress);
        //console.log ("Chapter progress xxxxx", chapterProgress, resp.chapterProgress[clickedMission.id]);
      }))
    }
      
  }, [session]);*/

  //React useeffect for setting updated mission progress that can be used across renders
  React.useEffect (() => {
    updatedLearnerMissionProgress.current = learnerMissionProgress;
    //console.log ("Setting the value of updated mission progress here", learnerMissionProgress);
  }, [learnerMissionProgress])

    //React useeffect for changing the temporary state for showing chapter conversation
  React.useEffect (() => {
      //console.log ("here", componentState);
      if (componentState == DashboardState.ChapterInprogress_New)
        setComponentState(DashboardState.ChapterInprogress);
      //console.log ("Setting the value of updated mission progress here", learnerMissionProgress);
  }, [componentState])

  function retryQuizClicked (quizId)
  {
    //console.log ("Retry quiz clicked", quizId);
    setComponentState(DashboardState.ShowRetryQuiz);
    var chapterTextForQuiz = [{type:"quiz", id: quizId},{id:1, type: "endmessage"}];
    setChapterText(chapterTextForQuiz);
  }

  function viewAllQuizClicked ()
  {
    setComponentState(DashboardState.ShowAllQuiz);
  }

  function reviewConceptClicked(concept)
  {
    console.log ("Concept review clicked with id ", concept);
    (async function () {
      const response = await require(`../../assets/lessons/ZacobiaMission/keyConcepts/${concept.path}`);
      console.log ("hereerere",response.LessonText);
      setChapterText([...response.LessonText]);
    })()
    setComponentState(DashboardState.ShowReviseConcepts);
  }

  function viewAllConceptsClicked()
  {
    console.log ("View all concepts clicked");
    setComponentState(DashboardState.ShowAllConcepts);
  }

  function showInitialDashboard (evt)
  {
      //setShowMission (false);
      setComponentState(DashboardState.ShowInitialDashboard)
  }

  function showMissionDashboard (evt)
  {
      //setShowMission (false);
      setComponentState(DashboardState.ShowChaptersInMission)
  }

  //This function is called when a special action is needed on a learner event
  //For example, when user wants to load a mission from the conversation
  //Or change which missions are in progress and which are completed
  function onLearnerEvent (eventDetails)
  {
    console.log ("Got special click request. Data is ", eventDetails);
    switch (eventDetails.subtype)
    {
      case "loadmission":
        //console.log ("mission data is",AllMissionList[eventDetails.data]);
        onMissionClicked(AllMissionList[eventDetails.data]);
      break;

      case "changemissionstatus":
        changeMissionStatusForTheUser(eventDetails.data.missionid,eventDetails.data.newstatus)
        //changeMissionStatusForTheUser(eventDetails.data.missionid,eventDetails.data.newstatus).then((res) => {
         // console.log ("The response is",res);});
      break;

      case "loadnextchapter":
        console.log ("clicked mission is ",clickedMission, "current chapter is",currentChapter, "state", componentState );
        var nextChapter = clickedMission.moduleList[currentChapter.id + 1];
        onChapterClicked(nextChapter);
        break;

      case "loadchapter":
        console.log ("clicked mission is ",clickedMission, "current chapter is",currentChapter, "state", componentState );
        var nextChapter = clickedMission.moduleList[currentChapter.id];
        onChapterClicked(nextChapter);
        break;

      case "showmissiondashboard":
        onMissionClicked(clickedMission);
            //changeMissionStatusForTheUser(eventDetails.data.missionid,eventDetails.data.newstatus)
            //changeMissionStatusForTheUser(eventDetails.data.missionid,eventDetails.data.newstatus).then((res) => {
             // console.log ("The response is",res);});
        break;
    }
  }

  //This function changes the state of the mission progress of a learner
  //Currently called from TopChatbotComponent 
  function changeMissionStatusForTheUser (missionid, newstatus)
  {
    //learnerMissionProgress[missionid - 1] = newstatus;
    setLearnerMissionProgress((learnerMissionProgress) =>  {learnerMissionProgress[missionid] = newstatus; 
      var dataObj = {_id: session.user._id, missions:learnerMissionProgress}
      //console.log ("New learnermission progress is",learnerMissionProgress);
      UpdateLearnerMissionProgress(dataObj);
      return [...learnerMissionProgress]; });
   // var dataObj = {_id: session.user._id, missions:learnerMissionProgress}
   // console.log ("New learnermission progress is",learnerMissionProgress);
   // return UpdateLearnerMissionProgress(dataObj);
  }

  function onMissionClicked (mission)
  {
      //console.log ("Module list is", moduleList);  
      //console.log ("New learnermission progress is",learnerMissionProgress, updatedLearnerMissionProgress.current);
      if (updatedLearnerMissionProgress.current[mission.id] == "Not Available")
      {
        //return;
        setDialogOpen(true);
        if (mission.id == 0)
        {
          setDialogText("Please go through initial conversation first");
        }
        else
        {
          setDialogText("Please complete earlier missions first");
        }
        return;
      }

      setClickedMission(mission);
      setComponentState(DashboardState.ShowChaptersInMission);
      updateCurrrentActivityState({state:LearnerActivityState.MissionStarted, data:mission});
      //setShowMission(true);  
  }

  function handleDialogClose ()
  {
    setDialogOpen(false);
  }

  const backToModulesClicked = (props) => {
    setComponentState(DashboardState.ShowChaptersInMission);
   // setChapterInProgress(false);
  }

  const chapterEndReached = (props) => {
    
    if (chapterProgress[clickedMission.id][currentChapter.id] == ChapterState.Completed)
    //Means the chapter was already completed before so nothing to be done here
      return;

    updateCurrrentActivityState({state:LearnerActivityState.ChapterEnded, data:currentChapter});
    setChapterProgress((chapterProgress) => {
      chapterProgress[clickedMission.id][currentChapter.id] = ChapterState.Completed; 
      if (chapterProgress[clickedMission.id].length > currentChapter.id - 1 && chapterProgress[clickedMission.id][currentChapter.id + 1] != ChapterState.Completed)
        chapterProgress[clickedMission.id][currentChapter.id + 1] = ChapterState.InProgress;
      updateChapterProgressForLearner(chapterProgress); 
      return [...chapterProgress]
    });
    //setChapterInProgress(false);
    //setComponentState("showchaptersinmission");
  }

  const quizEnded = (props) => {
    //setComponentState("showchaptersinmission");
    //setChapterInProgress(false);
    //setComponentState("showchaptersinmission");
  }

  function updateChapterProgressForLearner (newChapterProgress)
  {
    var reqType = "UPDATECHAPTERPROGRESS";
      var _id = session.user._id;
      var data = newChapterProgress;
      var reqObj = {reqType,_id,data};
      GetSetLearnerDataThroughAPI(reqObj).then (
        (resp => {
          //console.log ("resp is", resp, );
          //setChapterProgress(resp.chapterProgress);
          //console.log ("Chapter progress xxxxx", chapterProgress, resp.chapterProgress[clickedMission.id]);
        }));
  }



  function onChapterClicked (chapter)  {
    //console.log ("Chapter clicked is", chapter );
    //console.log ("Chapter progressed is", chapterProgress);
    //console.log ("Clicked mission is", clickedMission);
    setCurrentChapter(chapter);
    updateCurrrentActivityState({state:LearnerActivityState.ChapterStarted, data:chapter.id});

    if (chapterProgress[clickedMission.id][chapter.id] == ChapterState.Available )
    {
      setChapterProgress((chapterProgress) => {
        chapterProgress[clickedMission.id][chapter.id] = ChapterState.InProgress; 
        updateChapterProgressForLearner(chapterProgress); 
        return [...chapterProgress]
      });
      
      if (learnerMissionProgress[clickedMission.id] == "Available")
        changeMissionStatusForTheUser(clickedMission.id,"In Progress");
    }
    
    (async function () {
      const response = await require(`../../assets/lessons/${chapter.fileName}`);
      //console.log ("hereerere",response.LessonText);
      setChapterText([...response.LessonText]);
      //setComponentState("chapterinprogress_new");
      setComponentState((componentState) =>  {if (componentState ==  DashboardState.ChapterInprogress)
                                           return DashboardState.ChapterInprogress_New;
                                         else return DashboardState.ChapterInprogress;})
                                           
      //setChapterInProgress(true);
    })() 
  };

  return (
    <React.Fragment>
      {!session && <Typography variant="h6" component="h2"> Please Login </Typography>}

      {session && <DashboardAppBar signedUser={session.user}>
            <MissionLockedDialog open={dialogOpen} dialogText = {dialogText} onClose={handleDialogClose}/>
            {
              (componentState == DashboardState.ShowInitialDashboard) && 
              <ShowPostLoginContent {...props} quizProgress={quizProgress} learnerMissionProgress = {learnerMissionProgress} 
                      callBackHandlers = {[retryQuizClicked, viewAllQuizClicked, reviewConceptClicked, viewAllConceptsClicked]} signedUser = {session.user} onMissionClicked={onMissionClicked} onEventAck={onLearnerEvent}/>
            }
            { 
              (componentState == DashboardState.ShowChaptersInMission) && 
              <AllModuleList retryQuizClicked = {retryQuizClicked} showInitialDashboard={showInitialDashboard} quizProgress = {quizProgress} 
              onLessonClicked = {onChapterClicked} moduleList = {clickedMission.moduleList} chapterProgress={chapterProgress[clickedMission.id]}
                      viewAllQuizClicked = {viewAllQuizClicked} learnerId = {session.user._id}
                      reviewConceptClicked = {reviewConceptClicked} viewAllConceptsClicked = {viewAllConceptsClicked} />  
            }
            { 
              (componentState == DashboardState.ChapterInprogress) && 
                <ShowLearningConversationForAChapter chapterText ={chapterText} chapterEndReached={chapterEndReached} onLearnerEvent={onLearnerEvent} backToModulesClicked={backToModulesClicked} learnerQuizProgress={quizProgress}/>
            }
            { 
              (componentState == DashboardState.ChapterInprogress_New) && 
                <ShowLearningConversationForAChapter chapterText ={chapterText} chapterEndReached={chapterEndReached} onLearnerEvent={onLearnerEvent} backToModulesClicked={backToModulesClicked} learnerQuizProgress={quizProgress}/>
            }
            { 
              (componentState == DashboardState.ShowRetryQuiz) && 
                <ShowLearningConversationForAQuiz chapterText ={chapterText} chapterEndReached={quizEnded} onLearnerEvent={onLearnerEvent} showInitialDashboard={showMissionDashboard} learnerQuizProgress={quizProgress}/>
            }
            { 
              (componentState == DashboardState.ShowAllQuiz) && 
                <ShowAllQuizScreen showInitialDashboard ={showMissionDashboard} quizProgress={quizProgress} retryQuizClicked={retryQuizClicked}/>
            }
            { 
              (componentState == DashboardState.ShowReviseConcepts) && 
              <ShowLearningConversationForAChapter chapterText ={chapterText} chapterEndReached={quizEnded} onLearnerEvent={onLearnerEvent} backToModulesClicked={backToModulesClicked} learnerQuizProgress={quizProgress}/>
            }
            { 
              (componentState == DashboardState.ShowAllConcepts) && 
                <ShowAllConceptsScreen showInitialDashboard ={showMissionDashboard} quizProgress={quizProgress} reviewConceptClicked={reviewConceptClicked}/>
            }           
      </DashboardAppBar>}
    </React.Fragment>
  );
}

export default function Dashboard() {
  return <DashboardContent/>;
}

//export default React.memo(DashboardContent)
