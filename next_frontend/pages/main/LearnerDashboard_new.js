import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { signIn, signOut, useSession } from "next-auth/react";
import TopChatBotComponent from "../../components/LearnerDashboard/TopChatBotComponent";
import DisplayMissionsInCategories from "../../components/LearnerDashboard/DisplayMissionInCategories";
import QuizAndScore from "../../components/LearnerDashboard/QuizAndScore";
import { LearnerScores } from "../../components/LearnerDashboard/LearnerScores";
import { LearnerConceptsLearned } from "../../components/LearnerDashboard/LearnerConceptsLearned";
import {
  MissionDashboard,
  ChapterState,
} from "../../components/LearnerDashboard/DisplayChaptersWithinMission";
import { AllMissionList } from "../../assets/moduleList/AllMissionChapterList";
import { UpdateLearnerMissionProgress } from "../../actions/LearnerMissionProgressRequestHandler";
import { GetLearnerMissionProgress } from "../../actions/LearnerMissionProgressRequestHandler";
import MissionLockedDialog from "../../components/dialogBoxes/MissionLockedDialog";
import { GetSetLearnerDataThroughAPI } from "../../actions/LearnerMissionProgressRequestHandler";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LearningConversation from "../../components/ChatInterface/ShowLearningConversationWithAnimation";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AllQuizList } from "../../assets/quizData/AllQuizList";
import { TopQuizGames } from "../../components/LearnerDashboard/TopQuizGames";
import { MissionWithFriends } from "../../components/LearnerDashboard/JoinMissionWithFriends";
import { deepPurple, deepOrange, cyan } from "@mui/material/colors";
import { AllKeyConceptList } from "../../assets/lessons/ZacobiaMission/keyConcepts/AllKeyConceptList";
import LearnerStore, { LearnerActivityState } from "../../store/LearnerStore";
import { useRouter } from "next/router";
import UIComponent from "../../components/UIComponent";
import { useStore } from "zustand";
import {
  backgroundColors,
  textColors,
  buttonColors,
  cardColors,
  buttonText,
} from "../../ui_assets/images/UIThemes/colorThemes";

import { stringAvatar } from "../../utils/CommonFunctions";
import AskGuestLoginPopup from "../../components/dialogBoxes/GuestLoginPopup";
import { DiscoverMissions } from "../../components/LearnerDashboard/DiscoverMissions";
import { FunWithFriends } from "../../components/LearnerDashboard/FunWithFriends";
import { WeeklyChallenges } from "../../components/LearnerDashboard/WeeklyChallenges";
import * as gtag from "../../lib/gtag";

const drawerWidth = 240;
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

const dashboardPages = ['Home', 'Discover'];

