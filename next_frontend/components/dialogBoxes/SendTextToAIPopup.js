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

function SendTextToAIPopup(props) {
    const { onClose, onQuestionClicked,interactiontype,context} = props;
    const [questionFieldValue,setQuestionFieldValue] = React.useState("");

    const [open, setOpen] = React.useState(true);
    const [askButtonDisabled, setAskButtonDisabled] = React.useState(true);
  
    const handleClose = () => {
      onClose();
    };

    function onChange (event) {

      setQuestionFieldValue(event.target.value);
      if (event.target.value.length > 10)
        setAskButtonDisabled(false);
    }

    function askQuestion (event) {
      setOpen (false);
      onQuestionClicked (event, interactiontype,{text:questionFieldValue,context:context} );
      //open = false;
    }

    function onKeyPressed (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        console.log ("Enter key pressed");
        askQuestion(event);
      }

    }
  
    return (
      <Dialog onClose={handleClose} open={open} fullWidth={true}
      maxWidth="sm">
        <DialogTitle>{interactiontype == "askquestion"? "Ask A Question": "Share Your Thoughts"}</DialogTitle>
        <DialogContent>
          <TextField
            id="filled-multiline-flexible"
            label="Enter min 10 characters"
            multiline
            maxRows={4}
            variant="filled"
            value = {questionFieldValue}
            onChange = {onChange}
            onKeyPress = {onKeyPressed}
            fullWidth 
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button disabled = {askButtonDisabled} variant="contained" onClick={askQuestion} sx={{textAlign:"left", mt:2, textTransform: "none"}}>{interactiontype == "askquestion"? "Ask": "Share"}</Button>
        </DialogActions>

      </Dialog>
    );
  }

  export default SendTextToAIPopup