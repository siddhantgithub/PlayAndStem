import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import Grid from '@mui/material/Unstable_Grid2'; 
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple,deepGreen } from '@mui/material/colors';

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

export const TQG_ViewState = {
  HighScores: 0, 
  TopGames: 1, //Represents both available and in-progress as both will be visible in the same tab 
  YourGames: 2, //Represents both available and in-progress as both will be visible in the same tab 
}

export const TopQuizGames = (props) => {
  const { products = [], sx, quizProgress,retryQuizClicked, viewAllQuizClicked, hideViewAll= false} = props;
  //console.log ("Quiz progress is ", quizProgress);

  const [tabSelected, setTabSelected] = React.useState(TQG_ViewState.HighScores);
  //console.log ("Quiz progress is ", quizProgress);

  const handleChange = (event, newValue) => {
    setTabSelected(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


  return (
    <Card sx={sx}>
      <CardHeader title="Games" />
      <Tabs value={tabSelected} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="High Scores" value = {TQG_ViewState.HighScores} {...a11yProps(0)} />
            <Tab label="Top Games" value = {TQG_ViewState.TopGames} {...a11yProps(1)} />     
            <Tab label="Your Games" value = {TQG_ViewState.YourGames} {...a11yProps(2)} />
      </Tabs>
      <List>
        {products.map((product, index) => {
          const hasDivider = index < products.length - 1;
          const ago = product.updatedAt;

          return (
            <ListItem
              divider={hasDivider}
              key={product.id}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: product.color }}>{product.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={ago}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <Button size="small">{product.score}</Button>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );

};