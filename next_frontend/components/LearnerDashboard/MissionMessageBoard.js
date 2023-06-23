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
    <Card sx={{ width: 200, height: 250, margin: 2 }}>
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
  const { chapterProgress, chapterlist, sx, onLessonClicked } = props;
  const { currTheme } = useStore(LearnerStore);

  const firstAvailableId = chapterProgress.findIndex(
    (elem) => elem == ChapterState.Available || elem == ChapterState.InProgress
  );
  if (firstAvailableId != -1) {
    //This should be displayed first
    return (
      <Paper sx={sx}>
        <CardHeader title="Next Chapter" />
        <ModuleCardForMessage
          key={firstAvailableId}
          progress={chapterProgress[firstAvailableId]}
          module={chapterlist[firstAvailableId]}
          onLessonClicked={onLessonClicked}
        />
      </Paper>
    );
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
        Great job in completing all the chapters in the mission You can now
        review the concepts or you can retry few Quizzes
      </Typography>
    </Card>
  );
};
