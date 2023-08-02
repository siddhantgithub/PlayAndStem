import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Button } from '@mui/material';
import * as React from 'react';
import Image from 'next/image';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { stringAvatar } from "../../utils/CommonFunctions";
import Avatar from '@mui/material/Avatar';
import "../../utils/DateFormat";

function ListItemForLearnerActivity ({activity, learnerName})
{
  var activityDate = new Date(activity.time);
  //Message should be like - started this activity on Monday, July 4 at 2:00 am
  var dateString = activityDate.format ("dddd, mmmm dS, h:MM TT");
  switch (activity.activityType)
  {
    case "Chapter Started":
      return (
          <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={activity.activityType} {...stringAvatar(activity.activityType)} />
              </ListItemAvatar>
              <ListItemText
                primary= {`${learnerName } started a new chpater on ${dateString}`}
                secondary={
                  <React.Fragment>
                    Chapter Topic -  {activity.activityGoal}
                  </React.Fragment>
                }
              />
          </ListItem>
      );
      break;

    case "Chapter Ended":
        return (
          <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={activity.activityType} {...stringAvatar(activity.activityType)} />
              </ListItemAvatar>
              <ListItemText
                primary= {`${learnerName } ended a chpater on ${dateString}`}
                secondary={
                  <React.Fragment>
                    Chapter Topic - {activity.activityGoal}
                  </React.Fragment>
                }
              />
          </ListItem>
      );
      break;

    case "Quiz Completed":
      return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={activity.activityType} {...stringAvatar(activity.activityType)} />
            </ListItemAvatar>
            <ListItemText
              primary= {`${learnerName } completed a quiz at ${dateString}`}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {`${learnerName } scored ${activity.activityGoal}%`}
                  </Typography>
                </React.Fragment>
              }
            />
        </ListItem>
    );
      
      break;
  }
}

function GetListForLearnerActivity({activityArray,learnerName}) {
  return (
    <List sx={{ width: '100%', maxWidth: "lg", bgcolor: 'background.paper' }}>
      {
        activityArray.map ((activity)=>{
          return (
            <>
              <ListItemForLearnerActivity learnerName={learnerName} activity={activity}/>
              <Divider variant="inset" component="li" />
          </>

          );
        })
      }
    </List>
  );
}

function LearnerActivityDialog(props) {
    const { onClose, open, activityArray, learnerName} = props;
  
    const handleClose = () => {
      onClose();
    };
  
    return (
      <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="md">
        <DialogTitle>{learnerName}'s Recent Activity</DialogTitle>
        <DialogContent>
          <GetListForLearnerActivity activityArray={activityArray} learnerName={learnerName}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  export default LearnerActivityDialog