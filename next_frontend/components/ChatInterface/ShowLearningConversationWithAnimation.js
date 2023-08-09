import * as React from 'react';
import { useEffect } from 'react';
import Container from '@mui/material/Container';
import {QuestionBlockWithAnswerClicked, TopScreenComponent,ChatBotMessage,LearnerMessage,OptionsWithButtons,AcknowledgementQuestion,LongOptionsWithButtons,PythonCodeComponent,AskAQuestion} from './MessageTypeComponentsWithAnimation'
//import LayoutForCodeCheck from './CodeCheckLayout'
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Router from 'next/router';
import { useSession } from "next-auth/react"
import Lottie from "lottie-react";
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import groovyWalkAnimation from "../../assets/lottie-animations/main-buddy.json";
import Typewriter from 'typewriter-effect';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { ConvertJsonToComponent } from './JsonToComponent';
import Typography from '@mui/material/Typography';
import { CommonChapterEndBlock,QuizEndBlock,ConceptEndBlock,LastChapterEndBlock } from '../../assets/lessons/ZacobiaMission/0_CommonModules';
import { returnQuizBlockFromText, QuizController } from '../../Controllers/QuizController';
import { GetSetLearnerDataThroughAPI } from '../../actions/LearnerMissionProgressRequestHandler';
import { PythonCodeCheckController } from '../../Controllers/PythonCodeCheckController';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import CairoSettingDialog from '../dialogBoxes/CairoSettingsDialog';
import LearnerStore from '../../store/LearnerStore';
import Stack from '@mui/material/Stack';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { pink } from '@mui/material/colors';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import { CairoSpeedPossible } from '../../store/LearnerStore';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { GetOpenAIResponse,LearnerEventType } from '../../actions/OpenAIResponseHandler';
import { AddLearnerActivity } from '../../actions/LearnerMissionProgressRequestHandler';
import { TimeoutForOpenAI } from '../../constants/AllConstants';
import { CairAnimation_New } from './CairoAnimations';

//TODO: Show loading
//What is the flow here: read one, show animation
//UseEffect - Initialize the conversation

const ConversationState = {
  Normal: 0,
  Quiz: 1,
  CHPYCON: 2,
};

export function breakParagraph(paragraph) {
    var statements = [];
    var currentStatement = '';
  
    for (var i = 0; i < paragraph.length; i++) {
      var char = paragraph[i];
  
      if (char === '.' || char === '?' || char === '!' || char ==='\n') {
        currentStatement += char;
        if (currentStatement.length > 1)
            statements.push(currentStatement.trim());
        currentStatement = '';
      } else {
        currentStatement += char;
      }
    }
  
    if (currentStatement.length > 0) {
      statements.push(currentStatement.trim());
    }
  
    return statements;
  }


