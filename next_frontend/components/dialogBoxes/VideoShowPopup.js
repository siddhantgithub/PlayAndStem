import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Button } from '@mui/material';
import * as React from 'react';
import Image from 'next/image';
import YouTube from 'react-youtube';

export default function VideoShowPopup(props) {
  console.log ("Video show popup called");
    const { onClose, open, videoId,altText } = props;
  
    const handleClose = () => {
      console.log ("Video show popup closed");
      onClose();
    };

    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    function _onReady(event) {
      // access to player in all event handlers via event.target
      //event.target.pauseVideo();
    }
  
    return (
      <Dialog onClose={handleClose} open={open}  maxWidth="md" sx={{width:800}}>
        <DialogTitle>Video</DialogTitle>
        <DialogContent>
          <YouTube videoId={videoId} opts={opts} onReady={_onReady} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>

      </Dialog>
    );
  }