function DashboardAppBar(props) {
  const { currTheme, updateTheme } = useStore(LearnerStore);
  //console.log(currTheme);
  const { signedUser,selectedPageChanged } = props;
  const settings = [{ text: "Logout", onClick: logoutClicked }];
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [firstName, userName] = LearnerStore((state) => [
    state.firstName,
    state.userName,
  ]);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function logoutClicked() {
    signOut({ callbackUrl: '/' })
    //signOut();
  }


  const [selectedPage,setSelectedPage] = React.useState ("Home"); 
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    //setAnchorElNav(null);
  };

  var learnerFullName = firstName;
  var textColor = textColors[currTheme];
  //console.log ("Learner full name is",learnerFullName);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {true && (
        <AppBar
          component="nav"
          sx={{
            backgroundColor: backgroundColors[currTheme],
            width: "100vw",
          }}
        >
          <Toolbar>
            {false && <Typography
              component="h1"
              variant="h6"
              color={textColor}
              noWrap
              sx={{
                //flexGrow: 1,
                ml: "10px",
                mr: "10px",
                // fontFamily: "Ariel, sans-serif",
              }}
            >
              Welcome {userName}
            </Typography>}

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {dashboardPages.map((page) => (
              <Button
                key={page}
                onClick={() => {setSelectedPage(page); selectedPageChanged(page)}}
                //variant= {selectedPage == page ? "text":"outlined"}
                disabled = {selectedPage == page }
                sx={{ ml:2, my: 2, "&.MuiButton-text": selectedPage == page? { borderBottom: "1px solid #000", color: textColor }: { color: textColor }, display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
            
            <Typography
              component="h1"
              variant="body1"
              color={textColors[currTheme]}
              noWrap
              sx={{
                //flexGrow: 1,
                ml: "10px",
                mr: "10px",
                // fontFamily: "Ariel, sans-serif",
              }}
            >
              Select Theme
            </Typography>
            <UIComponent />
            <Box sx={{ flexGrow: 0, flexDirection: 'row', display: 'flex' }}>
            
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={learnerFullName} {...stringAvatar(learnerFullName)} sx={{  bgcolor: "#AF2BBF", width: 36, height: 36 }} />
                </IconButton>
              </Tooltip>
              <Button
                key="usernametext"
                onClick={handleOpenUserMenu}
                sx={{ my: 2, "&.MuiButton-text": { color: textColor }, display: 'block' }}
              >
                @{userName}
              </Button>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
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
        </AppBar>
      )}
      {/* Correction : may not require this. It is giving a blank page. */}
      <Box component="main" sx={{ display:"flex", flexGrow: 1, justifyContent:"center"} } >
        <Toolbar/>
        <Container sx={{ pt: 2, mt: 10, minHeight: 800 }}>
          {props.children}
        </Container>
      </Box>
    </Box>
  );
}

function ShowPostLoginContent({
  quizProgress,
  signedUser,
  onMissionClicked,
  onEventAck,
  learnerMissionProgress,
  callBackHandlers,
}) {
  //callBackHandlers = {[retryQuizClicked, viewAllQuizClicked, reviewConceptClicked, viewAllConceptsClicked]}
  const [open, setOpen] = React.useState(false);
  const { currTheme, updateTheme } = useStore(LearnerStore);

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={8} lg={8} sx={{ minHeight: 400 }}>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            height: 350,
            bgcolor: backgroundColors[currTheme],
          }}
        >
          <TopChatBotComponent
            onEventAck={onEventAck}
            learnerQuizProgress={quizProgress}
            backgroundColor={backgroundColors[currTheme]}
          />
        </Paper>
      </Grid>

      <Grid item xs={12} md={8} lg={8}>
        <Paper
          sx={{
            p: 1,
            mt: -4,
            display: "flex",
            flexDirection: "column",
            backgroundColor: backgroundColors[currTheme],
          }}
        >
          <DisplayMissionsInCategories
            learnerMissionProgress={learnerMissionProgress}
            onMissionClicked={onMissionClicked}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

function LearnerReviseConcepts() {
  return (
    <LearnerConceptsLearned
      products={[
        {
          id: "5ece2c077e39da27658aa8a9",
          image: "/zacobiamission.jpg",
          name: "Statements & Syntax",
          updatedAt: "Statements & syntax",
        },
        {
          id: "5ece2c0d16f70bff2cf86cd8",
          image: "/nonummission.png",
          name: "Variables",
          updatedAt: "Variables and how they are used",
        },
        {
          id: "b393ce1b09c1254c3a92c827",
          image: "/missionImages/MissionSados.png",
          name: "Loops",
          updatedAt: "Basic introduction to loops",
        },
      ]}
      sx={{ width: 360, height: 362 }}
    />
  );
}

