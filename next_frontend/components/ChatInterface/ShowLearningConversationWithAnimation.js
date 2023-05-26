import * as React from "react";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import {
  QuestionBlockWithAnswerClicked,
  TopScreenComponent,
  ChatBotMessage,
  LearnerMessage,
  OptionsWithButtons,
  AcknowledgementQuestion,
  LongOptionsWithButtons,
  PythonCodeComponent,
} from "./MessageTypeComponentsWithAnimation";
import LayoutForCodeCheck from "./CodeCheckLayout";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Router from "next/router";
import { useSession } from "next-auth/react";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/lottie-animations/main-buddy.json";
import Typewriter from "typewriter-effect";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { ConvertJsonToComponent } from "./JsonToComponent";
import Typography from "@mui/material/Typography";
import { CommonChapterEndBlock } from "../../assets/lessons/ZacobiaMission/0_CommonModules";
import {
  returnQuizBlockFromText,
  QuizController,
} from "../../Controllers/QuizController";
import { GetSetLearnerDataThroughAPI } from "../../actions/LearnerMissionProgressRequestHandler";
import { PythonCodeCheckController } from "../../Controllers/PythonCodeCheckController";
import { GenerateJokes } from "../../pages/api/GenerateJokes";
import { type } from "os";

const style = {
  height: 300,
};

const Example = () => {
  return <Lottie animationData={groovyWalkAnimation} style={style} />;
};

//TODO: Show loading
//What is the flow here: read one, show animation
//UseEffect - Initialize the conversation

