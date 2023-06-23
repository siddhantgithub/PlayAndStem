import dbConnect from '../../../lib/dbConnect'
import Learner from '../../../models/learnerModel';

function getUpdatedLearnerFromRequest (learner, data, reqType)
{
    switch (reqType)
    {
        case "UPDATEMISSIONPROGRESS":
            learner.missionProgress = data;
            break;

        case "UPDATECHAPTERPROGRESS":
            learner.chapterProgress = data;
            break;

        case "UPDATEQUIZPROGRESS":
            learner.quizProgress = data;
            break;
    }
    return learner;
}

function getDataToSendToLearner (learner,reqType)
{
    var data;
    switch (reqType)
    {
        case "GETMISSIONPROGRESS":
            data = {missionProgress: learner.missionProgress};
            break;

        case "GETCHAPTERPROGRESS":
            data = {chapterProgress: learner.chapterProgress};
            break;  
            
        case "GETQUIZPROGRESS":
            data = {quizProgress: learner.quizProgress};
            break;

        case "GETALLPROGRESS":
            data = {firstName:learner.firstname, userName: learner.username, lastName: learner.lastname, missionProgress: learner.missionProgress,chapterProgress: learner.chapterProgress, quizProgress: learner.quizProgress};
            break;    
    }
    return data;
}

export default async (req, res) => {
    await dbConnect();
    const { _id, data,reqType} = req.body;
    console.log ("Request type is ", reqType, "id is ", _id);
    // check if user exist
    try {
        let learner = await Learner.findOne({ _id });
        console.log ("Found the learner");
        if (learner)
        {
            //Check whether update needs to happen
            if (reqType == "UPDATEMISSIONPROGRESS" || reqType == "UPDATECHAPTERPROGRESS" || reqType == "UPDATEQUIZPROGRESS" )
            {
                learner = getUpdatedLearnerFromRequest(learner,data,reqType )
                
                //learner.missionProgress = missions;
                try {
                    const updatedLearner = await learner.save();
                    if (updatedLearner)
                    {
                        return res.status(200).json({
                            message: 'Update Successful'
                        });
                    }
                }
                catch (err)
                {   
                    console.log ("The error is ", err)
                }
            }
            //Need to send data back
            else{
                var rdata = getDataToSendToLearner(learner,reqType);
                console.log ("Data to send for the learner is", rdata);
                return res.status(200).json(rdata);
            }
        }
        else
        {
            return res.status(400).json({
                error: "Cannot find the learner"
            });
        }
    }
    catch (e) 
    {
        console.error(e);
        return res.status(400).json({
            error: 'Cannot Login user'
        });
    }  
 };