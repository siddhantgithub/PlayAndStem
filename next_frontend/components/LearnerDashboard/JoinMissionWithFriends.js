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

export const MWF_ViewState = {
    JoinMission: 0, 
    OnGoingMissions: 1, //Represents both available and in-progress as both will be visible in the same tab 
  }

export const MissionWithFriends = (props) => {
  const { products = [], sx, quizProgress,retryQuizClicked, viewAllQuizClicked, hideViewAll= false} = props;
  const [tabSelected, setTabSelected] = React.useState(MWF_ViewState.JoinMission);
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
      <CardHeader title="Learn With Friends" />
      <Tabs value={tabSelected} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Join A Mission" value = {MWF_ViewState.JoinMission} {...a11yProps(0)} />
            <Tab label="Your Missions" value = {MWF_ViewState.OnGoingMissions} {...a11yProps(1)} />     
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
                {
                  product.image
                    ? (
                      <Box
                        component="img"
                        src={product.image}
                        sx={{
                          borderRadius: 1,
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                    : (
                      <Box
                        sx={{
                          borderRadius: 1,
                          backgroundColor: 'neutral.200',
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                }
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={ago}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <Button size="small">Join</Button>
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