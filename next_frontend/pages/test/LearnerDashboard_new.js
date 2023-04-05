import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from '../../components/LearnerDashboard/listItems';
import {HomeDashboard} from '../../components/LearnerDashboard/LearnerHomeDashboard'
import { signIn, signOut, useSession } from "next-auth/react"
import TopChatBotComponent from "../../components/LearnerDashboard/TopChatBotComponent"
import DisplayMissionsInCategories from "../../components/LearnerDashboard/DisplayMissionInCategories"
import QuizAndScore from '../../components/LearnerDashboard/QuizAndScore';
import { LearnerScores } from '../../components/LearnerDashboard/LearnerScores';
import { LearnerConceptsLearned } from '../../components/LearnerDashboard/LearnerConceptsLearned';
import ModuleListDisplay from '../../components/LearnerDashboard/DisplayChaptersWithinMission';
import {AllMissionList} from '../../assets/moduleList/AllMissionChapterList'
import { UpdateLearnerMissionProgress } from '../../actions/LearnerMissionProgressRequestHandler';
import { GetLearnerMissionProgress } from '../../actions/LearnerMissionProgressRequestHandler';


const drawerWidth = 240;

function ShowPostLoginContent({signedUser, onMissionClicked,onEventAck, learnerMissionProgress })
{
  const [open, setOpen] = React.useState(false);

  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {false && <MuiAppBar position="absolute" open={open} >
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
            <Button variant="contained" onClick={()=>signOut()}>Log Out</Button>
            {/*<IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>*/}
          </Toolbar>
        </MuiAppBar>}
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
          <Container sx={{ pt:2, mt: 1}}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={8} sx={{ minHeight: 400 }}> 
                <Paper
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: 350
                      }}
                    > 
                  <TopChatBotComponent onEventAck={onEventAck}/> 
                </Paper>
              </Grid>

              <Grid item xs={12} md={12} lg={4} >
                <LearnerScoreDashboard/>
              </Grid>

              <Grid item xs={12} md={12} lg={8}>
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
              <Grid item xs={12} md={12} lg={4}  sx={{
                    p: 1,
                    mt: -4,
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                <LearnerReviseConcepts />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
  );

}

function LearnerScoreDashboard ()
{
  return (
    <LearnerScores
              products={[
                {
                  id: '5ece2c077e39da27658aa8a9',
                  image: '/zacobiamission.jpg',
                  name: 'Conditions',
                  updatedAt: '80%'
                },
                {
                  id: '5ece2c0d16f70bff2cf86cd8',
                  image: '/nonummission.png',
                  name: 'While Loops',
                  updatedAt: '80%'
                },
                {
                  id: 'b393ce1b09c1254c3a92c827',
                  image: '/missionImages/MissionSados.png',
                  name: 'Programming',
                  updatedAt: '85%'
                }
              ]}
              sx={{ width: 360, height: 350 }}
            />
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

function DashboardContent(props) {

  const { data: session, status } = useSession();
  const isUser = !!session && session.user;
  const loading = status === "loading"

  const [showMission, setShowMission] = React.useState(false);
  const [clickedMission, setClickedMission] = React.useState([]);
  const [learnerMissionProgress, setLearnerMissionProgress] = React.useState(null);

  React.useEffect(() => {
    //console.log ("Use effect called");
    if (loading) return // Do nothing while loading
    if (!isUser) signIn() // If not authenticated, force log in
    //console.log ("The value of session is", session);
    if (isUser)
      GetLearnerMissionProgress({_id:session.user._id}).then ((resp) => {console.log ("progress got is", resp); setLearnerMissionProgress(resp.missionProgress)});
  }, [isUser, loading])

  function showInitialDashboard (evt)
  {
      setShowMission (false);

  }

  //This function is called when a special action is needed on a learner event
  //For example, when user wants to load a mission from the conversation
  //Or change which missions are in progress and which are completed
  function onLearnerEvent (eventDetails)
  {
    //console.log ("Got special click request. Data is ", eventDetails);
    switch (eventDetails.type)
    {
      case "loadmission":
        onMissionClicked(AllMissionList[eventDetails.data - 1].moduleList);
        break;

      case "changemissionstatus":
        changeMissionStatusForTheUser(eventDetails.data.missionid,eventDetails.data.newstatus).then((res) => {
          console.log ("The response is",res);
        }
          
        );
        break;
    }
  }

  //This function changes the state of the mission progress of a learner
  //Currently called from TopChatbotComponent 
  function changeMissionStatusForTheUser (missionid, newstatus)
  {
    //learnerMissionProgress[missionid - 1] = newstatus;
    setLearnerMissionProgress((learnerMissionProgress) =>  {learnerMissionProgress[missionid - 1] = newstatus; return [...learnerMissionProgress]; });
    var dataObj = {_id: session.user._id, missions:learnerMissionProgress}
    console.log ("New learnermission progress is",learnerMissionProgress);
    return UpdateLearnerMissionProgress(dataObj);
  }

  function onMissionClicked (mission)
  {
      //console.log ("Module list is", moduleList);  
      setClickedMission(mission);
      setShowMission(true);  
  }
  return (
    <Box>
      {!session && <Typography variant="h6" component="h2"> Please Login </Typography>}
      {session && learnerMissionProgress && !showMission && <ShowPostLoginContent {...props} learnerMissionProgress = {learnerMissionProgress} signedUser = {session.user} onMissionClicked={onMissionClicked} onEventAck={onLearnerEvent}/>}
      {showMission && <ModuleListDisplay showInitialDashboard={showInitialDashboard} clickedMission = {clickedMission} learnerId = {session.user._id}/>}
    </Box>
  );
}

export default function Dashboard() {
  return <DashboardContent/>;
}