function ShowLearningConversation({
  chapterText,
  chapterEndReached,
  onLearnerEvent,
  onBackClicked,
  learnerQuizProgress,
  type,
  quizList,
  missionId,
}) {
  const { currTheme } = useStore(LearnerStore);
  //console.log ("Show learner quiz progress", learnerQuizProgress);
  return (
    <Grid
      container
      spacing={0}
      alignItems="left"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Grid item xs={12} md={12} lg={12}>
        <Button
          variant="contained"
          sx={{ backgroundColor: buttonColors[currTheme] }}
          onClick={onBackClicked}
          startIcon={<ArrowBackIcon />}
        >
          Dashboard
        </Button>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <LearningConversation
          LessonText={chapterText}
          OnLessonEnd={chapterEndReached}
          onEventAck={onLearnerEvent}
          learnerQuizProgress={learnerQuizProgress}
          type={type}
          quizList={quizList}
          missionId={missionId}
        />
      </Grid>
    </Grid>
  );
}

function ShowAllQuizScreen({
  quizList,
  showInitialDashboard,
  quizProgress,
  retryQuizClicked,
}) {
  const { currTheme } = useStore(LearnerStore);
  return (
    <Grid
      container
      spacing={2}
      alignItems="left"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Grid item xs={12} md={12} lg={12}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: buttonColors[currTheme],
            color: buttonText[currTheme],
          }}
          onClick={showInitialDashboard}
          startIcon={<ArrowBackIcon />}
        >
          Dashboard
        </Button>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <LearnerScores
          products={quizList}
          quizProgress={quizProgress}
          sx={{ width: 360 }}
          retryQuizClicked={retryQuizClicked}
          hideViewAll
        />
      </Grid>
    </Grid>
  );
}

