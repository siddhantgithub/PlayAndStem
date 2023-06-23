import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const LearnerActivityState  = {
    FirstLogin:0,
    MissionStarted:1,
    MissionEnded:4,
    ChapterStarted:2,
    ChapterEnded:3,
  };

  export const CairoSpeedPossible = {
    Slow:.8,
    Normal: 1.0,
    Fast: 1.2
  };

  export var CairoForwardSpeed = 1.0;

  export function isCairoMaxSpeed ()
  {
    //console.log ("Returning ", CairoForwardSpeed, CairoForwardSpeed == CairoSpeedPossible.Fast)
     return CairoForwardSpeed == CairoSpeedPossible.Fast;
  }

  export function isCairoMinSpeed ()
  {
     return CairoForwardSpeed == CairoSpeedPossible.Slow;
  }

  export function increaseCairoSpeed ()
  {
    CairoForwardSpeed += .2;

  }

  export function reduceCairoSpeed ()
  {
    CairoForwardSpeed -= .2;

  }

  export function setCairoSpeed (speed)
  {
    CairoForwardSpeed = speed;

  }

  /*const updateValueInDb = (config) => (set, get, api) =>
  config(
    (...args) => {
     // console.log(' applying', args)
      set(...args)
     // console.log('  new state', get())
     //Prepare to store
     var newStateData = get();
     var reqType = "UPDATECAIRODATA";
     var _id = session.user._id;
     var reqObj = {newStateData,_id};
     GetSetLearnerDataThroughAPI(reqObj).then ((resp) => {
;
     });

    },
    get,
    api
  )*/


  const LearnerStore = create(persist((set,get) => ({
    _id:"",
    updateId: (id) => set (() => ({_id:id})),
    userName: '',
    updateUserName: (username) => set (() => ({userName:username})),
    firstName: '',
    updateFirstName: (firstname) => set (() => ({firstName:firstname})),
    lastName: '',
    updateLastName: (lastname) => set (() => ({lastName:lastname})),
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
    typeWriterDelay: 50,
    updateTypeWriterDelay : (newDelay) => set (() => ({typeWriterDelay:newDelay})),
    forwardSpeed: 1,
    updateForwardSpeed : (newSpeed) => set (() => ({forwardSpeed:newSpeed})),
    isCairoMuted: false,
    updateCairoMuted : (isMuted) => set (() => ({isCairoMuted:isMuted})),
    cairoVoice: 'Google UK English Female',
    updateCairoVoice: (newvoice) => set (() => ({cairoVoice:newvoice})),
  }), 
  {
    name: 'cairo-settings', // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
  }

  ));

export default LearnerStore