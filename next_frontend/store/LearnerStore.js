import { create } from 'zustand'

export const LearnerActivityState  = {
    FirstLogin:0,
    MissionStarted:1,
    MissionEnded:4,
    ChapterStarted:2,
    ChapterEnded:3,
  };

  const LearnerStore = create((set) => ({
    userName: '',
    firstName: '',
    lastName: '',
    missionProgress:[],
    updateMissionProgress: (newMissionProgress) => set (() => ({missionProgress:newMissionProgress})),
    chapterProgress:[],
    updateChapterProgress: (newChapterProgress) => set (() => ({chapterProgress:newChapterProgress})),
    quizProgress:[],
    updateQuizProgress: (newQuizProgress) => set (() => ({quizProgress:newQuizProgress})),
    currentActivityState:{state:LearnerActivityState.FirstLogin, data:'NA'},
    updateCurrrentActivityState: (newCurrentActivity) => set (() => ({currentActivityState:newCurrentActivity})),
    speechVolume: 1,
    updateSpeechVolume : (newSpeechVolume) => set (() => ({speechVolume:newSpeechVolume})),
    typeWriterDelay: 60,
    updateTypeWriterDelay : (newDelay) => set (() => ({typeWriterDelay:newDelay})),
    isCairoMuted: false,
    updateCairoMuted : (isMuted) => set (() => ({isCairoMuted:isMuted})),
    cairoVoice: 'Google UK English Female',
    updateCairoVoice: (newvoice) => set (() => ({cairoVoice:newvoice})),

  }));

export default LearnerStore