function ShowAllConceptsScreen({
  showInitialDashboard,
  quizProgress,
  reviewConceptClicked,
  conceptList,
}) {
  const { currTheme } = useStore(LearnerStore);
  return (
    <Grid
      container
      spacing={2}
      alignItems="left"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Grid item xs={12} md={12} lg={12}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: buttonColors[currTheme],
            color: buttonText[currTheme],
          }}
          onClick={showInitialDashboard}
          startIcon={<ArrowBackIcon />}
        >
          Dashboard
        </Button>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <LearnerConceptsLearned
          products={conceptList}
          quizProgress={quizProgress}
          sx={{ width: 360 }}
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
    ShowAllConcepts: 6,
    ShowChaptersInMission: 7,
    ChapterInprogress_New: 8,
    PageClicked: 9
  };
  const { data: session, status } = useSession();
  const isUser = !!session && session.user;
  const loading = status === "loading";

  const [clickedMission, setClickedMission] = React.useState([]);
  const [learnerMissionProgress, setLearnerMissionProgress] =
    React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogText, setDialogText] = React.useState("text not set");
  const [chapterProgress, setChapterProgress] = React.useState(null);
  const [quizProgress, setQuizProgress] = React.useState(null);
  const [chapterText, setChapterText] = React.useState(null);
  const [componentState, setComponentState] = React.useState(
    DashboardState.UserDataLoading
  );
  const [componentStateBeforePageChange, setComponentStateBeforePageChange] = React.useState(componentState);
  const [currentChapter, setCurrentChapter] = React.useState(0);
  const [learnerId, setLearnerId] = React.useState("");

  var updatedLearnerMissionProgress = React.useRef();
  const router = useRouter();

  const [
    currentActivityState,
    updateMissionProgress,
    updateChapterProgress,
    updateQuizProgress,
    updateCurrrentActivityState,
    updateUserName,
    updateFirstName,
    updateLastName,
    updateId,
  ] = LearnerStore((state) => [
    state.currentActivityState,
    state.updateMissionProgress,
    state.updateChapterProgress,
    state.updateQuizProgress,
    state.updateCurrrentActivityState,
    state.updateUserName,
    state.updateFirstName,
    state.updateLastName,
    state.updateId,
  ]);

  //React useeffect for initial signing up the user
  React.useEffect(() => {
    console.log("Use effect called");
    if (loading) return; // Do nothing while loading
   // if (!isUser) signIn(); // If not authenticated, force log in
    //console.log ("The value of session is", session);

    if (componentState != DashboardState.UserDataLoading) return;
    if (isUser) {
      var queryObj = router.query;
      console.log("Router params are", queryObj);
      var _id;
      var reqType = "GETALLPROGRESS";
      if (queryObj.login === "parent") {
        _id = queryObj.learnerid;
        console.log(" id is ", _id);
        updateId(_id);
        setLearnerId(_id);
      } else {
        if (session.user.loginType == "parent")
        {
            router.push("/ParentLandingScreen")
            return;
        }
        _id = session.user._id;
      }

      console.log("Getting all user progress", session);
      var reqObj = { reqType, _id };
      GetSetLearnerDataThroughAPI(reqObj).then((resp) => {
        console.log("Resp got is", resp);
        if (Object.keys(resp)[0] == "error")
        {
          console.log ("Error occurred", resp.error);
          signOut({ callbackUrl: '/' });
        }
        setLearnerMissionProgress(resp.missionProgress);
        setChapterProgress(resp.chapterProgress);
        setQuizProgress(resp.quizProgress);
        updateMissionProgress(resp.missionProgress);
        updateChapterProgress(resp.chapterProgress);
        updateQuizProgress(resp.quizProgress);
        updateUserName(resp.firstName === "Guest User" ? "Guest User": resp.userName);
        updateFirstName(resp.firstName);
        updateLastName(resp.lastname);
        setComponentState(DashboardState.ShowInitialDashboard);
      });
    }
  }, [isUser, loading]);

  //React useeffect for setting updated mission progress that can be used across renders
  React.useEffect(() => {
    updatedLearnerMissionProgress.current = learnerMissionProgress;
    //console.log ("Setting the value of updated mission progress here", learnerMissionProgress);
  }, [learnerMissionProgress]);

  React.useEffect(
    () => {
      gtag.event({
        action: 'pagevisited',
        category: 'pagevisit',
        label: "LearnerDashboard_new",
      })
    },
    []
  );

  //React useeffect for changing the temporary state for showing chapter conversation
  React.useEffect(() => {
    //console.log ("here", componentState);
    if (componentState == DashboardState.ChapterInprogress_New)
      setComponentState(DashboardState.ChapterInprogress);
    //console.log ("Setting the value of updated mission progress here", learnerMissionProgress);
  }, [componentState]);

  function updateMissionStatusIfAllChaptersCompleted(missionid) {
    if (
      chapterProgress[missionid].find(
        (element) => element != ChapterState.Completed
      ) === undefined
    ) {
      changeMissionStatusForTheUser(missionid, "Completed");
    }
  }

  function retryQuizClicked(quizId) {
    //console.log ("Retry quiz clicked", quizId);
    setComponentState(DashboardState.ShowRetryQuiz);
    var chapterTextForQuiz = [
      { type: "quiz", id: quizId, quizList: clickedMission.quizList },
      { id: 1, type: "endmessage" },
    ];
    setChapterText(chapterTextForQuiz);
  }

  function viewAllQuizClicked() {
    setComponentState(DashboardState.ShowAllQuiz);
  }

  function reviewConceptClicked(concept) {
    console.log("Concept review clicked with id ", concept);
    (async function () {
      const response =
        await require(`../../assets/lessons/${clickedMission.folderName}/keyConcepts/${concept.path}`);
      console.log("hereerere", response.LessonText);
      setChapterText([...response.LessonText]);
    })();
    setComponentState(DashboardState.ShowReviseConcepts);
  }

  function viewAllConceptsClicked() {
    console.log("View all concepts clicked");
    setComponentState(DashboardState.ShowAllConcepts);
  }

  function showInitialDashboard(evt) {
    //setShowMission (false);
    setComponentState(DashboardState.ShowInitialDashboard);
  }

  function showMissionDashboard(evt) {
    //setShowMission (false);
    setComponentState(DashboardState.ShowChaptersInMission);
  }

  //This function is called when a special action is needed on a learner event
  //For example, when user wants to load a mission from the conversation
  //Or change which missions are in progress and which are completed
  function onLearnerEvent(eventDetails) {
    console.log("Got special click request. Data is ", eventDetails);
    switch (eventDetails.subtype) {
      case "loadmission":
        //console.log ("mission data is",AllMissionList[eventDetails.data]);
        onMissionClicked(AllMissionList[eventDetails.data]);
        break;

      case "changemissionstatus":
        {
          const missionid =
            eventDetails.data.missionid == -1
              ? clickedMission.id
              : eventDetails.data.missionid;
          changeMissionStatusForTheUser(missionid, eventDetails.data.newstatus);
          //changeMissionStatusForTheUser(eventDetails.data.missionid,eventDetails.data.newstatus).then((res) => {
          // console.log ("The response is",res);});
        }
        break;

      case "loadnextchapter":
        console.log(
          "clicked mission is ",
          clickedMission,
          "current chapter is",
          currentChapter,
          "state",
          componentState
        );
        var nextChapter = clickedMission.moduleList[currentChapter.id + 1];
        onChapterClicked(nextChapter);
        break;

      case "loadchapter":
        console.log(
          "clicked mission is ",
          clickedMission,
          "current chapter is",
          currentChapter,
          "state",
          componentState
        );
        switch (componentState) {
          case DashboardState.ShowRetryQuiz:
            break;

          case DashboardState.ShowReviseConcepts:
            break;

          default:
            var nextChapter = clickedMission.moduleList[currentChapter.id];
            onChapterClicked(nextChapter);
        }
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
  function changeMissionStatusForTheUser(missionid, newstatus) {
    //learnerMissionProgress[missionid - 1] = newstatus;
    setLearnerMissionProgress((learnerMissionProgress) => {
      learnerMissionProgress[missionid] = newstatus;
      //If a mission is completed, need to check whether we can open the next mission
      if (
        newstatus == "Completed" &&
        missionid + 1 < learnerMissionProgress.length
      ) {
        if (learnerMissionProgress[missionid + 1] != "Completed")
          learnerMissionProgress[missionid + 1] = "Available";
      }
      var dataObj = { _id: learnerId, missions: learnerMissionProgress };
      //console.log ("New learnermission progress is",learnerMissionProgress);
      UpdateLearnerMissionProgress(dataObj);
      return [...learnerMissionProgress];
    });
    // var dataObj = {_id: session.user._id, missions:learnerMissionProgress}
    // console.log ("New learnermission progress is",learnerMissionProgress);
    // return UpdateLearnerMissionProgress(dataObj);
  }

  function onMissionClicked(mission) {
    //console.log ("Module list is", moduleList);
    //console.log ("New learnermission progress is",learnerMissionProgress, updatedLearnerMissionProgress.current);
    if (updatedLearnerMissionProgress.current[mission.id] == "Not Available") {
      //return;
      setDialogOpen(true);
      if (mission.id == 0) {
        setDialogText("Please go through initial conversation first");
      } else {
        setDialogText("Please complete earlier missions first");
      }
      return;
    }

    setClickedMission(mission);
    setComponentState(DashboardState.ShowChaptersInMission);
    //updateCurrrentActivityState({state:LearnerActivityState.MissionStarted, data:mission});
    //setShowMission(true);
  }

  function handleDialogClose() {
    setDialogOpen(false);
  }

  const backToModulesClicked = (props) => {
    setComponentState(DashboardState.ShowChaptersInMission);
    // setChapterInProgress(false);
  };

  const chapterEndReached = (props) => {
    updateMissionStatusIfAllChaptersCompleted(clickedMission.id);

    if (
      chapterProgress[clickedMission.id][currentChapter.id] ==
      ChapterState.Completed
    )
      //Means the chapter was already completed before so nothing to be done here
      return;

    updateCurrrentActivityState({
      state: LearnerActivityState.ChapterEnded,
      data: currentChapter,
    });

    setChapterProgress((chapterProgress) => {
      chapterProgress[clickedMission.id][currentChapter.id] =
        ChapterState.Completed;
      //Mark next chapter in progress
      if (
        chapterProgress[clickedMission.id].length > currentChapter.id - 1 &&
        chapterProgress[clickedMission.id][currentChapter.id + 1] !=
          ChapterState.Completed
      )
        chapterProgress[clickedMission.id][currentChapter.id + 1] =
          ChapterState.InProgress;
      updateChapterProgressForLearner(chapterProgress);
      return [...chapterProgress];
    });
    //setChapterInProgress(false);
    //setComponentState("showchaptersinmission");
  };

  const quizEnded = (props) => {
    //setComponentState("showchaptersinmission");
    //setChapterInProgress(false);
    //setComponentState("showchaptersinmission");
  };

  function updateChapterProgressForLearner(newChapterProgress) {
    var reqType = "UPDATECHAPTERPROGRESS";
    var _id = learnerId;
    var data = newChapterProgress;
    var reqObj = { reqType, _id, data };
    GetSetLearnerDataThroughAPI(reqObj).then((resp) => {
      //console.log ("resp is", resp, );
      //setChapterProgress(resp.chapterProgress);
      //console.log ("Chapter progress xxxxx", chapterProgress, resp.chapterProgress[clickedMission.id]);
    });
  }

  function onChapterClicked(chapter) {
    //console.log ("Chapter clicked is", chapter );
    //console.log ("Chapter progressed is", chapterProgress);
    console.log("Clicked mission is", clickedMission);
    setCurrentChapter(chapter);
    updateCurrrentActivityState({
      state: LearnerActivityState.ChapterStarted,
      data: chapter,
    });

    gtag.event({
      action: 'pagevisited',
      category: 'chapterclicked',
      label: chapter.name,
    });

    if (
      chapterProgress[clickedMission.id][chapter.id] == ChapterState.Available
    ) {
      setChapterProgress((chapterProgress) => {
        chapterProgress[clickedMission.id][chapter.id] =
          ChapterState.InProgress;
        updateChapterProgressForLearner(chapterProgress);
        return [...chapterProgress];
      });

      if (learnerMissionProgress[clickedMission.id] == "Available")
        changeMissionStatusForTheUser(clickedMission.id, "In Progress");
    }

    (async function () {
      const response =
        await require(`../../assets/lessons/${chapter.fileName}`);
      //console.log ("hereerere",response.LessonText);
      setChapterText([...response.LessonText]);
      //setComponentState("chapterinprogress_new");
      setComponentState((componentState) => {
        if (componentState == DashboardState.ChapterInprogress)
          return DashboardState.ChapterInprogress_New;
        else return DashboardState.ChapterInprogress;
      });

      //setChapterInProgress(true);
    })();
  }


  const [ pageSelected, setPageSelected] = React.useState(dashboardPages[0]);
  function selectedPageChanged(selection)
  {
    setPageSelected(selection);
    if (selection != dashboardPages[0])
    {
      setComponentStateBeforePageChange(componentState);
      setComponentState(DashboardState.PageClicked);
    }
    else{
      setComponentState(componentStateBeforePageChange);
    }
    console.log ("Currently selected page is",selection);

  }

  //const dashboardPages = ['Home', 'Discover', 'Weekly Challenge', 'Fun With Friends'];

  const componentForPage = {
    Discover:DiscoverMissions,
    'Weekly Challenge':WeeklyChallenges,
    'Fun With Friends': FunWithFriends
  };

  var ComponentToUse;
  if (pageSelected != dashboardPages[0])
  {
    ComponentToUse = componentForPage[pageSelected];
    // return (
    //   <DashboardAppBar signedUser={session.user} selectedPageChanged={selectedPageChanged}>
    //     <ComponentToUse/>
    //   </DashboardAppBar>
    // );
  }


  return (
    <React.Fragment>
      {!session && (
        <AskGuestLoginPopup/>
      )}

      {session && (
        <DashboardAppBar signedUser={session.user} selectedPageChanged={selectedPageChanged}>
          {
            componentState == DashboardState.PageClicked && (<ComponentToUse/>)
          }
          <MissionLockedDialog
            open={dialogOpen}
            dialogText={dialogText}
            onClose={handleDialogClose}
          />
          {componentState == DashboardState.ShowInitialDashboard && (
            <ShowPostLoginContent
              {...props}
              quizProgress={quizProgress}
              learnerMissionProgress={learnerMissionProgress}
              callBackHandlers={[
                retryQuizClicked,
                viewAllQuizClicked,
                reviewConceptClicked,
                viewAllConceptsClicked,
              ]}
              signedUser={session.user}
              onMissionClicked={onMissionClicked}
              onEventAck={onLearnerEvent}
            />
          )}
          {componentState == DashboardState.ShowChaptersInMission && (
            <MissionDashboard
              missionName = {clickedMission.name}
              retryQuizClicked={retryQuizClicked}
              showInitialDashboard={showInitialDashboard}
              quizProgress={quizProgress[clickedMission.id]}
              onLessonClicked={onChapterClicked}
              moduleList={clickedMission.moduleList}
              chapterProgress={chapterProgress[clickedMission.id]}
              viewAllQuizClicked={viewAllQuizClicked}
              learnerId={session.user._id}
              reviewConceptClicked={reviewConceptClicked}
              viewAllConceptsClicked={viewAllConceptsClicked}
              quizList={clickedMission.quizList}
              conceptList={clickedMission.conceptList}
            />
          )}
          {componentState == DashboardState.ChapterInprogress && (
            <ShowLearningConversation
              type="Chapter"
              chapterText={chapterText}
              chapterEndReached={chapterEndReached}
              onLearnerEvent={onLearnerEvent}
              onBackClicked={backToModulesClicked}
              quizList={clickedMission.quizList}
              learnerQuizProgress={quizProgress}
              missionId={clickedMission.id}
            />
          )}
          {componentState == DashboardState.ChapterInprogress_New && (
            <ShowLearningConversation
              type="Chapter"
              chapterText={chapterText}
              chapterEndReached={chapterEndReached}
              onLearnerEvent={onLearnerEvent}
              onBackClicked={backToModulesClicked}
              quizList={clickedMission.quizList}
              learnerQuizProgress={quizProgress}
              missionId={clickedMission.id}
            />
          )}
          {componentState == DashboardState.ShowRetryQuiz && (
            <ShowLearningConversation
              type="Quiz"
              chapterText={chapterText}
              chapterEndReached={quizEnded}
              onLearnerEvent={onLearnerEvent}
              onBackClicked={backToModulesClicked}
              learnerQuizProgress={quizProgress}
              quizList={clickedMission.quizList}
              missionId={clickedMission.id}
            />
          )}
          {componentState == DashboardState.ShowAllQuiz && (
            <ShowAllQuizScreen
              showInitialDashboard={showMissionDashboard}
              quizProgress={quizProgress[clickedMission.id]}
              retryQuizClicked={retryQuizClicked}
              quizList={clickedMission.quizList}
            />
          )}
          {componentState == DashboardState.ShowReviseConcepts && (
            <ShowLearningConversation
              type="Concept"
              chapterText={chapterText}
              chapterEndReached={quizEnded}
              onLearnerEvent={onLearnerEvent}
              onBackClicked={backToModulesClicked}
              learnerQuizProgress={quizProgress}
            />
          )}
          {componentState == DashboardState.ShowAllConcepts && (
            <ShowAllConceptsScreen
              showInitialDashboard={showMissionDashboard}
              quizProgress={quizProgress}
              reviewConceptClicked={reviewConceptClicked}
              conceptList={clickedMission.conceptList}
            />
          )}
        </DashboardAppBar>
      )}
    </React.Fragment>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}

//export default React.memo(DashboardContent)
