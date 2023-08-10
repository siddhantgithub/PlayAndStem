import * as React from 'react';
import Typography from '@mui/material/Typography';
import { signIn, signOut, useSession } from "next-auth/react"
import {LessonText} from '../../assets/lessons/FirstLoginConversation'
import { useStore } from "zustand";
import LearningConversation from '../ChatInterface/ShowLearningConversationWithAnimation';
import {Grid} from '@mui/material'
import Image from 'next/image'
import Divider from '@mui/material/Divider';
import groovyWalkAnimation from "../../assets/lottie-animations/main-buddy.json";
import Lottie from "lottie-react";
import Stack from '@mui/material/Stack';
import { Container } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { GetSetLearnerDataThroughAPI } from '../../actions/LearnerMissionProgressRequestHandler';
import { InputAdornment, IconButton } from "@mui/material"
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { sendLearnerSignupPostRequest } from '../../actions/authRequestHandlers';
import { validateEmail, Alert } from '../../utils/CommonFunctions';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AccountBaseScreen from '../AccountCreationLogin/AccountBaseScreen';

//Need to rethink how TopChatbotComponent works as this is crucial for engagement
//How the engagement will change. Let's identify different states
//State 1 - Initial conversation
//State 2 - Suggest a mission or a chapter - Started a mission - you have started this mission, want to go to the next chapter
//State 3 - Suggest to revise a concept 
//State 4 - Recently completed a chapter or a quiz 
//State 5 - Answer a question --> Later
//Jokes and stories should be at the start of a chapter
export default function LearnerAccountFlow (props)
{
    const TextInputIndexes = {
        username:0,
        name:1,
        password:2,
        parentEmail:3,
    };

    const maxLengthLearnerUserName = 16;
    const maxLengthName = 36;
    const minPasswordLength = 6;
    const maxPasswordLength = 15;
    const [name,setName] = React.useState("");
    const [username,setUserName] = React.useState("");
    const [parentEmail,setParentEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [textInputLabels, setTextInputLabels] = React.useState([]);
    const [textInputHelperText, setTextInputHelperText] = React.useState([]);
    const [textInputError, setTextInputError] = React.useState([]);
    const [buttonDisableArray, setButtonDisableArray] = React.useState([]);
    // Add these variables to your component to track the state
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [severity, setSeverity] = React.useState('success');
    const [message, setMessage] = React.useState('');
    const [createdLearnerId, setCreatedLearnerId] = React.useState(null);
    
    
    React.useLayoutEffect (() => {
        var inputLabelsArray = [];
        inputLabelsArray[TextInputIndexes.username] = "username";
        inputLabelsArray[TextInputIndexes.name] = "name";
        inputLabelsArray[TextInputIndexes.password] = "password";
        inputLabelsArray[TextInputIndexes.parentEmail] = "parent-email";
        setTextInputLabels(inputLabelsArray); 
        
        var inputHelperTextArray = [];
        inputHelperTextArray[TextInputIndexes.username] = `Username should be between 4 - ${maxLengthLearnerUserName} characters`;
        inputHelperTextArray[TextInputIndexes.name] = `Name should be between 4 - ${maxLengthName} characters`;
        inputHelperTextArray[TextInputIndexes.password] = `Password should be between ${minPasswordLength} - ${maxPasswordLength} characters`;
        inputHelperTextArray[TextInputIndexes.parentEmail] = "Enter your parent's or guardian's email";
        setTextInputHelperText(inputHelperTextArray); 

        var inputErrorTextArray = [];
        inputErrorTextArray[TextInputIndexes.username] = false;
        inputErrorTextArray[TextInputIndexes.name] = false;
        inputErrorTextArray[TextInputIndexes.password] = false;
        inputErrorTextArray[TextInputIndexes.parentEmail] = false;
        setTextInputError(inputErrorTextArray); 

        var buttonDisableArray = [];
        buttonDisableArray[TextInputIndexes.username] = true;
        buttonDisableArray[TextInputIndexes.name] = true;
        buttonDisableArray[TextInputIndexes.password] = true;
        buttonDisableArray[TextInputIndexes.parentEmail] = true;
        setButtonDisableArray(buttonDisableArray); 
    },[])

    var allUserNameList = React.useRef(null);

    const router = useRouter()

    const LearnerLoginState = {
        AskForAccount:0,
        CreateAccountUsername:1, 
        CreateAccountPassword:2,
        CreateAccountName:3,
        CreateAccountParentEmail:4,
        LoginScreen:5,
        AccountCreated:6
    };

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnackBar(false);
      };

    const onCreateAccount = evt => {
        var data = { firstname:name, lastname:"na", username:username, parentemail:parentEmail, password:password }
        sendLearnerSignupPostRequest(data).then(resp => {
          if (Object.keys(resp)[0] == "error")
          {
            console.log ("Error occurred", resp.error)
            setSeverity("error");
            setMessage(resp.error);
          }
          else
          {
            //Operation was successful
            //router.push("/SignIn")
            setSeverity("success");
            setMessage(resp.message);
            setCreatedLearnerId(resp.id);
            setLoginState(LearnerLoginState.AccountCreated);
            //setTimeout(router.push("/"),2000);
            //reset();
          }
          setOpenSnackBar(true);
        });
    };

    //getAllUserNameList();

    const [loginState, setLoginState] = React.useState(LearnerLoginState.CreateAccountName);
    //console.log ("Login state is", loginState);
  
    React.useEffect(() => {
        if (loginState == LearnerLoginState.CreateAccountUsername)
        {
            setAllUserNameList();
        }
      //if (loading) return // Do nothing while loading
      //if (!isUser) signIn() // If not authenticated, force log in
    }, [loginState])

    const lessonEndReached = (props) => {
    //setLessonInProgress(false);
    }

    function setAllUserNameList ()
    {
        //console.log ("Get all user name list called", allUserNameList);
        if (allUserNameList.current == null)
        {
            var reqType = "GETALLLEARNERUSERNAME";
            var reqObj = { reqType};
            GetSetLearnerDataThroughAPI(reqObj).then((resp) => {
                //console.log ("resp is", resp.usernameArray );
                allUserNameList.current = resp.usernameArray;
            //setChapterProgress(resp.chapterProgress);
            //console.log ("Chapter progress xxxxx", chapterProgress, resp.chapterProgress[clickedMission.id]);
            });
        }
        else
            return allUserNameList.current;
    }

    const loginCreatedUser = (evt) => {
        //console.log("Login created user called");
        signIn("learnerlogin", {
          username: username,
          password: password,
          redirect: false,
        }).then((data) => {
          console.log("The data received is ", data);
          setOpenSnackBar(true);
          if (!!data.error) {
            //setValues({ ...values, error: data.error, loading: false });
            setSeverity("error");
            setMessage(
              "Cannot Login now."
            );
          } else {
            // save user token to cookie
            // save user info to localstorage
            // authenticate user
            setSeverity("success");
            setMessage("Login successful. Redirecting to Learner Dashboard");
            router.push("/");
          }
        });
      };

    function textFieldValueChange(evt)
    {
        var varIndexToUse;
        switch (loginState)
        {
            case LearnerLoginState.CreateAccountUsername:
                setUserName(evt.target.value);
                //console.log ("All username list is", allUserNameList.current);
                if (evt.target.value.length < 4 || evt.target.value.length > maxLengthLearnerUserName )
                {
                    setTextInputError((currentArray) => {currentArray[TextInputIndexes.username] = true; return currentArray;});
                    setTextInputHelperText((currentArray) => {currentArray[TextInputIndexes.username] = `Username should be between 4 - ${maxLengthLearnerUserName} characters`; return currentArray;});
                    setButtonDisableArray((currentArray) => {currentArray[TextInputIndexes.username] = true; return currentArray});
                }
                else if (allUserNameList.current.indexOf (evt.target.value) > -1)
                {
                    //the user name is taken
                    setTextInputError((currentArray) => {currentArray[TextInputIndexes.username] = true; return currentArray;});
                    setTextInputHelperText((currentArray) => {currentArray[TextInputIndexes.username] = "Username already taken. Please try another one"; return currentArray;});
                    setButtonDisableArray((currentArray) => {currentArray[TextInputIndexes.username] = true; return currentArray});
                }
                else
                {
                    setTextInputError((currentArray) => {currentArray[TextInputIndexes.username] = false; return currentArray;});
                    setTextInputHelperText((currentArray) => {currentArray[TextInputIndexes.username] = "Username available. Click next to proceed"; return currentArray;});
                    setButtonDisableArray((currentArray) => {currentArray[TextInputIndexes.username] = false; return currentArray});
                }
                break;

            case LearnerLoginState.CreateAccountName:
                setName(evt.target.value);
                varIndexToUse = TextInputIndexes.name;
                //console.log ("All username list is", allUserNameList.current);
                if (evt.target.value.length < 4 || evt.target.value.length > maxLengthName )
                {
                    setTextInputError((currentArray) => {currentArray[varIndexToUse] = true; return currentArray;});
                    setTextInputHelperText((currentArray) => {currentArray[varIndexToUse] = `Name should be between 4 - ${maxLengthName} characters`; return currentArray;});
                    setButtonDisableArray((currentArray) => {currentArray[varIndexToUse] = true; return currentArray});
                }
                else
                {
                    setTextInputError((currentArray) => {currentArray[varIndexToUse] = false; return currentArray;});
                    setTextInputHelperText((currentArray) => {currentArray[varIndexToUse] = "Click next to proceed"; return currentArray;});
                    setButtonDisableArray((currentArray) => {currentArray[varIndexToUse] = false; return currentArray});
                }
                break;

            case LearnerLoginState.CreateAccountPassword:
                setPassword(evt.target.value);
                varIndexToUse = TextInputIndexes.password;
                //console.log ("All username list is", allUserNameList.current);
                if (evt.target.value.length < 4 || evt.target.value.length > maxLengthLearnerUserName )
                {
                    setTextInputError((currentArray) => {currentArray[varIndexToUse] = true; return currentArray;});
                    setTextInputHelperText((currentArray) => {currentArray[varIndexToUse] = `Password should be between ${minPasswordLength} - ${maxPasswordLength} characters`; return currentArray;});
                    setButtonDisableArray((currentArray) => {currentArray[varIndexToUse] = true; return currentArray});
                }
                else
                {
                    setTextInputError((currentArray) => {currentArray[varIndexToUse] = false; return currentArray;});
                    setTextInputHelperText((currentArray) => {currentArray[varIndexToUse] = "Click create account"; return currentArray;});
                    setButtonDisableArray((currentArray) => {currentArray[varIndexToUse] = false; return currentArray});
                }
                break;

            case LearnerLoginState.CreateAccountParentEmail:
                setParentEmail(evt.target.value);
                varIndexToUse = TextInputIndexes.parentEmail;
                //console.log ("All username list is", allUserNameList.current);
                if (!validateEmail(evt.target.value))
                {
                    setTextInputError((currentArray) => {currentArray[varIndexToUse] = true; return currentArray;});
                    setTextInputHelperText((currentArray) => {currentArray[varIndexToUse] = `Please enter a valid email`; return currentArray;});
                    setButtonDisableArray((currentArray) => {currentArray[varIndexToUse] = true; return currentArray});
                }
                else
                {
                    setTextInputError((currentArray) => {currentArray[varIndexToUse] = false; return currentArray;});
                    setTextInputHelperText((currentArray) => {currentArray[varIndexToUse] = "Click next to proceed"; return currentArray;});
                    setButtonDisableArray((currentArray) => {currentArray[varIndexToUse] = false; return currentArray});
                }
                break;
        }
    }


    function backButtonClicked (evt)
    {
        evt.preventDefault();
        console.log ("Login state currently is", loginState,LearnerLoginState.CreateAccountParentEmail);
        switch (loginState)
        {
            case LearnerLoginState.AskForAccount:
                router.push("/AccountLandingScreen")
                //Need to send to Landing screen
                break;

            case LearnerLoginState.CreateAccountName:
            case LearnerLoginState.LoginScreen:
                router.push("/")
                //setLoginState(LearnerLoginState.AskForAccount);
                break;

            case LearnerLoginState.CreateAccountPassword:
                console.log ("Setting new state now", LearnerLoginState.CreateAccountParentEmail);
                setLoginState(LearnerLoginState.CreateAccountParentEmail);
                break;

            case LearnerLoginState.CreateAccountUsername:
                setLoginState(LearnerLoginState.CreateAccountName);
                break;

            case LearnerLoginState.CreateAccountParentEmail:
                setLoginState(LearnerLoginState.CreateAccountUsername);
                break;    
        }
    }

    return (
      <AccountBaseScreen TitleText={"LET's CREATE YOUR ACCOUNT"} ShowHomeButton={true} passedBackButtonClicked={backButtonClicked}>
            <Stack  direction="column" sx={{ mb: 1, mt:2 }} alignItems="center">
                {
                    loginState == LearnerLoginState.AskForAccount && 
                    <Stack  direction="row" sx={{ mb: 1, mt:2 }} alignItems="center">
                            <Stack spacing={5}>
                                <Typography variant="h5" sx={{ px: 5 }}>
                                    Do you have an account?
                                </Typography>
                                <Button variant="contained" sx={{ mb: 0 }} onClick = {(evt) => {router.push("/LearnerLogin")}}>Yes</Button>
                                <Button variant="contained" sx={{ mb: 0 }} onClick = {(evt) => {setLoginState(LearnerLoginState.CreateAccountName)}}>No</Button>
                            </Stack>
                    </Stack>
                }
                {
                    loginState == LearnerLoginState.CreateAccountName && 
                    <Stack  direction="row" sx={{ mb: 1, mt:2, maxWidth:"sm" }} alignItems="center">
                        <Stack spacing={5}>
                            <Typography variant="h5" >
                                    Please enter your name
                            </Typography>
                            <TextField   helperText = {textInputHelperText[TextInputIndexes.name]} error = {textInputError[TextInputIndexes.name]} name="name-learner"  autoComplete='off' inputProps={{autoComplete: "off"}} value={name} onChange={textFieldValueChange} autoFocus/>
                            <Button disabled = {buttonDisableArray[TextInputIndexes.name]} variant="contained" sx={{ mb: 0 }} onClick = {(evt) => {setLoginState(LearnerLoginState.CreateAccountUsername)}}>Next</Button>
                        </Stack>
                    </Stack>
                }
                {
                    loginState == LearnerLoginState.CreateAccountUsername && 
                    <Stack  direction="row" sx={{ mb: 1, mt:2 }} alignItems="center">
                        <Stack spacing={5}>
                            <Typography variant="h5" >
                                Please select a username
                            </Typography>
                            <TextField   helperText = {textInputHelperText[TextInputIndexes.username]} error = {textInputError[TextInputIndexes.username]} name="user-name-learner"  autoComplete='off' inputProps={{autoComplete: "off"}} value={username} onChange={textFieldValueChange} autoFocus/>
                            <Button disabled = {buttonDisableArray[TextInputIndexes.username]} variant="contained" sx={{ mb: 0 }} onClick = {(evt) => {setLoginState(LearnerLoginState.CreateAccountParentEmail)}}>Next</Button>
                        </Stack>
                    </Stack>
                }
                {
                    loginState == LearnerLoginState.CreateAccountParentEmail && 
                    <Stack  direction="row" sx={{ mb: 1, mt:2 }} alignItems="center">
                        <Stack spacing={5}>
                            <Typography variant="h5" align='center'>
                                    Please enter your parent's email
                            </Typography>

                            <TextField   helperText = {textInputHelperText[TextInputIndexes.parentEmail]} error = {textInputError[TextInputIndexes.parentEmail]} name="parent-email"  autoComplete='off' inputProps={{autoComplete: "off"}} value={parentEmail} onChange={textFieldValueChange} autoFocus/>

                            <Button disabled = {buttonDisableArray[TextInputIndexes.parentEmail]} variant="contained" sx={{ mb: 0 }} onClick = {(evt) => {setLoginState(LearnerLoginState.CreateAccountPassword)}}>Next</Button>
                        </Stack>
                    </Stack>
                }
                {
                    loginState == LearnerLoginState.CreateAccountPassword && 
                    <Stack  direction="row" sx={{ mb: 1, mt:2 }} alignItems="center">
                        <Stack spacing={5}>
                            <Typography variant="h5" >
                                    Please enter the password you want to use
                            </Typography>
                            <TextField    type={showPassword ? "text" : "password"} 
                                 InputProps={{ // <-- This is where the toggle button is added.
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={handleClickShowPassword}
                                          onMouseDown={handleMouseDownPassword}
                                        >
                                          {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                      </InputAdornment>
                                    )
                                  }}
                                helperText = {textInputHelperText[TextInputIndexes.password]} error = {textInputError[TextInputIndexes.password]} name="name-learner"  autoComplete='off' inputProps={{autoComplete: "off"}} value={password} onChange={textFieldValueChange} autoFocus/>
                            <Button disabled = {buttonDisableArray[TextInputIndexes.password]} variant="contained" sx={{ mb: 0 }} onClick = {onCreateAccount}>Create Account</Button>
                        </Stack>
                    </Stack>
                }
                {
                    loginState == LearnerLoginState.AccountCreated && 
                    <Stack  direction="row" sx={{ mb: 1, mt:2 }} alignItems="center">
                            <Stack spacing={5}>
                                <Typography variant="h5" >
                                    Greate job! Your account has been successfully created. 
                                </Typography>
                                <Typography variant="body1" >
                                    Click start learning below to login
                                </Typography>
                                <Button variant="contained" sx={{ mb: 0 }} onClick = {loginCreatedUser}>Start Learning</Button>
                            </Stack>
                    </Stack>
                }
                <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleSnackBarClose} anchorOrigin={{ vertical:'top', horizontal:'center' }}>
                    <Alert onClose={handleSnackBarClose} severity={severity} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
            </Stack>

      </AccountBaseScreen>
    );
}