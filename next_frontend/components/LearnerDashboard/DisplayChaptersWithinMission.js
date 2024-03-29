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
import LearningConversation from "../ChatInterface/ShowLearningConversationWithAnimation";
import { CardActionArea } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { GetSetLearnerDataThroughAPI } from "../../actions/LearnerMissionProgressRequestHandler";
import Image from "next/image";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { LearnerScores } from "./LearnerScores";
import { AllQuizList } from "../../assets/quizData/AllQuizList";
import { AllKeyConceptList } from "../../assets/lessons/ZacobiaMission/keyConcepts/AllKeyConceptList";
import { MissionMessageDashboard } from "./MissionMessageBoard";
import { LearnerConceptsLearned } from "./LearnerConceptsLearned";
import {
  backgroundColors,
  buttonColors,
  buttonText,
  secondaryTextColors,
  textColors,
  topicColors,
  cardBodyContrastTextColor
} from "../../ui_assets/images/UIThemes/colorThemes";
import { useStore } from "zustand";
import LearnerStore from "../../store/LearnerStore";
import * as gtag from "../../lib/gtag";
import { styled } from '@mui/material/styles';

export const ChapterState = {
  AvailableLater: 0,
  Available: 1,
  InProgress: 2,
  Completed: 3,
};

export const ViewState = {
  AvailableLater: 0,
  Available: 2, //Represents both available and in-progress as both will be visible in the same tab
  InProgress: 2,
  Completed: 3,
  All: 4,
};

