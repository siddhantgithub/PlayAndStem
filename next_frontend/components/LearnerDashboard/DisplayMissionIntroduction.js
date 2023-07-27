import * as React from "react";
import { useEffect } from "react";
import Fade from "@mui/material/Fade";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  backgroundColors,
  buttonColors,
  buttonText,
  topicColors,
} from "../../ui_assets/images/UIThemes/colorThemes";
import { useStore } from "zustand";
import LearnerStore from "../../store/LearnerStore";
import Stack from '@mui/system/Stack';
import Image from 'next/image'
import { MissionDetailedDescription } from "../../assets/moduleList/AllMissionChapterList";


export function MissionIntroduction(props) {
  const messagesEndRef = React.useRef(null);
  const { currTheme } = useStore(LearnerStore);

  

  const {
    showAllMissions,
    mission
  } = props;

  const backToDiscoverClicked = (props) => {
    showAllMissions();
  };

  console.log ("Mission Obj is", mission);

  useEffect(() => {
    //console.log ("Chapter progress is", chapterProgress);

  }, []);

  function getStatusMessage (status)
  {
    switch (status)
    {
      case "Added To Dashboard":
        return "Mission already added to your Dashboard. Please access it from your home.";
        break;

      case "Coming Soon":
        return "We are working hard to get this mission ready for you. You will hear from us soon.";
        break;


    }
  }

  //Ideal view state should be
  //First should be visible, what is in-progress or up next
  //Second should be visible completed
  //Third Avalilable later
  return (
    <React.Fragment>
      <Button
        variant="contained"
        ref={messagesEndRef}
        onClick={backToDiscoverClicked}
        startIcon={<ArrowBackIcon />}
        sx={{
          backgroundColor: buttonColors[currTheme],
          color: buttonText[currTheme],
        }}
      >
        All Missions
      </Button>
      <Fade in={true} timeout={1000}>
              <Card sx={{  mt: 2, backgroundColor: backgroundColors[currTheme], maxWidth:"md" }}>
                <CardHeader
                  title={mission.name}
                  sx={{
                    fontWeight: "bolder",
                    color: backgroundColors[currTheme], //textcolors same as background
                    backgroundColor: topicColors[currTheme],
                  }}
                />
                <Stack direction="row" spacing={2} sx={{ p:2}} alignItems="center">
                  <Image src={mission.image} alt={mission.name} width={200} height={200} />
                  <Stack direction="column" >
                    <Typography gutterBottom variant="h5" component="div" sx={{ mb: 2 }}>
                        Welcome to {mission.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{ mb: 2 }}>
                        Description
                    </Typography>
                    <Typography gutterBottom variant="body1" component="div" sx={{ mb: 2 }}>
                        {MissionDetailedDescription[mission.id].details}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{ mb: 2 }}>
                        Level
                    </Typography>
                    <Typography gutterBottom variant="body1" component="div" sx={{ mb: 2 }}>
                        {MissionDetailedDescription[mission.id].level}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{ mb: 2 }}>
                        {getStatusMessage(mission.status)}
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
      </Fade>
    </React.Fragment>
  );
}
