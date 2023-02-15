import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { useForm, Controller } from "react-hook-form";
import * as React from 'react';
import {SendAddLearnerPostRequest} from '../../actions/LearnersRequestHandler';


function AddLearnerDialog (props)
{
    const {open, onClose,storedUser } = props;
    const handleClose = () => {
        onClose();
    };

    const onSubmit = userdata => {
        userdata.parentid = storedUser._id;
        console.log(userdata);
        SendAddLearnerPostRequest(userdata).then(userdata => {});
    };

    const { handleSubmit, control, formState: { errors } } = useForm();
    
    return (
    <Dialog open={open}>
        <DialogTitle>Add Learner</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide learner's details below
          </DialogContentText>
          <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: 'Name required'}}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      autoComplete='off'
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      autoFocus
                    />
                )}
            />
          <Controller
                name="username"
                control={control}
                defaultValue=""
                rules={{ required: 'Username is required'}}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="username"
                      name="username"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      autoComplete='off'
                      autoFocus
                    />
                )}
            />
            <Controller
                name="age"
                control={control}
                defaultValue="4"
                rules={{ required: 'Age required', min: {
                  value: 3,
                  message: "Minimum age should be 3"
                }}}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      margin="normal"
                      type="number"
                      required
                      fullWidth
                      id="age"
                      label="Age"
                      name="Age"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      autoComplete='off'
                      autoFocus
                    />
                )}
            />

            <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: 'Password required' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="learnerpassword"
                      label="Password"
                      type="password"
                      id="learnerpassword"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      autoComplete='off'
                      autoFocus
                    />
                )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Learner
            </Button>
        </Box>
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
    </Dialog>
    );
}

export default AddLearnerDialog;