export const LinearProgressWithLabel = React.forwardRef((props, ref) => {
  const { currTheme } = useStore(LearnerStore);
  const { completed, total } = props;
  const progress = (completed / total) * 100;
  const compeletedString = `${completed} of ${total}`;
  return (
    <Box sx={{ display: "flex", alignItems: "center", pt: 2 }}>
      <Typography
        variant="body1"
        color={currTheme == 1 ? "white" : "black"}
      >
        Progress
      </Typography>
      <Box sx={{ width: "87%", m: 1 }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body1" color={currTheme == 1 ? "white" : "black"}>
          {compeletedString}
        </Typography>
      </Box>
    </Box>
  );
});

export function ModuleCard(props) {
  const { module, onLessonClicked, progress } = props;
  const { name, fileName, image, description, id } = module;
  const { currTheme } = useStore(LearnerStore);

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

  if (progress != ChapterState.AvailableLater)
    return (
      <Card
        sx={{
          width: 200,
          height: 310,
          margin: 2,
          backgroundColor: backgroundColors[currTheme],
        }}
      >
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

        <Button size="small" onClick={onClick} sx={{ margin: 1, color: cardBodyContrastTextColor[currTheme] }}>
          {returnButtonText(progress)}
        </Button>
        {
          <Chip
            label={returnChipLabel(progress)}
            color={returnChipColor(progress)}
            variant="contained"
            sx={{ margin: 1 }}
          />
        }
      </Card>
    );
  else
    return (
      <Card
        sx={{
          width: 200,
          height: 310,
          margin: 2,
          backgroundColor: backgroundColors[currTheme],
        }} //background color added to mission cards
      >
        <Image
          alt={name}
          src={`/lessonImages/${image}`}
          width={200}
          height={150}
        ></Image>

        <CardContent>
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            display="flex"
            // borderRadius="2px"
            // paddingLeft={0.5}
            // justifyContent="center"
            // backgroundColor={topicColors[currTheme]}
            // color={secondaryTextColors[currTheme]}
          >
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        {
          <Chip
            label={returnChipLabel(progress)}
            // color={returnChipColor(progress)}
            variant="contained"
            fontWeight="bolder"
            sx={{
              margin: 1,
              backgroundColor: buttonColors[currTheme],
              color: buttonText[currTheme],
            }}
          />
        }
      </Card>
    );
}

export function MissionDashboard(props) {
  const messagesEndRef = React.useRef(null);
  var categoryMissionMapG = React.useRef(null);
  const [tabSelected, setTabSelected] = React.useState(ViewState.All);
  const [chapterCompleted, setChapterCompleted] = React.useState(null);
  const { currTheme } = useStore(LearnerStore);

  const {
    onLessonClicked,
    showInitialDashboard,
    moduleList,
    chapterProgress,
    quizProgress,
    retryQuizClicked,
    viewAllQuizClicked,
    reviewConceptClicked,
    viewAllConceptsClicked,
    quizList,
    conceptList,
    missionName
  } = props;

  console.log ("Mission name got is", missionName);

  const backToModulesClicked = (props) => {
    showInitialDashboard();
  };

  useEffect(() => {
    //console.log ("Chapter progress is", chapterProgress);
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []);

  React.useEffect(
    () => {
      gtag.event({
        action: 'pageview',
        category: 'missiondashboard',
        label: missionName,
      })
    },
    []
  );

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setTabSelected(newValue);
  };

  function distributChaptersInCategories() {
    var numChapterCompleted = 0;
    categoryMissionMapG.current = new Map();
    var categoryMissionMap = categoryMissionMapG.current;
    categoryMissionMap.set("In Progress/Up Next", []);
    categoryMissionMap.set("Completed", []);
    categoryMissionMap.set("Available Later", []);
    categoryMissionMap.set("Available", []);
    //console.log ("Module list is ", moduleList);
    for (var i = 0; i < moduleList.length; ++i) {
      //Iterate over all the missions
      var module = moduleList[i];

      switch (chapterProgress[module.id]) {
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

  const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    minWidth: 0,
    '&.Mui-selected': {
      color: '#FFFFFF',
    },
    color: 'rgba(0, 0, 0, 0.85)',
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  }));

  //Ideal view state should be
  //First should be visible, what is in-progress or up next
  //Second should be visible completed
  //Third Avalilable later
  const cardStyle = {m:2, maxWidth:"375px", minHeight:375}
  return (
    <React.Fragment>
      <Button
        variant="contained"
        ref={messagesEndRef}
        onClick={backToModulesClicked}
        startIcon={<ArrowBackIcon />}
        sx={{
          backgroundColor: buttonColors[currTheme],
          color: buttonText[currTheme],
          mt:2
        }}
      >
        Learning Home
      </Button>
      <LinearProgressWithLabel
        completed={chapterCompleted}
        total={moduleList.length}
      />
      <Fade in={true} timeout={1000}>
        <Grid container spacing={0} alignItems="flex-start" justifyContent="left">
          {quizProgress && (
            <Grid item xs={12} md={6} lg={4}>
              <MissionMessageDashboard
                chapterProgress={chapterProgress}
                chapterlist={moduleList}
                onLessonClicked={onLessonClicked}
                quizProgress={quizProgress}
                quizList={quizList}
                retryQuizClicked={retryQuizClicked}
                //sx={{ width: 360, height: 350, mt: 2 }}
                sx ={cardStyle}
              />
            </Grid>
          )}
          {quizProgress && (
            <Grid item xs={12} md={6} lg={4}>
              <LearnerScores
                products={quizList}
                quizProgress={quizProgress}
                //sx={{ width: 360, height: 350, mt: 2 }}
                sx ={cardStyle}
                retryQuizClicked={retryQuizClicked}
                viewAllQuizClicked={viewAllQuizClicked}
              />
            </Grid>
          )}
          {
            <Grid item xs={12} md={6} lg={4}>
              <LearnerConceptsLearned
                products={conceptList}
                reviewConceptClicked={reviewConceptClicked}
                viewAllConceptsClicked={viewAllConceptsClicked}
               // sx={{ width: 360, height: 350, mt: 2 }}
                sx ={cardStyle}
              />
            </Grid>
          }
         {false && <Box
            item
            xs={12}
            md={12}
            lg={12}
            sx={{ display: { xs: 'none', md: 'flex' }, mt: 2, backgroundColor: backgroundColors[currTheme] }}
          >
            <Tabs
              value={tabSelected}
              onChange={handleChange}
              aria-label="basic tabs example"
              allowScrollButtonsMobile
              variant="scrollable"
              sx={{maxWidth:"xs"}}
            >
              <AntTab label="All" value={ViewState.All} {...a11yProps(2)} />
              <AntTab label="In Progress/Up Next" value={ViewState.Available} />
              <AntTab label="Completed" value={ViewState.Completed} />
              <AntTab label="Available Later" value={ViewState.AvailableLater} />
            </Tabs>
          </Box>}
          {categoryMissionMapG.current &&
            [
              "In Progress/Up Next",
              "Completed",
              "Available",
              "Available Later",
            ].map((category) => {
              var categoryMissionMap = categoryMissionMapG.current;
              //console.log ("Categories are",category, "category mission map is ", categoryMissionMap.get(category).length);
              if (
                categoryMissionMap &&
                categoryMissionMap.has(category) &&
                categoryMissionMap.get(category).length > 0
              ) {
                return (
                  <React.Fragment key={category}>
                    {tabSelected == ViewState.All &&
                      categoryMissionMap.get(category).length > 0 && (
                        <Grid item xs={12} md={12} lg={12} sx={{ mt: 2 }}>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{ color: secondaryTextColors[currTheme] }}
                          >
                            {category}
                          </Typography>
                        </Grid>
                      )}

                    {categoryMissionMap.get(category).map((chapter) => {
                      //console.log ("Chapter is ", chapter);
                      return (
                        (chapterProgress[chapter.id] == tabSelected ||
                          tabSelected == ViewState.All) && (
                          <ModuleCard
                            key={chapter.id}
                            progress={chapterProgress[chapter.id]}
                            module={chapter}
                            onLessonClicked={onLessonClicked}
                          />
                        )
                      );
                    })}
                  </React.Fragment>
                );
              }
            })}
        </Grid>
      </Fade>
    </React.Fragment>
  );
}
