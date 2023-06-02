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
import LearnerStore, {LearnerActivityState} from "../../store/LearnerStore";
import {AllMissionList} from '../../assets/moduleList/AllMissionChapterList';
import { ChapterState } from "./DisplayChaptersWithinMission";

//Need to rethink how TopChatbotComponent works as this is crucial for engagement
//How the engagement will change. Let's identify different states
//State 1 - Initial conversation
//State 2 - Suggest a mission or a chapter - Started a mission - you have started this mission, want to go to the next chapter
//State 3 - Suggest to revise a concept 
//State 4 - Recently completed a chapter or a quiz 
//State 5 - Answer a question --> Later
//Jokes and stories should be at the start of a chapter
const TopChatBotComponent = React.forwardRef((props, ref) =>{
    const { data: session, status } = useSession();
    const isUser = !!session && session.user;
    const loading = status === "loading"
    const {onEventAck,learnerQuizProgress} = props;
  
    React.useEffect(() => {
      if (loading) return // Do nothing while loading
      if (!isUser) signIn() // If not authenticated, force log in
    }, [isUser, loading])

    const [activityState,missionProgress, chapterProgress,updateCurrrentActivityState] = LearnerStore ((state) => [state.currentActivityState, state.missionProgress, state.chapterProgress, state.updateCurrrentActivityState]);
    //console.log ("The user activity state", activityState,updateCurrrentActivityState);

    const lessonEndReached = (props) => {
    //setLessonInProgress(false);
    }

    const conversationText = returnConversationForLearnerState(activityState,missionProgress, chapterProgress,updateCurrrentActivityState);
    //console.log ("Conversation text is", conversationText);

    return (
            <LearningConversationWithAnimation
                LessonText={conversationText} OnLessonEnd = {lessonEndReached} onEventAck={onEventAck} learnerQuizProgress={learnerQuizProgress}/>
    );
  })

  //Algorithn show a message for in-progress mission first
  //Then depending on the state
  function returnConversationForLearnerState(activityState,missionProgress,chapterProgress,updateCurrrentActivityState)
  { 
    // if (activityState.state == LearnerActivityState.FirstLogin)
    //     return LessonText;
    //TODO: Deal with multiple in-progress missions
    //Right now just look for which one is in progress and which chapter is available next
    if (missionProgress.length == 0)
    {
        const WaitingBlock = [
            {type: "TM", message: "Getting User Data"},
            {type: "TM", message: "Please Wait"},
            {id:1, type: "acksp", data: {type:"learnerevent", subtype:"loadmission", data:activityState.data}},
        ];
        return WaitingBlock;
    }
   //console.log ("hererererereerer", activityState,missionProgress,chapterProgress);
    const firstAvailableMissionIndex = missionProgress.findIndex ((elem) => elem == "Available");
    if (firstAvailableMissionIndex != -1 )
    {
        console.log ("First available mission Index", firstAvailableMissionIndex);
        const missionAvailable = AllMissionList[firstAvailableMissionIndex];
        var firstAvailableChapterIndex = chapterProgress[firstAvailableMissionIndex].findIndex ((elem) => elem == ChapterState.Available || elem == ChapterState.InProgress);
        if (firstAvailableChapterIndex != -1 && firstAvailableChapterIndex < missionAvailable.moduleList.length)
        {
            console.log ("First available chapter index is", firstAvailableChapterIndex);
            var firstAvailableChapter = missionAvailable.moduleList[firstAvailableChapterIndex];
            console.log ("Firs mission is", missionAvailable.name, " first chapter available is", firstAvailableChapter.name);
            const MissionProgressBlock = [
                {type: "TM", message: "Hey, mission<b> " + missionAvailable.name + "</b> is in progress"  },
                {type: "TM", message: "Click next to go to the mission dashboard"},
                {id:1, type: "acksp", data: {type:"learnerevent", subtype:"loadmission", data:missionAvailable.id}},
            ];
            return MissionProgressBlock;
        }
    }
    else
    {
        console.log ("The user activity state xxxx", activityState,updateCurrrentActivityState);
        activityState.state = LearnerActivityState.MissionEnded;
        //updateCurrrentActivityState({state:LearnerActivityState.MissionEnded, data:null});
    }

    switch (activityState.state)
    {
        case LearnerActivityState.FirstLogin:
            return LessonText;
        break;

        case LearnerActivityState.MissionStarted:
            const MissionAvailableBlock = [
                {type: "TM", message: "Hey, mission<b> " + activityState.data.name + "</b> is in progress"  },
                {type: "TM", message: "Click next to go to the mission dashboard"},
                {id:1, type: "acksp", data: {type:"learnerevent", subtype:"loadmission", data:activityState.data.id}},
            ];
            return MissionAvailableBlock;
        break;

        case LearnerActivityState.ChapterStarted:
            const ChapterStartedBlock = [
                {type: "TM", message: "Hey, you recently started the chapter " + activityState.data.name + ", want to go to it now?"},
                {type: "TM", message: "Click on the next button to go to the chapter"},
                {id:1, type: "acksp", data: {type:"learnerevent", subtype:"loadchapter", data:activityState.data.id}},
            ];
            return ChapterStartedBlock;
        break;

        case LearnerActivityState.ChapterEnded:
            const ChapterEndedBlock = [
                {type: "TM", message: "Hey, great job in completing the chapter " + activityState.data.name},
                {type: "TM", message: "Click next below to go to the next chapter"},
                {id:1, type: "acksp", data: {type:"learnerevent", subtype:"loadnextchapter", data:activityState.data.id}},
            ];
            return ChapterEndedBlock;
        break;

        case LearnerActivityState.MissionEnded:
            const MissionEndedBlock = [
                {type: "TM", message: "Great job in completing all the missions"},
                {type: "TM", message: "You can now either retry quizzes or revise concepts in the completed mission"},
                {type: "donothing", message: "Great job in completing all the missions"},
                {type: "TM", message: "Click on the missions below to go to their dashboards or click next to go to the first Mission"},
                {id:1, type: "acksp", data: {type:"learnerevent", subtype:"loadmission", data:0}},
            ];
            return MissionEndedBlock;
        break;
    }

  }

  export default React.memo(TopChatBotComponent);