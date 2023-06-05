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

function QuestionAskPopup(props) {
    const { onClose, onQuestionClicked} = props;
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
      onQuestionClicked (event, "askquestion",questionFieldValue );
      //open = false;

    }
  

  
    return (
      <Dialog onClose={handleClose} open={open} fullWidth={true}
      maxWidth="sm">
        <DialogTitle>Ask A Question</DialogTitle>
        <DialogContent>
          <TextField
            id="filled-multiline-flexible"
            label="Enter Question (min 10 chars)"
            multiline
            maxRows={4}
            variant="filled"
            value = {questionFieldValue}
            onChange = {onChange}
            fullWidth 
          />
        </DialogContent>
        <DialogActions>
          <Button disabled = {askButtonDisabled} variant="contained" onClick={askQuestion} sx={{textAlign:"left", mt:2, textTransform: "none"}}>Ask</Button>
        </DialogActions>

      </Dialog>
    );
  }

  export default QuestionAskPopup