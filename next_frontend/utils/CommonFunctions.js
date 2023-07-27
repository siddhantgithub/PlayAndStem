import MuiAlert from '@mui/material/Alert';
import * as React from 'react';
import { sendLearnerSignupPostRequest } from '../actions/authRequestHandlers';
import { signIn } from 'next-auth/react';

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

export const CreateGuestLearnerAccount = evt => 
{ 
    var randomGuestName = "Guest" + Date.now(); 
    var data = { firstname:"Guest User", lastname:"na", username:randomGuestName, parentemail:'guest@guest.com', password:randomGuestName};
    sendLearnerSignupPostRequest(data).then(resp => 
    {
      if (Object.keys(resp)[0] == "error")
      {
        console.log ("Error occurred", resp.error);
        //setSeverity("error");
        //setMessage(resp.error);
      }
      else
      {
        signIn("learnerlogin", {
          username: randomGuestName,
          password: randomGuestName,
          redirect: false,
        }).then((data) => {
          console.log("The data received is ", data);
          //setOpenSnackBar(true);
          if (!!data.error) {
            //setValues({ ...values, error: data.error, loading: false });
            //setSeverity("error");
            //setMessage(
              //"Cannot Login now."
            //);
          } else {
            // save user token to cookie
            // save user info to localstorage
            // authenticate user
            //setSeverity("success");
            //setMessage("Login successful. Redirecting to Learner Dashboard");
            //router.push("/main/LearnerDashboard_new");
          }
        });
      }
      //setOpenSnackBar(true);
    });
};