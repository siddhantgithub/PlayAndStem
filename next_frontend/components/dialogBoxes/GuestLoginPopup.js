import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Button } from '@mui/material';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import { useRouter } from "next/router";
import { CreateGuestLearnerAccount } from '../../utils/CommonFunctions';


function AskGuestLoginPopup(props) {
    const { onClose} = props;
    const [questionFieldValue,setQuestionFieldValue] = React.useState("");

    const [open, setOpen] = React.useState(true);
    const [askButtonDisabled, setAskButtonDisabled] = React.useState(true);
    const router = useRouter();
  
    const handleClose = () => {
      //setOpen(false);
    };

    function onChange (event) {

      setQuestionFieldValue(event.target.value);
      if (event.target.value.length > 10)
        setAskButtonDisabled(false);
    }

    function continueAsGuest (event) {
      //setOpen (false);
      //onQuestionClicked (event, interactiontype,{text:questionFieldValue,context:context} );
      //open = false;
      CreateGuestLearnerAccount();
    }

    function createAnAccount (event)
    {
      router.push("/");

    }
  
    return (
      <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="sm">
        <DialogTitle>Guest Login</DialogTitle>
        <DialogContent>
          <Typography  variant="body1">
             Want to continuse as guest or create an account?
          </Typography>          
          <Typography  variant="body2" sx={{mt:2}}>
             Please create an account if you want to save your progress
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={continueAsGuest} sx={{textAlign:"left", mt:2, textTransform: "none"}}>Continue As a Guest</Button>
          <Button variant="contained" onClick={createAnAccount} sx={{textAlign:"left", mt:2, textTransform: "none"}}>Create An Account</Button>
        </DialogActions>

      </Dialog>
    );
  }

  export default AskGuestLoginPopup