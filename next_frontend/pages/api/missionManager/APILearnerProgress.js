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
    }
    return data;
}

export default async (req, res) => {
    await dbConnect();
    const { _id, data,reqType} = req.body;
    // check if user exist
    try {
        let learner = await Learner.findOne({ _id });
        if (learner)
        {
            //Check whether update needs to happen
            if (reqType == "UPDATEMISSIONPROGRESS" || reqType == "UPDATECHAPTERPROGRESS" )
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