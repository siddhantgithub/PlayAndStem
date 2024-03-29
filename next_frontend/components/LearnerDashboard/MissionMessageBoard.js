import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import EllipsisVerticalIcon from "@heroicons/react/24/solid/EllipsisVerticalIcon";
import Grid from "@mui/material/Unstable_Grid2";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { ChapterState, ModuleCard } from "./DisplayChaptersWithinMission";
import Paper from "@mui/material/Paper";
import * as React from 'react';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
} from "@mui/material";
import {
  backgroundColors,
  buttonColors,
  buttonText,
  topicColors,
} from "../../ui_assets/images/UIThemes/colorThemes";
import { useStore } from "zustand";
import LearnerStore from "../../store/LearnerStore";

export function ModuleCardForMessage(props) {
  const { module, onLessonClicked, progress } = props;
  const { name, fileName, image, description, id } = module;

  const onClick = () => {
    onLessonClicked(module);
  };

  function returnChipColor(ms) {
    switch (ms) {
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

  function returnChipLabel(ms) {
    //console.log ("Value of ms is",ms);

    switch (ms) {
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

  function returnButtonText(ms) {
    //console.log ("Value of ms is",ms);

    switch (ms) {
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

  return (
    <Card sx={{ width: 180, height: 275, margin: 2 }}>
      <CardActionArea
        onClick={progress != ChapterState.AvailableLater && onClick}
      >
        <Image
          alt={name}
          src={`/lessonImages/${image}`}
          width={200}
          height={150}
        ></Image>

        <CardContent>
          <Typography gutterBottom variant="body1" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

//What should be displayed here
//Go through progress and highlight first chapter that is available and begin, show a card
//If all the chapters are complete - then go through the quiz and highlight the quiz with the least score and ask to retry
//If all quiz are 100% then suggest to revise a concept

export const MissionMessageDashboard = (props) => {
  const {
    chapterProgress,
    chapterlist,
    sx,
    onLessonClicked,
    quizProgress,
    quizList,
    retryQuizClicked,
  } = props;
  const { currTheme } = useStore(LearnerStore);

  console.log ("Rerendering now");
  const autoStartTime = 30;

  

  const [timeToStart, setTimeToStart] = React.useState(autoStartTime);
  const timerRunning = React.useRef (autoStartTime + 1);
  //timerRunning.current = timeToStart;

  const firstAvailableId = chapterProgress.findIndex(
    (elem) => elem == ChapterState.Available || elem == ChapterState.InProgress
  );

  const onClick = () => {
    onLessonClicked(chapterlist[firstAvailableId]);
  };

  function reduceTimeToStart ()
  {
    console.log ("time to start is", timeToStart);
    if (timerRunning.current > 0)
    {
      setTimeToStart((timeToStart) => {timerRunning.current = timeToStart; return timeToStart - 1});
      setTimeout(() => {reduceTimeToStart()}, 1000);
    }
    else
      onClick();
  }

  if (firstAvailableId != -1 && firstAvailableId < chapterlist.length) 
  {
    if (timerRunning.current == autoStartTime + 1)
    {
      console.log ("Starting timer")
      setTimeout(() => {reduceTimeToStart()}, 1000);
      timerRunning.current -= 1;
    }
    //One chapter is available

    return (
      <Paper
        sx={{
          ...sx,
          backgroundColor: backgroundColors[currTheme],
        }}
      >
        <CardHeader
          title="Next Chapter"
          sx={{
            backgroundColor: topicColors[currTheme],
            color: buttonText[currTheme],
          }}
        />
        <Grid container spacing={0} alignItems="center" justifyContent="left">
          <Grid item xs={8} md={8} lg={8}>
            <ModuleCardForMessage
              key={firstAvailableId}
              progress={chapterProgress[firstAvailableId]}
              module={chapterlist[firstAvailableId]}
              onLessonClicked={onLessonClicked}
            />
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <Box display={"flex"} flexDirection="column" alignItems={"center"}>
            <Button
              variant="contained"
              size="medium"
              onClick={onClick}
              sx={{
                margin: 2,
                backgroundColor: buttonColors[currTheme],
                color: buttonText[currTheme],
              }}
            >
              Start
            </Button>
            <Typography variant="body1" >
              {(timeToStart <= 0)? "Loading...": `Chapter will start in`}  
            </Typography>
            {(timeToStart > 0) &&  <Typography variant="h4"  color= {buttonText[currTheme]}> {timeToStart} </Typography>  }
            {(timeToStart > 0) &&  <Typography variant="body1" > seconds </Typography>  }
            </Box>
            
          </Grid>
        </Grid>
      </Paper>
    );
  } else {
    //Look if any quiz is incomplete or the score is < 100%
    const firstOpenQuiz = quizProgress
      .slice(0, quizList.length)
      .findIndex((elem) => elem != 100);
    if (firstOpenQuiz != -1) {
      var quiz = quizList[firstOpenQuiz];
      var retryClickHandler = () => {
        //console.log ("Retry quiz handler is", retryQuizClicked);
        retryQuizClicked(quiz.id);
      };
      //Means we have a quiz that is not yet complete
      if (quizProgress[firstOpenQuiz] == -1) {
        return (
          <Card sx={{ ...sx, backgroundColor: backgroundColors[currTheme] }}>
            <CardHeader sx={{
            backgroundColor: topicColors[currTheme],
            color: buttonText[currTheme],
          }} title="Time For a Quiz" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                You haven't tried the quiz '{quiz.name}' yet
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                It would be great to complete the quiz just to ensure you have
                mastered everything
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              size="medium"
              onClick={retryClickHandler}
              sx={{
                margin: 2,
                backgroundColor: buttonColors[currTheme],
                color: buttonText[currTheme],
              }}
            >
              Retry
            </Button>
          </Card>
        );
      } else {
        //Quiz score is < 100. Ask to retry
        return (
          <Card sx={{ ...sx, backgroundColor: backgroundColors[currTheme] }}>
            <CardHeader sx={{
            backgroundColor: topicColors[currTheme],
            color: buttonText[currTheme],
          }} title="Time For a Quiz" />
            <CardContent>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                sx={{ fontWeight: "normal", m: 1 }}
              >
                The score for the quiz "{quiz.name}" is{" "}
                {Math.round(quizProgress[firstOpenQuiz])} %
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                sx={{ fontWeight: "normal", m: 1 }}
              >
                How about we retry to get the score to 100%?
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              size="medium"
              onClick={retryClickHandler}
              sx={{ margin: 2,
                backgroundColor: buttonColors[currTheme],
                color: buttonText[currTheme], }}
            >
              Retry
            </Button>
          </Card>
        );
      }
    }
    //console.log ("Sorted quiz progress is", sortedQuizProgress);
  }
  //console.log ("Quiz progress is ", quizProgress);

  return (
    <Card sx={{ ...sx, backgroundColor: backgroundColors[currTheme] }}>
      <CardHeader
        title="Welcome !"
        sx={{
          fontWeight: "bolder",
          color: backgroundColors[currTheme], //textcolors same as background
          backgroundColor: topicColors[currTheme],
        }}
      />
      <Typography gutterBottom variant="body1" component="div" sx={{ m: 2 }}>
        Great job in completing all the chapters in the mission
      </Typography>
      <Typography gutterBottom variant="body1" component="div" sx={{ m: 2 }}>
        Feel free to try few chapters again, retry quizzes or revise the
        concepts covered
      </Typography>
    </Card>
  );
};
