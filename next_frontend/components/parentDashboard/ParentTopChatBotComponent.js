import * as React from 'react';
import Typography from '@mui/material/Typography';
import { signIn, signOut, useSession } from "next-auth/react"
import {LessonText} from '../../assets/lessons/FirstLoginConversation'
import { useStore } from "zustand";
import LearningConversation from '../ChatInterface/ShowLearningConversationWithAnimation';

//Need to rethink how TopChatbotComponent works as this is crucial for engagement
//How the engagement will change. Let's identify different states
//State 1 - Initial conversation
//State 2 - Suggest a mission or a chapter - Started a mission - you have started this mission, want to go to the next chapter
//State 3 - Suggest to revise a concept 
//State 4 - Recently completed a chapter or a quiz 
//State 5 - Answer a question --> Later
//Jokes and stories should be at the start of a chapter
export default function ParentTopChatBotComponent (props)
{
    const { data: session, status } = useSession();
    const isUser = !!session && session.user;
    const loading = status === "loading"
    const {onEventAck,learnerQuizProgress} = props;
    
  
    React.useEffect(() => {
      if (loading) return // Do nothing while loading
      if (!isUser) signIn() // If not authenticated, force log in
    }, [isUser, loading])

    const lessonEndReached = (props) => {
    //setLessonInProgress(false);
    }


    return (
            <LearningConversation
                LessonText={LessonText} OnLessonEnd = {lessonEndReached} onEventAck={onEventAck} learnerQuizProgress={learnerQuizProgress}/>
    );
}
