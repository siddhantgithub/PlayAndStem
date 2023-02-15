import * as React from 'react';
import { useEffect } from 'react';
import Container from '@mui/material/Container';
import {TopScreenComponent,ChatBotMessage,LearnerMessage,OptionsWithButtons,AcknowledgementQuestion,LongOptionsWithButtons} from '../../components/ChatInterface/MessageTypeComponents'
import {LessonText} from '../../assets/lessons/introduction'
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Router from 'next/router';
//TODO: Show loading
//What is the flow here: read one, show animation
//UseEffect - Initialize the conversation
export default function LearningConversation() {
    const [componentArray,setComponentArray] = React.useState ([]);
    const [displayNextComponent,setDisplayNextComponent] = React.useState (true);
    const [clearLastQuestion,setClearLastQuestion] = React.useState (false);
    const [clearPage,setClearPage] = React.useState (false);

    
    const displayNextComponentRef = React.useRef();
    var componentKey = React.useRef(0);
    var lessonBlock = React.useRef(LessonText);
    displayNextComponentRef.current = displayNextComponent;

    useEffect(() => {
      // setComponentArray(setInitialConversation());
       const interval = setInterval(() => {
        
        addComponentEverySecond();
      }, 1000);
      return () => clearInterval(interval);
    }, []);
    
    const addComponentEverySecond = () => {
        console.log('This will run every second!',displayNextComponentRef.current);
        //setDisplayNextComponent((displayNextComponent) => !displayNextComponent);


        if (displayNextComponentRef.current)
        {
            var arrayElem = lessonBlock.current.shift();
            if (arrayElem.type == "donothing")
            {
                return;
            }

            if (arrayElem.type == "endmessage")
            {
                Router.push({
                    pathname: '/parent/ParentDashboard',
                });
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
                setComponentArray([]);
                return;
            }
            if (arrayElem.type == "QWBO" || arrayElem.type == "QWBOL" || arrayElem.type == "ack")
                setDisplayNextComponent(false);
            setComponentArray(componentArray => {
                return [...componentArray,ConvertJsonToComponent(arrayElem,handleOptionClick)]});
        }
    }

    //When the question has been answered, remove the question and show the answer as if Learner has answered it
    function handleOptionClick(e,response,data)
    {
        //console.log ("event is",e);
        setClearLastQuestion(true);
        if (response == "ackclick")
        {
            setDisplayNextComponent(true);
            return;
        }
        setComponentArray(componentArray => {
            setDisplayNextComponent(true);
            componentArray.pop();
            console.log ("component array till now",componentArray);
            return [...componentArray,<LearnerMessage message = {response} key={componentKey.current++}/>,ConvertJsonToComponent (data, null)]});
    }

    function setInitialConversation ()
    {  
        const returnArray = [<TopScreenComponent learnersname = "Daksh" key={componentKey.current++}/>];
        return [...returnArray]; 
    }

    //Problem: clicking option changes component structure conditionally 
    //Problme: What to do?
    //There are two options: a) one component with conditions
    //second change dom only after clicked -- how to do it?? have a callback from original class
    //Need to decide
    function ConvertJsonToComponent (arrayElem,clickHandler)
    {
        var reactElement;
        switch (arrayElem.type)
        {
            case "TM":
                return <ChatBotMessage message = {arrayElem.message} key={componentKey.current++}/>;
            break;

            case "TMR":
                return <ChatBotMessage message = {replaceTextInMessage(arrayElem) }  key={componentKey.current++}/>;
            break;

            case "QWBO":
                var optionsArray = arrayElem.options.map( (option) =>  {return {
                            text:option.text, 
                            onClick:(e) => {clickHandler(e,option.text,option.onClickResponse)}
                        }}
                    );  
                    reactElement = <OptionsWithButtons options = {optionsArray} key={componentKey.current++}/>  
                return  reactElement;
            break; 
            case "QWBOL":
                var optionsArray = arrayElem.options.map( (option) =>  {return {
                            text:option.text, 
                            onClick:(e) => {clickHandler(e,option.text,option.onClickResponse)}
                        }}
                    );  
                    reactElement = <Fade in={clearLastQuestion}><LongOptionsWithButtons options = {optionsArray} key={componentKey.current++}/></Fade>   
                return  reactElement;
            break; 
            case "ack":
                const onClick = (e) => {clickHandler(e,"ackclick")} ;
                return <AcknowledgementQuestion message = {arrayElem.message} onClick = {onClick} key={componentKey.current++}/>; 
                break;
            case "block":
                lessonBlock.current = arrayElem.block;
                //we need to replace the current block with 
        }
    }

    function replaceTextInMessage (arrayElem)
    {
        switch (arrayElem.type)
        {
            case "TMR":
                return arrayElem.message.replace("<learnername>","Daksh");
        }
    }

    return (
        
        <Container component="main" maxWidth="sm" sx={{ display: 'flex', flexDirection:'column' }}>
            <TopScreenComponent learnersname = "Daksh"/>
                <Fade in={!clearPage} timeout = {1000}>
                    <Box>
                        {componentArray}
                    </Box>
                </Fade>
        </Container>
    );
}
