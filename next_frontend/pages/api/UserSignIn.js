import dbConnect from '../../lib/dbConnect'
import Learner from '../../models/learnerModel';

export default async (req, res) => {
    await dbConnect();
    const { username, password } = req.body;
    // check if user exist
    try {
        let learner = await Learner.findOne({ username });
        if (learner)
        {
            if (!learner.authenticate(password)) {
                return res.status(400).json({
                    error: 'Username and password do not match.'
                });
            }
            const { _id, username, firstname, lastname} = learner;
            return res.json({
                learner: { _id, username, firstname, lastname}
            });

        }
        else
        {
            return res.status(400).json({
                error: 'Learner with that username does not exist. Please signup.'
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