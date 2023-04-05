import * as React from 'react';
import { useEffect } from 'react';
import Container from '@mui/material/Container';
import {TopScreenComponent,ChatBotMessage,LearnerMessage,OptionsWithButtons,AcknowledgementQuestion,LongOptionsWithButtons,PythonCodeComponent} from './MessageTypeComponentsWithAnimation'
import LayoutForCodeCheck from './CodeCheckLayout'
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Router from 'next/router';
import { useSession } from "next-auth/react"
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/lottie-animations/main-buddy.json";
import Typewriter from 'typewriter-effect';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { ConvertJsonToComponent } from './JsonToComponent';
import Typography from '@mui/material/Typography';

const style = {
    height: 300,
  };
  
  const Example = () => {
    return <Lottie animationData={groovyWalkAnimation} style={style}/>;
  };

//TODO: Show loading
//What is the flow here: read one, show animation
//UseEffect - Initialize the conversation
export default function LearningConversation(props) {

    const {LessonText, OnLessonEnd, performLearnerActionFromMission,onEventAck} = props;
    const { data: session, status } = useSession();
    const [componentArray,setComponentArray] = React.useState ([]);
    //const [displayNextComponent,setDisplayNextComponent] = React.useState (true);
    const [clearLastQuestion,setClearLastQuestion] = React.useState (false);
    const [clearPage,setClearPage] = React.useState (false);
    const [maxWidth, setMaxWidth] = React.useState("lg");
    

    
    var displayNextComponentRef = React.useRef();
    var componentKey = React.useRef(0);
    var lessonBlock = React.useRef(LessonText);
    var lessonBlockBuffer = React.useRef([]); //A block to hold temporary elements without affecting the main flow
    var currentPythonCode = React.useRef("");
   
    var currentIndexToDisplay = React.useRef (0);
    const messagesEndRef = React.useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block:"end" })
      }

     function setDisplayNextComponent (shouldDisplay)
      {
        displayNextComponentRef.current = shouldDisplay;
        //console.log ("Seeting display next component to ",shouldDisplay);
      }

    useEffect(() => {
      // setComponentArray(setInitialConversation());
      //console.log ("Lesson text is ", LessonText1);
     // console.log ("On event ack is ", onEventAck);
      displayNextComponentRef.current = true;
      addComponentEverySecond(); //calling to avoid initial delay
       const interval = setInterval(() => {
        
        addComponentEverySecond();
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        scrollToBottom()
      }, [componentArray]);
    


    const addComponentEverySecond = () => {
        //console.log('This will run every second!',displayNextComponentRef.current);
        //setDisplayNextComponent((displayNextComponent) => !displayNextComponent);


        if (displayNextComponentRef.current)
        {
            var arrayElem = lessonBlockBuffer.current.length > 0 ? lessonBlockBuffer.current.shift(): lessonBlock.current[currentIndexToDisplay.current++];
            //console.log ("Using Index", lessonBlock,arrayElem, currentIndexToDisplay.current);
            if (arrayElem.type == "donothing")
            {
                return;
            }

            if (arrayElem.type == "endmessage")
            {
                OnLessonEnd();
                setDisplayNextComponent(false);
                /*Router.push({
                    pathname: '/parent/ParentDashboard',
                });*/
                return;
            }

            if (arrayElem.type == "clearpage")
            {
                setClearPage(true);
                return;
            }
            if (arrayElem.type == "showpage")
            {
                setClearPage(false);
                setMaxWidth("lg");
                setComponentArray([]);
                addComponentEverySecond(); //calling to avoid initial delay
                return;
            }
            if (arrayElem.type == "block")
            {
                lessonBlock.current = arrayElem.block;
                currentIndexToDisplay.current = 0;
                addComponentEverySecond(); //calling to avoid initial delay
                return;
            }
            if (arrayElem.type == "ADD")
            {
                onEventAck(arrayElem.data);
                addComponentEverySecond(); //calling to avoid initial delay
               // performLearnerActionFromMission("addcourses", arrayElem.missions);
                return;
            }

            if (arrayElem.type == "QWBO" || arrayElem.type == "QWBOL" || arrayElem.type == "ack" || arrayElem.type == "acksp" || arrayElem.type == "chpyco" || arrayElem.type == "chpycon")
                setDisplayNextComponent(false);
            setComponentArray(componentArray => {
                return [...componentArray,ConvertJsonToComponent(arrayElem,handleOptionClick,session,componentKey.current++)]});
        }
    }

    function checkPythonCode (data)
    {
        //console.log ("herer", currentPythonCode.current, data.correctCode);
        currentPythonCode.current.replace(/(?:\r\n|\r|\n)/g, '');
        //console.log ("Answer and code match", currentPythonCode.current.localeCompare(data.correctCode));
        if (currentPythonCode.current.localeCompare(data.correctCode) == 0)
        { 
            setComponentArray(componentArray => {
                setDisplayNextComponent(true);
                componentArray.pop();
                //console.log ("component array till now",componentArray);
                return [...componentArray,ConvertJsonToComponent (data.responseAction.correct, null,session,componentKey.current++)]
            });
        }
        else
        {
            //not correct, we have to ask to resubmit the code 
            //Also, we cannot proceed
            setComponentArray(componentArray => {
                //console.log ("component array till now",componentArray);
                componentArray.pop();
                componentArray.pop();
                componentArray.pop();
                currentIndexToDisplay.current -= 3;
                setDisplayNextComponent(false);
                //lessonBlock.current = [...data.responseAction.elementsToAdd, lessonBlock.current]
                lessonBlockBuffer.current.push({id:1, type: "clearpage"});
                lessonBlockBuffer.current.push({id:1, type: "showpage"});
                let ackElem = {id:1, type: "ack", message:"Click next to proceed"}
                return [...componentArray,ConvertJsonToComponent (data.responseAction.incorrect, null,session),ConvertJsonToComponent(ackElem,handleOptionClick,session,componentKey.current++)]
            });
        }
        return;
    }

    //When the question has been answered, remove the question and show the answer as if Learner has answered it
    function handleOptionClick(e,response,data)
    {
        //console.log ("event is",e);
        

        if (response == "ackclick")
        {
            setDisplayNextComponent(true);
            setComponentArray(componentArray => {
                setDisplayNextComponent(true);
                componentArray.pop();
                //console.log ("component array till now",componentArray);
                //Remove the question, answer block, show the clicked message as Learner's response, then add the response for the option selected
                return [...componentArray,<ChatBotMessage message = "Loading..." key={componentKey.current++}/>]
            });
            addComponentEverySecond(); //calling to avoid initial delay
            return;
        } 
        if (response == "ackspclick")
        {
           /* setDisplayNextComponent(true);
            setComponentArray(componentArray => {
                setDisplayNextComponent(true);
                componentArray.pop();
                //console.log ("component array till now",componentArray);
                //Remove the question, answer block, show the clicked message as Learner's response, then add the response for the option selected
                return [...componentArray,<ChatBotMessage message = "Loading..." key={componentKey.current++}/>]
            });
            addComponentEverySecond(); //calling to avoid initial delay*/
            onEventAck(data); 
            return;
        }        
        if (response == "chpyco")
        {
            checkPythonCode(data);
            return;
        }
        if (response == "chpycon")
        {
            setDisplayNextComponent(true);
            
            return;
        }
        if (data.type == "block")
        {
            lessonBlock.current = data.block;
            console.log ("Data is",data, "lsessonBlock.current is", lessonBlock);
            currentIndexToDisplay.current = 0;
            //setDisplayNextComponent(true);
            setClearLastQuestion(true);
            setComponentArray(componentArray => {
                setDisplayNextComponent(true);
                componentArray.pop();
                //console.log ("component array till now",componentArray);
                //Remove the question, answer block, show the clicked message as Learner's response, then add the response for the option selected
                return [...componentArray,<LearnerMessage message = {response} key={componentKey.current++}/>]
            });
            addComponentEverySecond(); //calling to avoid initial delay
            return;
        }
        setClearLastQuestion(true);
        //Here means one of the response from quiz question was clicked
        setComponentArray(componentArray => {
            setDisplayNextComponent(true);
            componentArray.pop();
            //console.log ("component array till now",componentArray);
            //Remove the question, answer block, show the clicked message as Learner's response, then add the response for the option selected
            return [...componentArray,<LearnerMessage message = {response} key={componentKey.current++}/>,ConvertJsonToComponent (data, null,session,componentKey.current++)]
        });
        addComponentEverySecond(); //calling to avoid initial delay
    }

    function setInitialConversation ()
    {  
        const returnArray = [<TopScreenComponent learnersname = "Daksh" key={componentKey.current++}/>];
        return [...returnArray]; 
    }

    function onChangePythonCode (value) {
        console.log("change", value);
        currentPythonCode.current = value;
    }


    return (      
        <Container component="main" maxWidth={maxWidth} sx={{ display: 'flex', flexDirection:'column' }}>
           {/* <TopScreenComponent learnersname = {session.user.username}/>*/}

            <Grid container spacing={0}  alignItems= "top" justifyContent="left">
          <Grid item xs={3} md={3} lg={5}>
            <Example/>
          </Grid>
          <Grid item xs={9} md={9} lg={7}>
          <Fade in={!clearPage} timeout = {1000}>
                <Box>
                    {componentArray}
                    <div ref={messagesEndRef} />
                </Box>
            </Fade> 
            
          </Grid>
        </Grid>
    
        </Container>
    );
}