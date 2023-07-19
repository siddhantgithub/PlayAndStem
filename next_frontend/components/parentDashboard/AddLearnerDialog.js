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
import { GetSetParentDataThroughAPI } from '../../actions/ParentRequestHandler';
import { RequestTypeForParentLogin } from '../../constants/AllEnums';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


//TODO: Show loading
 const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddLearnerDialog (props)
{
    const {open, onClose,parentObj } = props;
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [severity, setSeverity] = React.useState('success');
    const [message, setMessage] = React.useState('');
    const [isDisabled, setIsDisabled] = React.useState(false);
    const { handleSubmit, control, formState: { errors },reset } = useForm();

    const handleClose = () => {
        reset();
        onClose();
    };

    const handleSnackBarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenSnackBar(false);
    };

    const onSubmit = userdata => {
      setIsDisabled(true);
      var reqObj = {reqType: RequestTypeForParentLogin.AddLearner, user: parentObj, learner: userdata};
      console.log ("Will get the learners information from the parent", reqObj);
      GetSetParentDataThroughAPI(reqObj).then ((resp) => {
          console.log ("Data got for the learner is", resp);
          setOpenSnackBar(true);
          if (!!resp.error) {
            //setValues({ ...values, error: data.error, loading: false });
            setSeverity("error");
            setMessage(resp.error);
            setIsDisabled(false);
        } else {
            // save user token to cookie
            // save user info to localstorage
            // authenticate user
            setSeverity("success");
            setMessage("Learner Added Successfully");
            reset();
            setTimeout (onClose,1000,true);
        }
      }); 
    };
    
    return (
    <Dialog open={open}>
        <DialogTitle>Add A Learner</DialogTitle>
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
              disabled = {isDisabled}
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
        <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleSnackBarClose} anchorOrigin={{ vertical:'top', horizontal:'center' }}>
            <Alert onClose={handleSnackBarClose} severity={severity} sx={{ width: '100%' }}>
              {message}
            </Alert>
        </Snackbar>
    </Dialog>
    );
}

export default AddLearnerDialog;