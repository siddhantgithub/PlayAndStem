
import * as React from 'react';
import { useEffect } from 'react';
import Container from '@mui/material/Container';
import {LessonText} from '../../assets/lessons/introduction'
import {LessonText1} from '../../assets/lessons/MicroBitMissionIntroduction'
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Router from 'next/router';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
//import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import dynamic from 'next/dynamic'
import {PythonCodeComponent,ChatBotMessage} from './MessageTypeComponents'
import Button from '@mui/material/Button';

const PythonEditor = dynamic(
    () => import("../ace-editor/PythonEditor"),
    { ssr: false }
  )

const AnswerStatus = {
    Not_Answered: "notanswered",
    Answered_Incorrect: "answeredincorrect",
    Answered_Correct: "answeredcorrect",
  }

//Need to rended with delay
//Can add set time out but need to think of a better way
const ChatBotConversation = (props,ref) => {
    const {messageStack} = props;

    return (
        <Box>
        {
            messageStack.map((msg) => {
                return (
                    <ChatBotMessage message = {msg } />
                )
            })
        }
        </Box>
    )
}

//Problem: We have to change the layout to show Python editor next to the conversation
//That will involve change in the layout
//Solution - if Python editor conversation, show a different component
//Make a new component that takes in Python editor conversation and we just show that conversation
function PythonCodeComponentWithMessages (props) {
    var key = 0;
    const {blockToExecute,onDone} = props;
    var currentPythonCode = React.useRef("");
    var correctCode = React.useRef("");

    var incorrectMessageStack = React.useRef(blockToExecute.responseAction.incorrect);
    const initialMessageStack = blockToExecute.messageStack;
    const correctMessageStack = blockToExecute.responseAction.correct;


    const [chatBotMsgStack,setChatBotMsgStack] = React.useState (blockToExecute.messageStack);
    const [currentState,setCurrentState] = React.useState (AnswerStatus.Not_Answered);

    correctCode.current = blockToExecute.correctCode;

    function getButtonTextFromState(currentState)
    {
        switch (currentState)
        {
            case AnswerStatus.Not_Answered:
                return "Check";

            case AnswerStatus.Answered_Correct:
                return "Next";

            case AnswerStatus.Answered_Incorrect:
                return "Try Again";
        }

    }

    function checkPythonCode ()
    {
        //console.log ("herer", currentPythonCode.current, data.correctCode);
        currentPythonCode.current.replace(/(?:\r\n|\r|\n)/g, '');
        console.log (currentPythonCode.current, correctCode.current);
        //console.log ("Answer and code match", currentPythonCode.current.localeCompare(data.correctCode));
        if (currentPythonCode.current.localeCompare(correctCode.current) == 0)
        { 
            console.log ("Code is correct");
            setChatBotMsgStack(correctMessageStack);
            setCurrentState(AnswerStatus.Answered_Correct);
            //We can now move on with the next steps
        }
        else
        {
            console.log ("Code is not correct")
            setChatBotMsgStack(incorrectMessageStack.current);
            setCurrentState(AnswerStatus.Answered_Incorrect);
            //The problem, code can be termed incorrect even if the number of spaces don't match
            //We need to figure out how to overcome that
            //simple solution can be, 
        }
        return;
    }

    function onChangePythonCode (value) {
        console.log("change", value);
        currentPythonCode.current = value;
        
        //currentPythonCode.current = value;
    }

    function handleCheckClicked()
    {
        switch (currentState)
        {
            case AnswerStatus.Not_Answered:
                //Check code clicked
                checkPythonCode();
                break;

            case AnswerStatus.Answered_Correct:
                //Need to tell the main component to take charge
                //setChatBotMsgStack(initialMessageStack);
                onDone();
                break;

            case AnswerStatus.Answered_Incorrect:
                //Try again clicked
                setChatBotMsgStack(initialMessageStack);
                setCurrentState(AnswerStatus.Not_Answered);
                break;
        }
    };

    const {value,onChange} = props;
    //block will comprise of two major parts
    //First part will be set of messages that need to be displayed
    //Second part will be code editor
    //This component will be active unless the learner has given the right answer
    //show initial message
    //When input provided, show right or wrong message and then again display initial message
    return (

    <Fade in={true} timeout = {1000}>
        <Grid container spacing={0}  alignItems= "center" justifyContent="center">
            <Grid item xs={12} md={11} lg={6} justifyContent="center">
                <Grid container spacing={0} alignItems= "center" justifyContent="center" direction="column">
                    <Grid item xs={12} md={12} lg={12} justifyContent="center">
                        <ChatBotConversation messageStack = {chatBotMsgStack} />
                    </Grid>    
                    <Grid item xs={12} md={12} lg={12} alignItems= "center" justifyContent="center" sx={{pt: 2} }>
                        <Box sx={{ justifyContent: 'center', width:1, display: 'flex' }}>
                            <Button variant="outlined"  onClick={handleCheckClicked} sx={{textTransform: "none"}} >{ getButtonTextFromState(currentState)}</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            
            <Grid item xs={12} md={11} lg={6}>
                <PythonCodeComponent onChange={onChangePythonCode} value={value}/>
            </Grid>
        </Grid> 
    </Fade>
    );
}

const messageStack =["Please write the import statement that gets all the help from microbit and press check when you are done",
"Remember the syntax of the import statement is:",
"from \'<where to import>\' import \'<what to import>\'",
];

const firstPythonCodeResponseAction = {
    correct: ["Awesome job", "Congratulations you completed your first line of code", "Press Next To proceed further"],
    incorrect:["Not exactly. the syntax is: from \'<where to import>\' import \'<what to import>\'", "Since we are using microbit, where to import is microbit",
    "Since we want to import everything, we will use \'*\' for what to import","So the correct answer is: from microbit import *", "Please note that that there is a space between import and '*'"],
};

const LayoutForCodeCheck = (props, ref) =>{

    //var blockToExecute = {id:1, type: "chpycon", messageStack:messageStack, correctCode:"from microbit import *",responseAction:firstPythonCodeResponseAction};
    const {blockToExecute,onDone} = props;

    return (
        <React.Fragment>
        {
            <PythonCodeComponentWithMessages blockToExecute={blockToExecute} onDone={onDone}/>
        }
        </React.Fragment>
    );
}

export default LayoutForCodeCheck;