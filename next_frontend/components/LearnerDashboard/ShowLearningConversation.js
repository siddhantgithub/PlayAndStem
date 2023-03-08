import * as React from 'react';
import { useEffect } from 'react';
import Container from '@mui/material/Container';
import {TopScreenComponent,ChatBotMessage,LearnerMessage,OptionsWithButtons,AcknowledgementQuestion,LongOptionsWithButtons,PythonCodeComponent} from '../ChatInterface/MessageTypeComponents'
import LayoutForCodeCheck from '../ChatInterface/CodeCheckLayout'
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Router from 'next/router';
//TODO: Show loading
//What is the flow here: read one, show animation
//UseEffect - Initialize the conversation
export default function LearningConversation(props) {

    const {LessonText, OnLessonEnd} = props;
    const [componentArray,setComponentArray] = React.useState ([]);
    const [displayNextComponent,setDisplayNextComponent] = React.useState (true);
    const [clearLastQuestion,setClearLastQuestion] = React.useState (false);
    const [clearPage,setClearPage] = React.useState (false);
    const [maxWidth, setMaxWidth] = React.useState("sm");
    

    
    var displayNextComponentRef = React.useRef();
    var componentKey = React.useRef(0);
    var lessonBlock = React.useRef(LessonText);
    var lessonBlockBuffer = React.useRef([]); //A block to hold temporary elements without affecting the main flow
    var currentPythonCode = React.useRef("");
    displayNextComponentRef.current = displayNextComponent;
    var currentIndexToDisplay = React.useRef (0);
    const messagesEndRef = React.useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block:"end" })
      }

    useEffect(() => {
      // setComponentArray(setInitialConversation());
      //console.log ("Lesson text is ", LessonText1);
       const interval = setInterval(() => {
        
        addComponentEverySecond();
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        scrollToBottom()
      }, [componentArray]);
    
    const addComponentEverySecond = () => {
        console.log('This will run every second!',displayNextComponentRef.current);
        //setDisplayNextComponent((displayNextComponent) => !displayNextComponent);


        if (displayNextComponentRef.current)
        {
            var arrayElem = lessonBlockBuffer.current.length > 0 ? lessonBlockBuffer.current.shift(): lessonBlock.current[currentIndexToDisplay.current++];
            console.log ("Using Index", lessonBlock,arrayElem, currentIndexToDisplay.current);
            if (arrayElem.type == "donothing")
            {
                return;
            }

            if (arrayElem.type == "endmessage")
            {
                OnLessonEnd();
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
                setMaxWidth("sm");
                setComponentArray([]);
                return;
            }
            if (arrayElem.type == "QWBO" || arrayElem.type == "QWBOL" || arrayElem.type == "ack" || arrayElem.type == "chpyco" || arrayElem.type == "chpycon")
                setDisplayNextComponent(false);
            setComponentArray(componentArray => {
                return [...componentArray,ConvertJsonToComponent(arrayElem,handleOptionClick)]});
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
                return [...componentArray,ConvertJsonToComponent (data.responseAction.correct, null)]
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
                return [...componentArray,ConvertJsonToComponent (data.responseAction.incorrect, null),ConvertJsonToComponent(ackElem,handleOptionClick)]
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
        setClearLastQuestion(true);
        //Here means one of the response from quiz question was clicked
        setComponentArray(componentArray => {
            setDisplayNextComponent(true);
            componentArray.pop();
            //console.log ("component array till now",componentArray);
            //Remove the question, answer block, show the clicked message as Learner's response, then add the response for the option selected
            return [...componentArray,<LearnerMessage message = {response} key={componentKey.current++}/>,ConvertJsonToComponent (data, null)]
        });
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
                {
                const onClick = (e) => {clickHandler(e,"ackclick")} ;
                return <AcknowledgementQuestion message = {arrayElem.message} onClick = {onClick} key={componentKey.current++}/>; 
                break;
                }

            case "chpyco":
                {
                    const onClick = (e) => {clickHandler(e,"chpyco",arrayElem)} ;
                    return <AcknowledgementQuestion message = {arrayElem.message} onClick = {onClick} key={componentKey.current++}/>; 
                    break;
                }

                case "chpycon":
                    {
                        const onClick = (e) => {clickHandler(e,"chpycon",arrayElem)} ;
                        setMaxWidth("lg");
                        return <LayoutForCodeCheck blockToExecute={arrayElem} onDone={onClick}/>; 
                        break;
                    }

            case "block":
                lessonBlock.current = arrayElem.block;

            case "pycb":
                return <PythonCodeComponent onChange={onChangePythonCode} value={arrayElem.value}/>;
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
        
        <Container component="main" maxWidth={maxWidth} sx={{ display: 'flex', flexDirection:'column' }}>
            <TopScreenComponent learnersname = "Daksh"/>
                <Fade in={!clearPage} timeout = {1000}>
                    <Box>
                        {componentArray}
                        <div ref={messagesEndRef} />
                    </Box>
                </Fade>     
        </Container>
    );
}
