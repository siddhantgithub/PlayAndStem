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
import LearningConversation from '../ChatInterface/ShowLearningConversation';
import { CardActionArea } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import {AllMissionList, CategoryList} from '../../assets/moduleList/AllMissionChapterList'
import Divider from '@mui/material/Divider';
import { signIn, signOut, useSession } from "next-auth/react"
import { GetLearnerMissionProgress } from '../../actions/LearnerMissionProgressRequestHandler';

export const MissionState = {
  Available: 0, 
  In_Progress: 1, 
  Not_Available:2,
  Completed:3
}
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
function MissionCard({learnerMissionProgress, onMissionClick,missionName,missionImage, description}) {

  function returnChipColor (ms)
  {
    //console.log ("Value of ms is",ms);

    switch (ms)
    {
      case "Available":
        return "primary";

      case "In Progress":
        return "secondary";

      case "Not Available":
        return "warning";

        case "Completed":
        return "success";
    }
  }

 //console.log ("Mission status got is ", learnerMissionProgress);
// console.log ("Chip color is", returnChipColor(learnerMissionProgress));
  return (
    <Card sx={{ width: 220, height: 290,margin: 1}}>
      <CardActionArea onClick = {onMissionClick}>
      <CardMedia
        sx={{ height: 150 }}
          image={missionImage}
        title={missionName}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {missionName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Chip label={learnerMissionProgress} color={returnChipColor(learnerMissionProgress)} variant="outlined" sx={{ margin: 1 }}/>
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


export default function DisplayMissionsInCategories ({onMissionClicked, learnerMissionProgress})
{
  const { data: session, status } = useSession();
  const isUser = !!session && session.user;
  const loading = status === "loading"
 // const [learnerMissionProgress, setLearnerMissionProgress] = React.useState();

  //console.log ("The user we got is adfadf", session.user);

  React.useEffect(() => {
    if (loading) return // Do nothing while loading
    if (!isUser) signIn() // If not authenticated, force log in

    //GetLearnerMissionProgress({_id:session.user._id}).then ((resp) => {setLearnerMissionProgress(resp.missionProgress)});
    //console.log ("Learner mission progress got is",learnerMissionProgress )
    //setLearnerMissionProgress(learnerMissionProgress);
    //console.log ("The value of session is", session);
  }, [isUser, loading])


  const [categoryMap,setCategoryMap] = React.useState(null);
  //This function distribute missions into different categories
    function distributeMissionsInCategories ()
    {
      var categoryMissionMap = new Map();
      for (var i = 0; i < AllMissionList.length; ++i)
      {
        //Iterate over all the missions
        var categoryArray = AllMissionList[i].category.split(",");
        //Iterate over all the categories
        for (var j = 1; j < CategoryList.length; ++j )
        {
          if (categoryArray.indexOf(CategoryList[j]) != -1)
          {
            if (categoryMissionMap.has(CategoryList[j]))
            {
              categoryMissionMap.get(CategoryList[j]).push(AllMissionList[i]);
            }
            else
            {
              categoryMissionMap.set(CategoryList[j],[AllMissionList[i]]);
            }
          }
        }
      }
      //Now add the in-progress courses
      //console.log( "Mission in categories are", session.user.missionProgress);
      if (false && session.user.missionProgress.length > 0)
      {
        categoryMissionMap.set(CategoryList[0],[]);
        
        for (var i = 0; i < session.user.missionProgress.length; ++i)
        {
          var missionToPush = AllMissionList[session.user.missionProgress[i] - 1];
          //console.log ("Index is ",parseInt(session.user.missionProgress[i]) - 0, "mission to add is", missionToPush);
          categoryMissionMap.get(CategoryList[0]).push(missionToPush);

        }
      }
      //console.log ("Final category mission Map is ",categoryMissionMap);
      setCategoryMap(categoryMissionMap);
    }

    useEffect(() => {
      distributeMissionsInCategories();
        
    }, []);

    return (
        <Fade in={true} timeout = {1000}>

        <Grid container spacing={1}  alignItems= "center" justifyContent="left" direction="row">
          <Grid item xs={12} md={12} lg={12} sx ={{mb:0}} >
            <Typography gutterBottom variant="h5" component="div">
              Missions & Progress
            </Typography>
          </Grid>
          {
            
            categoryMap && CategoryList.map ((category => {
              if (categoryMap.has(category))
              { 
                return (
                  <React.Fragment key={category}>
                    {
                      categoryMap.get(category).map(mission => {
                        var key = category + mission.id;
                       // console.log ("mission id is " + mission.id);
                        return (
                          learnerMissionProgress && <MissionCard learnerMissionProgress = {learnerMissionProgress[mission.id]} key={key} missionName={mission.name} missionImage={mission.image} onMissionClick = {() => {onMissionClicked(mission)}} description = {mission.description}/>
                        )
                      })
                    }
                    </React.Fragment>
                );
              }
            }))
          }
        </Grid> 
    </Fade>
    );
}