const ConversationState = {
  Normal: 0,
  Quiz: 1,
  CHPYCON: 2,
};
export default function LearningConversation(props) {
  const { LessonText, OnLessonEnd, onEventAck, learnerQuizProgress } = props;
  const { data: session, status } = useSession();
  const [componentArray, setComponentArray] = React.useState([]);
  const [jokes, setJokes] = React.useState(""); //Jokes
  //const [displayNextComponent,setDisplayNextComponent] = React.useState (true);
  const [clearLastQuestion, setClearLastQuestion] = React.useState(false);
  const [clearPage, setClearPage] = React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState("lg");
  //console.log ("Lesson text is", LessonText);
  //console.log ("Learner quiz progress got is ", learnerQuizProgress);

  var displayNextComponentRef = React.useRef();
  var componentKey = React.useRef(0);
  var lessonBlock = React.useRef(LessonText);
  var lessonBlockBuffer = React.useRef([]); //A block to hold temporary elements without affecting the main flow
  var currentPythonCode = React.useRef("");
  var conversationState = React.useRef(ConversationState.Normal);

  var currentIndexToDisplay = React.useRef(0);
  const messagesEndRef = React.useRef(null);
  var quizController = React.useRef(null);
  var pythonCodeCheckController = React.useRef(null);
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
    scrollToBottom();
  }, [componentArray]);

  function updateQuizProgressForLearner(quizId, score) {
    //console.log ("Learner quiz progress got it", learnerQuizProgress,quizId, score);
    var reqType = "UPDATEQUIZPROGRESS";
    var _id = session.user._id;
    quizProgress.current[quizId] = score;
    var data = quizProgress.current;
    var reqObj = { reqType, _id, data };
    GetSetLearnerDataThroughAPI(reqObj).then((resp) => {
      //console.log ("resp is", resp, );
      //setChapterProgress(resp.chapterProgress);
      //console.log ("Chapter progress xxxxx", chapterProgress, resp.chapterProgress[clickedMission.id]);
    });
  }

  function stopNextComponentDisplayForResponseElements(arrayElem) {
    if (
      arrayElem.type == "QWBO" ||
      arrayElem.type == "QWBOL" ||
      arrayElem.type == "ack" ||
      arrayElem.type == "acksp" ||
      arrayElem.type == "chpyco" ||
      arrayElem.type == "chpycon" ||
      arrayElem.type == "QUESTION"
    )
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
        console.log("Array elem got is", arrayElem);
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

    if (displayNextComponentRef.current) {
      var arrayElem = getNextArrayElem();
      if (arrayElem && arrayElem.type) {
        // ... rest of the code

        //console.log ("Using Index", lessonBlock,arrayElem, currentIndexToDisplay.current);
        if (arrayElem.type == "quiz") {
          quizController.current = new QuizController(
            arrayElem.id,
            updateQuizProgressForLearner
          );
          setConversationState(ConversationState.Quiz);
          setComponentArray((componentArray) => {
            //setDisplayNextComponent(true);
            //componentArray.pop();
            //console.log ("component array till now",componentArray);
            //Remove the question, answer block, show the clicked message as Learner's response, then add the response for the option selected
            //return [...componentArray,<ChatBotMessage message = "Loading..." key={componentKey.current++}/>]
            return [
              ...componentArray,
              <ChatBotMessage
                message="Loading Quiz..."
                key={componentKey.current++}
              />,
            ];
          });
          addComponentEverySecond(); //calling to avoid initial delay
          //lessonBlockBuffer.current = returnQuizBlockFromText(arrayElem.text);
          //console.log ("lessonBlock buffer is", lessonBlockBuffer);
          return;
        }
        if (arrayElem.type == "chpycon") {
          const { correctCode, messageStack, responseAction } = arrayElem;
          pythonCodeCheckController.current = new PythonCodeCheckController(
            correctCode,
            messageStack,
            responseAction.correct,
            responseAction.incorrect
          );
          setConversationState(ConversationState.CHPYCON);
          addComponentEverySecond(); //calling to avoid initial delay
          //setDisplayNextComponent(false);
          return;
        }
        if (arrayElem.type == "poplastelem") {
          setComponentArray((componentArray) => {
            componentArray.pop();
            return [...componentArray];
          });
          addComponentEverySecond();
          return;
        }
        if (arrayElem.type == "quizend") {
          setComponentArray((componentArray) => {
            //setDisplayNextComponent(true);
            //componentArray.pop();
            //console.log ("component array till now",componentArray);
            //Remove the question, answer block, show the clicked message as Learner's response, then add the response for the option selected
            //return [...componentArray,<ChatBotMessage message = "Loading..." key={componentKey.current++}/>]
            return [
              ...componentArray,
              <ChatBotMessage
                message={
                  "Quiz has ended. Your score is " + arrayElem.data + "%"
                }
                key={componentKey.current++}
              />,
            ];
          });
          setConversationState(ConversationState.Normal);
          //addComponentEverySecond();
          return;
        }
        if (arrayElem.type == "pythoncodecheckend") {
          setConversationState(ConversationState.Normal);
          //addComponentEverySecond();
          return;
        }
        if (arrayElem.type == "donothing") {
          //addComponentEverySecond(); //calling to avoid initial delay
          return;
        }

        if (arrayElem.type == "endmessage") {
          lessonBlock.current = CommonChapterEndBlock;
          currentIndexToDisplay.current = 0;
          addComponentEverySecond(); //calling to avoid initial delay
          OnLessonEnd();
          //setDisplayNextComponent(false);
          /*Router.push({
                    pathname: '/parent/ParentDashboard',
                });*/
          return;
        }

        if (arrayElem.type == "clearpage") {
          setClearPage(true);
          return;
        }
        if (arrayElem.type == "learnerevent") {
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
          onEventAck(arrayElem.data);
          //setTimeout (() => {onEventAck(data.data)}, 1000);
          //addComponentEverySecond(); //calling to avoid initial delay
          // performLearnerActionFromMission("addcourses", arrayElem.missions);
          return;
        }
        if (arrayElem.type == "showpage") {
          setClearPage(false);
          //setMaxWidth("lg");
          setComponentArray([]);
          addComponentEverySecond(); //calling to avoid initial delay
          return;
        }
        if (arrayElem.type == "block") {
          lessonBlock.current = arrayElem.block;
          currentIndexToDisplay.current = 0;
          addComponentEverySecond(); //calling to avoid initial delay
          return;
        }

        stopNextComponentDisplayForResponseElements(arrayElem);
        setComponentArray((componentArray) => {
          return [
            ...componentArray,
            ConvertJsonToComponent(
              arrayElem,
              handleOptionClick,
              session,
              componentKey.current++,
              onChangePythonCode
            ),
          ];
        });
      }
    } else {
      console.error("Invalid array element:", arrayElem);
      // Handle the error case or throw an error if necessary
    }
  };

  function checkPythonCode(data) {
    //console.log ("herer", currentPythonCode.current, data.correctCode);
    currentPythonCode.current.replace(/(?:\r\n|\r|\n)/g, "");
    //console.log ("Answer and code match", currentPythonCode.current.localeCompare(data.correctCode));
    if (currentPythonCode.current.localeCompare(data.correctCode) == 0) {
      setComponentArray((componentArray) => {
        setDisplayNextComponent(true);
        componentArray.pop();
        //console.log ("component array till now",componentArray);
        return [
          ...componentArray,
          ConvertJsonToComponent(
            data.responseAction.correct,
            null,
            session,
            componentKey.current++
          ),
        ];
      });
    } else {
      //not correct, we have to ask to resubmit the code
      //Also, we cannot proceed
      setComponentArray((componentArray) => {
        //console.log ("component array till now",componentArray);
        componentArray.pop();
        componentArray.pop();
        componentArray.pop();
        currentIndexToDisplay.current -= 3;
        setDisplayNextComponent(false);
        //lessonBlock.current = [...data.responseAction.elementsToAdd, lessonBlock.current]
        lessonBlockBuffer.current.push({ id: 1, type: "clearpage" });
        lessonBlockBuffer.current.push({ id: 1, type: "showpage" });
        let ackElem = { id: 1, type: "ack", message: "Click next to proceed" };
        return [
          ...componentArray,
          ConvertJsonToComponent(data.responseAction.incorrect, null, session),
          ConvertJsonToComponent(
            ackElem,
            handleOptionClick,
            session,
            componentKey.current++
          ),
        ];
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
  function handleOptionClick(e, response, data) {
    if (conversationState.current == ConversationState.Quiz) {
      handleOptionClickInQuizMode(response, data);
      return;
    }
    if (conversationState.current == ConversationState.CHPYCON) {
      handleOptionClickInPythonCheckMode(response, data);
      return;
    }

    if (response == "ackclick") {
      setDisplayNextComponent(true);
      setComponentArray((componentArray) => {
        setDisplayNextComponent(true);
        componentArray.pop();
        //console.log ("component array till now",componentArray);
        //Remove the question, answer block, show the clicked message as Learner's response, then add the response for the option selected
        return [
          ...componentArray,
          <ChatBotMessage message="Loading..." key={componentKey.current++} />,
        ];
      });
      addComponentEverySecond(); //calling to avoid initial delay
      return;
    }
    if (response != "ackspclick" && data.type == "learnerevent") {
      //setDisplayNextComponent(true);
      setComponentArray((componentArray) => {
        //setDisplayNextComponent(true);
        componentArray.pop();
        //console.log ("component array till now",componentArray);
        //Remove the question, answer block, show the clicked message as Learner's response, then add the response for the option selected
        return [
          ...componentArray,
          <LearnerMessage message={response} key={componentKey.current++} />,
          <ChatBotMessage message="Loading..." key={componentKey.current++} />,
        ];
        //return [...componentArray,<ChatBotMessage message = "Loading..." key={componentKey.current++}/>]
      });
      onEventAck(data.data);
      //setTimeout (() => {onEventAck(data.data)}, 1000);
      //addComponentEverySecond(); //calling to avoid initial delay
      // performLearnerActionFromMission("addcourses", arrayElem.missions);
      return;
    }

    if (response == "ackspclick" && data.type == "openaievent") {
      console.log("openaievent");
      //setDisplayNextComponent(true);
      const jokeResponseFromApi = (async function () {
        const response = await fetch("/api/GenerateJokes", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(prompt),
        });
        const result = await response.json();
        console.log("This is the json response : ", result);

        //changes
        var splitmessage = result.data.text;
        console.log("The type of splitmessage is", typeof splitmessage);
        console.log(splitmessage);
        var str = splitmessage.match(/[^\.!\?]+[\.!\?]+/g); //gives an object
        console.log("The type of str is", typeof str, " ", str);
        const responseArray = str.map((ele) => ({ type: "TM", message: ele }));
        console.log(responseArray);
        lessonBlockBuffer.current = responseArray;
        // setConversationState(ConversationState.Normal);
        setDisplayNextComponent(true);
        return result;
      })();

      // console.log("we are getting the joke response", jokeResponseFromApi);
      //return [...componentArray,<ChatBotMessage message = "Loading..." key={componentKey.current++}/>]
      // onEventAck(data.data);
      //setTimeout (() => {onEventAck(data.data)}, 1000);
      //addComponentEverySecond(); //calling to avoid initial delay
      // performLearnerActionFromMission("addcourses", arrayElem.missions);
      return;
    }

    if (response == "ackspclick") {
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
    if (response == "chpyco") {
      checkPythonCode(data);
      return;
    }
    if (response == "chpycon") {
      setDisplayNextComponent(true);

      return;
    }
    if (data.type == "block") {
      lessonBlock.current = data.block;
      console.log("Data is", data, "lsessonBlock.current is", lessonBlock);
      currentIndexToDisplay.current = 0;
      //setDisplayNextComponent(true);
      setClearLastQuestion(true);
      setComponentArray((componentArray) => {
        setDisplayNextComponent(true);
        componentArray.pop();
        //console.log ("component array till now",componentArray);
        //Remove the question, answer block, show the clicked message as Learner's response, then add the response for the option selected
        return [
          ...componentArray,
          <LearnerMessage message={response} key={componentKey.current++} />,
        ];
      });
      addComponentEverySecond(); //calling to avoid initial delay
      return;
    }
    setClearLastQuestion(true);
    //Here means one of the response from quiz question was clicked
    setComponentArray((componentArray) => {
      setDisplayNextComponent(true);
      componentArray.pop();
      //console.log ("component array till now",componentArray);
      //Remove the question, answer block, show the clicked message as Learner's response, then add the response for the option selected
      return [
        ...componentArray,
        <LearnerMessage message={response} key={componentKey.current++} />,
        ConvertJsonToComponent(data, null, session, componentKey.current++),
      ];
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

  return (
    <Container
      component="main"
      maxWidth={maxWidth}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      {/* <TopScreenComponent learnersname = {session.user.username}/>*/}

      <Grid container spacing={0} alignItems="top" justifyContent="left">
        <Grid item xs={3} md={3} lg={5}>
          <Example />
        </Grid>
        <Grid item xs={9} md={9} lg={7}>
          <Fade in={!clearPage} timeout={1000}>
            <Box>
              {componentArray}
              <div ref={messagesEndRef} autoFocus />
            </Box>
          </Fade>
        </Grid>
      </Grid>
    </Container>
  );
}
