import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/lottie-animations/main-buddy.json";
import Typewriter from 'typewriter-effect';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { signIn, signOut, useSession } from "next-auth/react"
import { ConvertJsonToComponent } from "../ChatInterface/ShowLearningConversationWithAnimation";
import LearningConversationWithAnimation from '../ChatInterface/ShowLearningConversationWithAnimation';
import {LessonText} from '../../assets/lessons/FirstLoginConversation'
import { UpdateLearnerMissionProgress } from '../../actions/LearnerMissionProgressRequestHandler';

//Options for TopChatBot
//We can just show a learning conversation for now and then all the missions at the bottom
//We need to decide different states for the top chatbot
//State 1: Initial - Take assessment and identify a level
//State 2: Assessment done: Offer few options
//State 3: Started a mission - Ask to complete the next module in the mission or take a quiz to reinforce learning
//State 4: Completed a mission - Ask t take a quiz or start a new mission
//If nothing completed also given an option to select a mission at random
//This file displays the top chatbot on Learner's dashboard
//What this chatbot should show
//Say hi each time a user logs in
//Bascially this chatbot will be a guide for the learners to navigate courses
//The message displayed by chatbot will be dependent on the state of the user
//For example, if initial assessment not done then asks the learner to complete the initial assessment
//Otherwise, suggest course or a quiz that the learner needs to take
//At this stage important that this interface should be able to show any text passed from outside

//Need a function which can add typewriter text, questions, whatever is needed
//For now keep it as simple as it can be
//Recommendation what has to be done next
//First thing to implement, if you add a text, it gets displayed. one by one
const TopChatBotComponent = React.forwardRef((props, ref) =>{
    const { data: session, status } = useSession();
    const isUser = !!session && session.user;
    const loading = status === "loading"
    const {onEventAck} = props;
  
    React.useEffect(() => {
      if (loading) return // Do nothing while loading
      if (!isUser) signIn() // If not authenticated, force log in
      //console.log ("The value of session is", session);
    }, [isUser, loading])

    const lessonEndReached = (props) => {
    //setLessonInProgress(false);
    }

    function performLearnerActionFromMission (actionType, data)
    {
        switch (actionType)
        {
            case "addcourses":
                var missionAdded = false;
                for (var i =0; i < data.length; ++i)
                {
                    if (session.user.missionProgress.indexOf(data[i]) != -1)
                    {
                        missionAdded = true;
                        session.user.missionProgress.push(data[i])
                    }
                }
                if (missionAdded)
                {
                    var dataObj = {_id: session.user._id, missions:data}
                    UpdateLearnerMissionProgress(dataObj);
                }
                break;
        }
    }

    return (
            <LearningConversationWithAnimation performLearnerActionFromMission={performLearnerActionFromMission} 
                LessonText={LessonText} OnLessonEnd = {lessonEndReached} onEventAck={onEventAck}/>
    );
  })

  export default TopChatBotComponent;