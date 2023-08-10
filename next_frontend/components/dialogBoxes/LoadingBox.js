import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { CairAnimation_Dialog } from '../ChatInterface/CairoAnimations';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeMute';
import VolumeUp from '@mui/icons-material/VolumeUp';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';



export default function LoadingDialogBox(props) {
  const {onClose, loadingText,open, showLoadingSymbol, showOkButton = false, okButtonText = "Ok", onOkButtonClicked = null } = props;

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm">
      <DialogContent style={{ overflow: "hidden" }}>
      <Grid container spacing={3}  alignItems= "center" justifyContent="center" p={2}>
        <Grid item xs={3} md={3} lg={5}>
            <CairAnimation_Dialog/>
        </Grid>
        <Grid item xs={9} md={9} lg={7}>
          <Box display="flex" alignItems="center"  flexDirection="column" >
          <Typography gutterBottom variant="body1" component="div" align="center" sx={{color:"#212121", mb:2}}>
              {loadingText}
          </Typography>
          {showLoadingSymbol && <CircularProgress />}
          </Box>
        </Grid>
        {showOkButton && <Grid item xs={12} md={12} lg={12}  display="flex" justifyContent="center">
        <Button variant="contained"  onClick = {onOkButtonClicked} sx={{
                            textTransform: "none",
                          }}>
                            {okButtonText}
                    </Button>

        </Grid>}
      </Grid>
      </DialogContent>
    </Dialog>
  );
}