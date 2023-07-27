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

export function FunWithFriends ()
{
    return (

        <Grid container spacing={0} alignItems="center" justifyContent="left">
          <Grid item xs={12} md={4} lg={4}>
                "Fun with friends. We are working on it. Coming soon..."
            </Grid>
        </Grid>
    );
}