export default function LearningConversation(props) {

    const {LessonText, OnLessonEnd, onEventAck,learnerQuizProgress,type = "Initial Conversation",quizList,missionId} = props;
    //console.log ("Quiz list is", quizList);
    //const { data: session, status } = useSession();
    const [componentArray,setComponentArray] = React.useState ([]);
    //const [displayNextComponent,setDisplayNextComponent] = React.useState (true);
    const [clearLastQuestion,setClearLastQuestion] = React.useState (false);
    const [clearPage,setClearPage] = React.useState (false);
    const [maxWidth, setMaxWidth] = React.useState("lg");
    const [csdOpen, setCSDOpen] = React.useState(false); //CSD stands for Cairo Setting Dialog
    const [speechVolume,updateSpeechVolume,isCairoMuted,updateCairoMuted, cairoVoice, updateCairoVoice,forwardSpeed, updateForwardSpeed,firstName,userName, learnerId] = LearnerStore (
        (state) => [state.speechVolume,state.updateSpeechVolume, state.isCairoMuted, state.updateCairoMuted, state.cairoVoice, state.updateCairoVoice, state.forwardSpeed, state.updateForwardSpeed,
            state.firstName, state.userName, state._id]
      );
    const [cairoSpeedChanged, setCairoSpeedChanged] = React.useState(false);
    //const [lastOpenAIRequest, setLastOpenAIRequest] = React.useState(null);
    
    //console.log ("Type passed is", type);
    //console.log ("Learner quiz progress got is ", learnerQuizProgress);
    //console.log ("Value of current speed is", CairoForwardSpeed);
    
    

    var lastOpenAIRequest = React.useRef(null);
    var openAIResponseBuffer = React.useRef ('');
    var displayNextComponentRef = React.useRef();
    var componentKey = React.useRef(0);
    var lessonBlock = React.useRef(LessonText);
    var lessonBlockBuffer = React.useRef([]); //A block to hold temporary elements without affecting the main flow
    var currentPythonCode = React.useRef("");
    var conversationState = React.useRef(ConversationState.Normal);
   
    var currentIndexToDisplay = React.useRef (0);
    const messagesEndRef = React.useRef(null);
    var quizController = React.useRef (null);
    var pythonCodeCheckController = React.useRef (null);
    var quizProgress = React.useRef(null);
    quizProgress.current = learnerQuizProgress;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  function setDisplayNextComponent(shouldDisplay) {
    displayNextComponentRef.current = shouldDisplay;
    //console.log ("Seeting display next component to ",shouldDisplay);
  }

  function setConversationState(newState) {
    conversationState.current = newState;
  }


   
  useEffect(() => {
      // setComponentArray(setInitialConversation());
      //console.log ("Lesson text is ", LessonText1);
     // console.log ("On event ack is ", onEventAck);
      displayNextComponentRef.current = true;
      conversationState.current = ConversationState.Normal;
      addComponentEverySecond(); //calling to avoid initial delay
       const interval = setInterval(() => {
        
        addComponentEverySecond();
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        scrollToBottom()
      }, [componentArray]);
      
    function updateQuizProgressForLearner (quizId, score)
    {
        //console.log ("Learner quiz progress got it", learnerQuizProgress,quizId, score);
        var reqType = "UPDATEQUIZPROGRESS";
        var _id = learnerId;
        console.log ("Value of quiz progress is ", quizProgress.current)
        AddLearnerActivity(learnerId, "Quiz Completed",quizId, score);
        quizProgress.current[missionId][quizId] = score;
        var data = quizProgress.current;
        var reqObj = {reqType,_id,data};
        GetSetLearnerDataThroughAPI(reqObj).then (
            (resp => {
            //console.log ("resp is", resp, );
            //setChapterProgress(resp.chapterProgress);
            //console.log ("Chapter progress xxxxx", chapterProgress, resp.chapterProgress[clickedMission.id]);
        }));
    }

    function OpenAIResponseTimedOut()
    {

    }

    function handleLearnerEvent (data)
    {
        lastOpenAIRequest.current = data.subtype;
        if(data.subtype == LearnerEventType.ShortJoke )
        {
            setDisplayNextComponent(false);
            var reqObj = {reqType: LearnerEventType.ShortJoke, data:null, dataRcvd:onOpeAIResponse };
            setTimeout(OpenAIResponseTimedOut,TimeoutForOpenAI);
            GetOpenAIResponse(reqObj);
        }
        else if (data.subtype == LearnerEventType.AnswerQuestion)
        {
          lessonBlockBuffer.current.unshift({type:"askquestion"});
          setDisplayNextComponent(true);
        }
        else if (data.subtype == LearnerEventType.OpenCairoSetting)
        {
          setCSDOpen(true);
        }
        else
            onEventAck(data);
    }

    function handleOpenAIResponseError ()
    {
      const tmpArrayElem = [{type:"TM", message: "Thanks for the reponse. I am having few issues and will need more time to respond. Meanwhile, let's continue"},
                            {id:1, type: "ack", buttonText: "Ok"},{type:"clearpage"},
                            {type:"showpage"}];
      lessonBlockBuffer.current.unshift(...tmpArrayElem);
      setDisplayNextComponent(true);

      //let tempComponentArray = tmpArrayElem.map ((elem) => ConvertJsonToComponent(elem,handleOptionClick,userName,componentKey.current++,onChangePythonCode))
      //setComponentArray(componentArray => {
       // return [...componentArray, ...tempComponentArray];
      //});

    }

    function onOpeAIResponse(data,isDone, isError=false)
    {
      if (isError)
      {
        handleOpenAIResponseError ();
        return;
      }
      if (isDone)
      {
        if (lastOpenAIRequest.current == LearnerEventType.AnswerQuestion && openAIResponseBuffer.current.toLowerCase().includes("not appropriate"))
        {
          openAIResponseBuffer.current = "It looks like you don't have a question related to a STEM topic. No worries, you can ask a question later"
        }

        var  paragraph = breakParagraph(openAIResponseBuffer.current);
        var elemArray = paragraph.flatMap ((item) => {
          return [{type:"TM", message:item}, {type:"ack"}, {type:"clearpage"},{type:"showpage"} ]
        });
        openAIResponseBuffer.current = '';
        console.log ("Elem array is", elemArray);

          switch (lastOpenAIRequest.current)
          {
              case LearnerEventType.ShortJoke:
              case LearnerEventType.AnswerQuestion:
              case LearnerEventType.HaveConversation:
                  lessonBlockBuffer.current = elemArray;
                  lessonBlockBuffer.current.unshift({type:"clearpage"},{type:"showpage"});
                  //lessonBlockBuffer.current.push ({type:"ack"});
                  setDisplayNextComponent(true);
                  return;

              /* case LearnerEventType.AnswerQuestion:
                  lessonBlockBuffer.current = elemArray;
                  lessonBlockBuffer.current.unshift({type:"clearpage"},{type:"showpage"});
                  lessonBlockBuffer.current.push ({type:"ack"});
                  setDisplayNextComponent(true);
                  return;*/
          }
      }
        if (data === null)
            return;
        //console.log ("Open AI response buffer is", openAIResponseBuffer.current, data);
        openAIResponseBuffer.current =  openAIResponseBuffer.current + data;
    }

    function stopNextComponentDisplayForResponseElements(arrayElem)
    {
        if (arrayElem.type == "QWBO" || arrayElem.type == "QWBOL" || 
        arrayElem.type == "ack" || arrayElem.type == "acksp" || arrayElem.type == "chpyco" || 
        arrayElem.type == "chpycon" || arrayElem.type == "QUESTION" || arrayElem.type == "TM" || arrayElem.type == "TMR" || 
        arrayElem.type == "askquestion" || arrayElem.type == "sharetext")
            setDisplayNextComponent(false);
    }

  function getNextArrayElem() {
    switch (conversationState.current) {
      case ConversationState.Quiz:
        return quizController.current.returnNextQuestion();

      case ConversationState.Normal:
        var arrayElem =
          lessonBlockBuffer.current.length > 0
            ? lessonBlockBuffer.current.shift()
            : lessonBlock.current[currentIndexToDisplay.current++];
        return arrayElem;

      case ConversationState.CHPYCON:
        var arrayElem = pythonCodeCheckController.current.returnNextElem();
        //console.log ("Array elem got is", arrayElem);
        return arrayElem;
    }
  }

  function onChangePythonCode(value) {
    console.log("change", value);
    //currentPythonCode = value;
    switch (conversationState.current) {
      case ConversationState.Quiz:
        return quizController.current.onChangePythonCode(value);

      case ConversationState.Normal:
        return;

            case ConversationState.CHPYCON:
                return;
        }
        //currentPythonCode.current = value;
    }

  const addComponentEverySecond = () => {
    //console.log('This will run every second!',displayNextComponentRef.current);
    //setDisplayNextComponent((displayNextComponent) => !displayNextComponent);

        if (displayNextComponentRef.current)
        {
            var arrayElem = getNextArrayElem();
            //console.log ("Using Index", lessonBlock,arrayElem, currentIndexToDisplay.current);
            if (arrayElem.type == "quiz")
            {                
                quizController.current = new QuizController(arrayElem.id,quizList, updateQuizProgressForLearner);
                setConversationState(ConversationState.Quiz);
                setComponentArray(componentArray => {
                    const tmpArrayElem = {type:"TM", message: "Loading Quiz..."};
                    return [...componentArray,ConvertJsonToComponent(tmpArrayElem,handleOptionClick,userName,componentKey.current++,onChangePythonCode)];
                });
                addComponentEverySecond(); //calling to avoid initial delay
                //lessonBlockBuffer.current = returnQuizBlockFromText(arrayElem.text);
                //console.log ("lessonBlock buffer is", lessonBlockBuffer);
                return;
            }
            if (arrayElem.type == "chpycon")
            {
                const {correctCode,messageStack,responseAction,purpose} = arrayElem;
                pythonCodeCheckController.current = new PythonCodeCheckController(purpose,correctCode,messageStack, responseAction.correct, responseAction.incorrect);
                setConversationState(ConversationState.CHPYCON);
                addComponentEverySecond(); //calling to avoid initial delay
                //setDisplayNextComponent(false);
                return;
            }
            if (arrayElem.type == "poplastelem")
            {
                setComponentArray(componentArray => {
                    componentArray.pop();
                    return [...componentArray];
                });
                addComponentEverySecond();
                return;

            }
            if (arrayElem.type == "quizend")
            {
                setComponentArray(componentArray => {
                    //setDisplayNextComponent(true);
                    //componentArray.pop();
                    //console.log ("component array till now",componentArray);
                    //Remove the question, answer block, show the clicked message as Learner's response, then add the response for the option selected
                    //return [...componentArray,<ChatBotMessage message = "Loading..." key={componentKey.current++}/>]
                    const messageToDisplay = "Quiz has ended. Your score is " + arrayElem.data + "%";
                    const tmpArrayElem = {type:"TM", message: messageToDisplay};
                    return [...componentArray,ConvertJsonToComponent(tmpArrayElem,handleOptionClick,userName,componentKey.current++,onChangePythonCode)];
                });
                setConversationState(ConversationState.Normal);
                //addComponentEverySecond();
                return;
            }
            if (arrayElem.type == "pythoncodecheckend")
            {
                setConversationState(ConversationState.Normal);
                //addComponentEverySecond();
                return;
            }
            //Not needed as we wait for the text to complete before displaying the next element

            if (arrayElem.type == "donothing")
            {
                addComponentEverySecond(); //calling to avoid initial delay
                return;
            }

            if (arrayElem.type == "wait")
            {
                //addComponentEverySecond(); //calling to avoid initial delay
                return;
            }

            if (arrayElem.type == "endmessage") {
              switch (type) {
                case "Chapter":
                  lessonBlock.current = CommonChapterEndBlock;
                  break;

                case "Quiz":
                  lessonBlock.current = QuizEndBlock;
                  break;

                          case "Concept":
                              lessonBlock.current = ConceptEndBlock;
                          break;
                      }
                      //lessonBlock.current = CommonChapterEndBlock;
                      currentIndexToDisplay.current = 0;
                      addComponentEverySecond(); //calling to avoid initial delay
                      OnLessonEnd();
                      //setDisplayNextComponent(false);
                      /*Router.push({
                          pathname: '/parent/ParentDashboard',
                      });*/
              return;
            }

            if (arrayElem.type == "endmessage_last")
            {
                lessonBlock.current = LastChapterEndBlock;
                //lessonBlock.current = CommonChapterEndBlock;
                currentIndexToDisplay.current = 0;
                addComponentEverySecond(); //calling to avoid initial delay
                OnLessonEnd();
                //setDisplayNextComponent(false);
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
            if (arrayElem.type == "learnerevent")
            {
                //setDisplayNextComponent(true);
                //setDisplayNextComponent(false);
                //setComponentArray(componentArray => {
                    //setDisplayNextComponent(true);
                    //componentArray.pop();
                    //console.log ("component array till now",componentArray);
                    //Remove the question, answer block, show the clicked message as Learner's response, then add the response for the option selected
                    //return [...componentArray,<ChatBotMessage message = "Loading..." key={componentKey.current++}/>]
                    //return [...componentArray,<ChatBotMessage message = "Loading..." key={componentKey.current++}/>]
                //});
                
              handleLearnerEvent(arrayElem.data);
                //setTimeout (() => {onEventAck(data.data)}, 1000);
                //addComponentEverySecond(); //calling to avoid initial delay
               // performLearnerActionFromMission("addcourses", arrayElem.missions);
                return;
            }
            if (arrayElem.type == "showpage")
            {
                setClearPage(false);
                //setMaxWidth("lg");
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
            
            stopNextComponentDisplayForResponseElements(arrayElem);
            setComponentArray(componentArray => {
                return [...componentArray,ConvertJsonToComponent(arrayElem,handleOptionClick,userName,componentKey.current++,onChangePythonCode)]});
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
                return [...componentArray,ConvertJsonToComponent (data.responseAction.correct, null,userName,componentKey.current++)]
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
                return [...componentArray,ConvertJsonToComponent (data.responseAction.incorrect, null,userName),ConvertJsonToComponent(ackElem,handleOptionClick,userName,componentKey.current++)]
            });
        }
        return;
    }

  function handleOptionClickInQuizMode(response, data) {
    if (response == "quiznextclicked") {
      setDisplayNextComponent(true);
      addComponentEverySecond();
      return;
    }
    //console.log ("The response is",data);
    if (quizController.current.optionClicked(data))
      console.log("correct clicked");

    setComponentArray((componentArray) => {
      setDisplayNextComponent(false);
      componentArray.pop();
      var lastQuestionBlock = quizController.current.currentQuestion;
      //console.log ("component array till now",componentArray);
      //Remove the question, answer block, show the clicked message as Learner's response, then add the response for the option selected
      return [
        ...componentArray,
        <QuestionBlockWithAnswerClicked
          optionClicked={response}
          key={componentKey.current++}
          question={lastQuestionBlock.question}
          options={lastQuestionBlock.options}
          onClick={(e) => {
            handleOptionClick(e, "quiznextclicked");
          }}
        />,
      ];
      //return [...componentArray];
    });
  }

  function handleOptionClickInPythonCheckMode(response, data) {
    if (pythonCodeCheckController.current.onClick(response, data))
      setConversationState(ConversationState.Normal);
    setDisplayNextComponent(true);
    addComponentEverySecond(); //calling to avoid initial delay
  }

    //When the question has been answered, remove the question and show the answer as if Learner has answered it
    //response is the text selected
    //data is response obj
    function handleOptionClick(e,response,data)
    {
        if (response == "TMCOMPLETE")
        {
            console.log ("TM Complete rcvd");
            setDisplayNextComponent(true);
            return;
        }

        if (conversationState.current == ConversationState.Quiz)
        {
            handleOptionClickInQuizMode(response,data);
            return;
        }
        if (conversationState.current == ConversationState.CHPYCON)
        {
            handleOptionClickInPythonCheckMode(response,data);
            return;
        }



        if (response == "askquestion" || response == "sharetext")
        {
            console.log ("text is", data.text);
            setDisplayNextComponent(false);
            setComponentArray(componentArray => {
              //setDisplayNextComponent(true);
              //componentArray.pop();
              //console.log ("component array till now",componentArray);
              //Remove the question, answer block, show the clicked message as Learner's response, then add the response for the option selected
              return [<ChatBotMessage message = "Thinking..." key={componentKey.current++}/>]
              //return [...componentArray,<ChatBotMessage message = "Loading..." key={componentKey.current++}/>]
          });
            lastOpenAIRequest.current = response == "askquestion"? LearnerEventType.AnswerQuestion: LearnerEventType.HaveConversation;
            var reqObj = {reqType: lastOpenAIRequest.current, data:data, dataRcvd:onOpeAIResponse };
            //TODO - set time out here as well show the message that I am thinking or figuring out your reponse
            GetOpenAIResponse(reqObj);
            return;
        }


        if (response == "ackclick")
        {
            setDisplayNextComponent(true);
            setComponentArray(componentArray => {
                setDisplayNextComponent(true);
                componentArray.pop();
                //console.log ("component array till now",componentArray);
                //Remove the question, answer block, show the clicked message as Learner's response, then add the response for the option selected
                return [...componentArray]
            });
            addComponentEverySecond(); //calling to avoid initial delay
            return;
        } 
        //this block handles the case when a learner event is fired after clicking an option
        if (response != "ackspclick" && data.type == "learnerevent")
        {
            //setDisplayNextComponent(true);
            setComponentArray(componentArray => {
                //setDisplayNextComponent(true);
                componentArray.pop();
                //console.log ("component array till now",componentArray);
                //Remove the question, answer block, show the clicked message as Learner's response, then add the response for the option selected
                return [...componentArray,<LearnerMessage message = {response} key={componentKey.current++}/>,<ChatBotMessage message = "Loading..." key={componentKey.current++}/>]
                //return [...componentArray,<ChatBotMessage message = "Loading..." key={componentKey.current++}/>]
            });
            handleLearnerEvent(data.data);
            //setTimeout (() => {onEventAck(data.data)}, 1000);
            //addComponentEverySecond(); //calling to avoid initial delay
           // performLearnerActionFromMission("addcourses", arrayElem.missions);
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
            handleLearnerEvent(data); 
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
            //setDisplayNextComponent(true);l
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
            return [...componentArray,<ConvertJsonToComponent message = {response} key={componentKey.current++}/>,ConvertJsonToComponent (data, null,userName,componentKey.current++)]
        });
        addComponentEverySecond(); //calling to avoid initial delay
    }

  function setInitialConversation() {
    const returnArray = [
      <TopScreenComponent learnersname="Daksh" key={componentKey.current++} />,
    ];
    return [...returnArray];
  }

  function onChangePythonCode(value) {
    // console.log("change", value);
    //currentPythonCode.current = value;
    switch (conversationState.current) {
      case ConversationState.Quiz:
        return;

      case ConversationState.Normal:
        return;

      case ConversationState.CHPYCON:
        return pythonCodeCheckController.current.onChangePythonCode(value);
    }
  }

    function onCairoSettingClosed (volumeValue,voice, speedLevel)
    {
        setCSDOpen(false);
        if (volumeValue == -1)
            return;
        updateSpeechVolume(volumeValue/100);
        updateCairoVoice(voice);
        //setCairoSpeed(speedLevel);  
    }

  function openCairoSettingDialog() {
    setCSDOpen(true);
  }

  function muteButtonPress() {
    updateCairoMuted(!isCairoMuted);
  }

  function forwardButtonClicked() {
    updateForwardSpeed(forwardSpeed + 0.2);
    //increaseCairoSpeed();
    //setCairoSpeedChanged(!cairoSpeedChanged);
  }

  function rewindButtonClicked() {
    //reduceCairoSpeed();
    //setCairoSpeedChanged(!cairoSpeedChanged);
    updateForwardSpeed(forwardSpeed - 0.2);
  }

  const handleSpeedChange = (event) => {
    setCairoSpeed(event.target.value);
  };

    function askQuestionButtonClicked()
    {

    }

    return (      
        <Container component="main" maxWidth={maxWidth} sx={{ display: 'flex', flexDirection:'column' }} >
           {/* <TopScreenComponent learnersname = {session.user.username}/>*/}

          <Grid container spacing={0}  alignItems= "top" justifyContent="left">
            <Grid item xs={3} md={3} lg={5}>
              <CairAnimation_New/>

            
          <CairoSettingDialog
            open={csdOpen}
            onClose={onCairoSettingClosed}
            value={speechVolume * 100}
            currentVoice={cairoVoice}
          />
        </Grid>
        <Grid item xs={9} md={9} lg={7}>
          <Fade in={!clearPage} timeout={1000}>
            <Box  sx={{ pb:2}}>
              <Stack  direction="row" sx={{ mb: 1, mt:2 }} alignItems="center">
                  <IconButton aria-label="setting" onClick = {openCairoSettingDialog}>
                      <SettingsIcon />
                  </IconButton>
                  <IconButton aria-label="mute" onClick = {muteButtonPress}>
                      {isCairoMuted? <VolumeOffIcon  sx={{ color: pink[500] }}/> : <VolumeUpIcon/>}
                  </IconButton>
                  <IconButton aria-label="rewind" onClick = {rewindButtonClicked} disabled={forwardSpeed == CairoSpeedPossible.Slow} >
                      {<FastRewindIcon  />}
                  </IconButton>
                  <IconButton aria-label="forward" onClick = {forwardButtonClicked} disabled = {forwardSpeed == CairoSpeedPossible.Fast}>
                      {<FastForwardIcon  />}
                  </IconButton>
              </Stack>
              {componentArray}
              <div ref={messagesEndRef} autoFocus />
            </Box>
          </Fade>
        </Grid>
      </Grid>
    </Container>
  );
}
