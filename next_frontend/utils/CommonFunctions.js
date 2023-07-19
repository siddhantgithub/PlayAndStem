import MuiAlert from '@mui/material/Alert';
import * as React from 'react';

export function stringAvatar(name) {
    return {
      sx: {
        bgcolor: "#AF2BBF",
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }

export const validateEmail = (email) => {
    var returnValue =  String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      //console.log ("Return value", returnValue);
      return returnValue;
  };

export const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });