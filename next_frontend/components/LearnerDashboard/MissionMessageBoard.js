import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import Grid from '@mui/material/Unstable_Grid2'; 
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

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
  SvgIcon
} from '@mui/material';

export const MissionMessageDashboard = (props) => {
  const { products = [], sx, quizProgress,retryQuizClicked, viewAllQuizClicked, hideViewAll= false} = props;
  //console.log ("Quiz progress is ", quizProgress);



  return (
    <Card sx={sx}>
      <CardHeader title="Welcome" />
      <Typography gutterBottom variant="body1" component="div" sx={{ m: 2 }}>
            Great job in completing the missions
            You can now review the concepts or you can retry few Quizzes
       </Typography>
    </Card>
  );

};