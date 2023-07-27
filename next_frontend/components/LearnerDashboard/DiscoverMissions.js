import * as React from "react";
import { useEffect } from "react";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  AllDiscoverMissionList,
  DiscoverCategoryList,
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
import Stack from '@mui/system/Stack';
import Image from 'next/image'
import { MissionIntroduction } from "./DisplayMissionIntroduction";

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
function DiscoverMissionCard({
  status,
  onMissionClick,
  missionName,
  missionImage,
  description,
}) {

  const { currTheme } = useStore(LearnerStore);

  return (
    <Box sx={{width:130, cursor:"pointer"}} onClick={onMissionClick}>
      <Stack spacing={2} sx={{ml:2, mb:3}}>
        <Image src={missionImage} alt={missionName} width={100} height={100} />
          <Typography gutterBottom variant="body1" component="div" sx={{ color: topicColors[currTheme] }} >
            {missionName}
          </Typography>       
      </Stack>
    </Box>
  );
}

export  function DiscoverMissions() 
{
  const { data: session, status } = useSession();
  const { currTheme } = useStore(LearnerStore);
  const isUser = !!session && session.user;
  const loading = status === "loading";
  // const [learnerMissionProgress, setLearnerMissionProgress] = React.useState();

  const [categoryMap, setCategoryMap] = React.useState(null);
  const [clickedMissionObj, setClickedMissionObj] = React.useState(null);
  //This function distribute missions into different categories

  function showAllMissions ()
  {
    setClickedMissionObj(null);
  }

  function onMissionClicked (missionObj)
  {
    setClickedMissionObj(missionObj);

  }

  function distributeMissionsInCategories() 
  {
    var categoryMissionMap = new Map();
    for (var i = 0; i < AllDiscoverMissionList.length; ++i) {
      //Iterate over all the missions
      var categoryArray = AllDiscoverMissionList[i].category.split(",");
      //console.log ("Category array is", categoryArray);
      //Iterate over all the categories
      for (var j = 0; j < DiscoverCategoryList.length; ++j) 
      {

        if (categoryArray.indexOf(DiscoverCategoryList[j]) != -1) {
          if (categoryMissionMap.has(DiscoverCategoryList[j])) {
            categoryMissionMap.get(DiscoverCategoryList[j]).push(AllDiscoverMissionList[i]);
          } else {
            categoryMissionMap.set(DiscoverCategoryList[j], [AllDiscoverMissionList[i]]);
          }
        }
      }
    }
    setCategoryMap(categoryMissionMap);
    //console.log ("Category mission map is", categoryMissionMap);  
  }

  useEffect(() => {
    distributeMissionsInCategories();
  }, []);

  React.useEffect(
    () => {
      gtag.event({
        action: 'pageview',
        category: 'tabview',
        label: "DiscoverMissions",
      })
    },
    []
  );

  if (clickedMissionObj)
  {
    return (
      <MissionIntroduction showAllMissions={showAllMissions} mission={clickedMissionObj}/>
    );
  }

  return (
    <Fade in={true} timeout={1000}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={8} lg={8} sx={{ minHeight: 400 }}>
              <Box sx={{ backgroundColor: backgroundColors[currTheme]}}>
                <Typography gutterBottom variant="h5"  sx={{ color: topicColors[currTheme], ml:2 }}>
                  Discover Missions
                </Typography>
                {categoryMap && DiscoverCategoryList.map((category) => {
                  if (categoryMap.has(category)) {
                    return (
                      <React.Fragment key={category}>
                        <Typography gutterBottom variant="h6" component="div" sx={{ color: topicColors[currTheme], ml:2 }}>
                          {category}
                        </Typography>
                        <Stack direction="row" spacing={2}>
                          {categoryMap.get(category).map((mission) => {
                            var key = category + mission.id;
                            // console.log ("mission id is " + mission.id);
                            return (
                              <DiscoverMissionCard
                                sx={{ backgroundColor: "red", position:"relative" }}
                                key={key}
                                missionName={mission.name}
                                missionImage={mission.image}
                                onMissionClick={() => {onMissionClicked(mission)}}
                                status={mission.status}
                                description={mission.description}
                              />
                            );
                          })}
                        </Stack>
                      </React.Fragment>
                    );
                   }
                })}
              </Box>
            </Grid>
          </Grid>
    </Fade>
  );
}
