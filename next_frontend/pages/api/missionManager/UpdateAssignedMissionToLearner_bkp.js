import dbConnect from '../../../lib/dbConnect'
import Learner from '../../../models/learnerModel';

export default async (req, res) => {
    await dbConnect();
    const { _id, missions} = req.body;
    // check if user exist
    try {
        console.log ("The missions got is", missions);
        let learner = await Learner.findOne({ _id });
        if (learner)
        {
            learner.missionProgress = missions;
            try {
                const updatedLearner = await learner.save();
                if (updatedLearner)
                {
                    return res.status(200).json({
                        message: 'Course successfully added'
                    });
                }
            }
            catch (err)
            {
                console.log ("The error is ", err)
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