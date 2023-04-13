import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Button } from '@mui/material';
import * as React from 'react';

function MissionLockedDialog(props) {
    const { onClose, open, dialogText } = props;
  
    const handleClose = () => {
      onClose();
    };
  

  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Mission Not Avaible</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>

      </Dialog>
    );
  }

  export default MissionLockedDialog