import Learner from "./learnerModel";
import {AllMissionList} from "../assets/moduleList/AllMissionChapterList"


export async function AddLearner (learnerObj)
{
    const { firstname, lastname, username, parentemail, password } = learnerObj;
    let newlearner = null;

    newlearner  = await Learner.findOne({ username});
        if (newlearner) {
            //different parent email means a new user with a username already taken up
            console.log ("Found teh username");
            return ({
                error: 'Username is taken'
            });
        }
    let missionProgress = Array(AllMissionList.length).fill("Available");
    
    //let chapterProgress = []; [[2,0,0,0,0,0,0,0,0,0,0,0,0],[2,0,0,0,0,0,0,0,0,0,0,0,0],[2,0,0,0,0,0,0,0,0,0,0,0,0]];
    //TODO: Implementation will change as learners will be able to add mission dynamically
    let chapterProgress = AllMissionList.map ((elem) => {
        var array = Array(elem.moduleList.length).fill (0)
        array[0] = 2;
        return array;

    });
    let quizProgress = AllMissionList.map ((elem) => {
        var array = Array(elem.quizList.length).fill (-1);
        return array;

    });
    let activityArray = [];

    newlearner = new Learner({ firstname, lastname, username, password, parentemail,missionProgress,chapterProgress,quizProgress,currentActivityState:0,
        speechVolume:1, typeWriterDealy:50, forwardSpeed:1, isCairoMuted:false, cairoVoice: 'Google UK English Female', activityArray});

    return newlearner;
}

export function GetAllLearnersForParent (parentObj)
{
    
    let learnersArray = parentObj.learners.map (async (item) => {
        var learnerForId = await Learner.findOne ({_id:item});
        if (learnerForId)
        {
            return learnerForId;
        }
        else
            return {error: "Couldn't find a learner"};
    });
    return Promise.all(learnersArray);

}