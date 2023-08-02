import dbConnect from '../../../lib/dbConnect'
import Learner from '../../../models/learnerModel';

export default async (req,res) => {
    await dbConnect();
    const { _id} = req.body;
    // check if user exist
    try {
        //console.log ("The object id", _id);
        let learner = await Learner.findOne({ _id });
        if (learner)
        {
            return res.status(200).json({
                missionProgress: learner.missionProgress
            });

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