import * as React from "react";
import { useEffect } from "react";
import Fade from "@mui/material/Fade";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { ModuleList } from "../../assets/moduleList/AllMissionChapterList";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { CardActionArea } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import {
  AllMissionList,
  CategoryList,
} from "../../assets/moduleList/AllMissionChapterList";
import Divider from "@mui/material/Divider";
import { signIn, signOut, useSession } from "next-auth/react";
import { GetLearnerMissionProgress } from "../../actions/LearnerMissionProgressRequestHandler";
import {
  backgroundColors,
  cardText,
  textColors,
  topicColors,
} from "../../ui_assets/images/UIThemes/colorThemes";
import LearnerStore from "../../store/LearnerStore";
import { useStore } from "zustand";
import { stringAvatar } from "../../utils/CommonFunctions";
import Avatar from "@mui/material/Avatar";
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

export const MissionState = {
  Available: 0,
  In_Progress: 1,
  Not_Available: 2,
  Completed: 3,
};
//This file displays all the missions displayed across different categories
//Categories:
//1) In-progress
//2) Robotics
//3) Python
//4) Block Programming
//5) Beginner
//6) Intermediate
//7) Advanced Block Programming
//Algorithm:
//First populate all the categories with Mission ids
function LearnerCard({firstname,username,urlToRedirect}) {
  
  return (
    <Card sx={{ display: 'flex', ml:2, mr:2, mb:2, p:1 }} variant="outlined">
      <Grid
          container
          spacing={1}
          alignItems="center"
          direction="row"
          sx={{ display: 'flex', flexGrow:1 }}
    
          
          //sx={{ backgroundColor: backgroundColors[currTheme] }}
        >
        <Grid item xs={2} md={2} lg={2} sx={{ ml: 2 }}>
          <Avatar alt={firstname} {...stringAvatar(firstname)} />
        </Grid>
        <Grid item xs={3} md={3} lg={3} sx={{ ml: 0 }} >
            <Typography component="div" variant="h6">
              {firstname}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {username}
            </Typography>
        </Grid>
        <Grid item xs={6} md={6} lg={6} sx={{ mb: 0 }} display="flex" justifyContent="flex-end">
          <Link href={urlToRedirect} target = "_blank" rel="noopener">
                <Button>Start Learning</Button>
          </Link>
        </Grid>
      </Grid>
    </Card>
  );
  return (
    <Card sx={{ height: 150, margin: 1, display: 'flex', flexDirection: 'column' }}>
      
      <CardActionArea>
        <CardContent>
        <Avatar alt="Remy Sharp" {...stringAvatar(firstname)} />
          <Typography gutterBottom variant="h6" component="div">
            {firstname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {firstname}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/*
      <CardActions>
        <Button size="small" onClick= {onMissionClick}>Start</Button>
       { <Chip label="Completed" color="success" variant="outlined" sx={{ margin: 1 }}/>}
      </CardActions>
    */}
    </Card>
  );

  
}

export default function DisplayLearnerCards({
  AddLearnerClicked,
  learners,
}) {


  //const { data: session, status } = useSession();
  //const { currTheme } = useStore(LearnerStore);
  //const isUser = !!session && session.user;
  //const loading = status === "loading";


  // const [learnerMissionProgress, setLearnerMissionProgress] = React.useState();

  //console.log ("The user we got is adfadf", session.user);

  //React.useEffect(() => {
   // if (loading) return; // Do nothing while loading
    //if (!isUser) signIn(); // If not authenticated, force log in

    //GetLearnerMissionProgress({_id:session.user._id}).then ((resp) => {setLearnerMissionProgress(resp.missionProgress)});
    //console.log ("Learner mission progress got is",learnerMissionProgress )
    //setLearnerMissionProgress(learnerMissionProgress);
    //console.log ("The value of session is", session);
  //}, [isUser, loading]);

  //const [categoryMap, setCategoryMap] = React.useState(null);
  //This function distribute missions into different categories

  return (
    <Fade in={true} timeout={1000}>
      <Grid
        container
        spacing={1}
        alignItems="center"
        direction="row"
        //sx={{ backgroundColor: backgroundColors[currTheme] }}
      >
        <Grid item xs={6} md={6} lg={6} sx={{ mb: 2 }}>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={{ ml:2, color:"#616161" }}
          >
            Your Learners
          </Typography>

        </Grid>
        <Grid item xs={5} md={5} lg={5} sx={{ mr: 1 }} display="flex" justifyContent="flex-end" >
          <Button variant="contained" onClick={AddLearnerClicked}>Add A Learner</Button>
        </Grid>
        <Grid item xs={12} md={12} lg={12} sx={{ mb: 2 }}>
        <Typography
            gutterBottom
            variant="body2"
            component="div"
            sx={{ ml:2, color:"#757575" }}
          >
            {(!learners || learners.length == 0)? "No learners found. Add learners to get started.": "Please find below learners added to your account."} 
          </Typography>

        </Grid>

        {learners && 
          learners.map((learner) => {
            let urlToRedirect = "/main/LearnerDashboard_new?login=parent&learnerid=" + learner._id;

              return (
                <Grid item xs={12} md={12} lg={12} sx={{ mb: 0 }} key={learner.firstname}>
                    <LearnerCard
                          firstname = {learner.firstname}
                          username = {learner.username}
                          urlToRedirect = {urlToRedirect}
                        />
                 </Grid>
                      )
                    
                  })}
      </Grid>
    </Fade>
  );
}
