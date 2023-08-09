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
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function VideoShowPopup(props) {
  console.log ("Video show popup called");
    const { onClose, open, videoId,altText } = props;
  
    const handleClose = () => {
      console.log ("Video show popup closed");
      onClose();
    };

    const theme = useTheme();

    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

    var opts;

    if (isMatch)
    {
        opts = {
        height: '180',
        width:'300',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
    }
    else
    {
      opts = {
        height: '390',
        width:'640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
    }

    function _onReady(event) {
      // access to player in all event handlers via event.target
      //event.target.pauseVideo();
    }
  
    return (
      <Dialog onClose={handleClose} open={open}  maxWidth="md" >
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