import * as React from 'react';
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


export default function CairoSettingDialog(props) {
  const { onClose, value: valueProp, open, currentVoice, ...other } = props;
  const [volumeValue, setVolumeValue] = React.useState(valueProp);
  const [voice, setVoice] = React.useState(currentVoice);
  const [voiceArray, setVoiceArray] = React.useState(null);

  React.useEffect(() => {
    if (!open) {
        setVolumeValue(valueProp);
    }

    const va = window.speechSynthesis.getVoices();
    console.log ("Voice array is", va);
    if (va.length > 0)
    {
        setVoiceArray(va);
        //setVoice(va[0].name);
    }
  }, [valueProp, open]);


  const handleCancel = () => {
    onClose(-1,-1);
  };

  const handleOk = () => {
    onClose(volumeValue,voice);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolumeValue(newValue);
  };

  const handleVoiceChange = (event) => {
    setVoice(event.target.value);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle>Settings</DialogTitle>
      <DialogContent >
      <Stack spacing={2} direction="row" sx={{ mb: 1, mt:2 }} alignItems="center">
        <VolumeDown />
        <Slider aria-label="Volume" value={volumeValue} onChange={handleVolumeChange}/>
        <VolumeUp />

      </Stack>
      <Stack spacing={2} direction="row" sx={{ mb: 1, mt:2, justifyContent: 'space-evenly' }} alignItems="center">
        Select Voice:  
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={voice}
            label="Voice"
            onChange={handleVoiceChange}
            >
                {typeof window !== "undefined" && voiceArray && voiceArray.map((voice) => {
                    return <MenuItem value={voice.name} key={voice.name}>{voice.name}</MenuItem>;
}               )}
                
        </Select>
     </Stack>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}