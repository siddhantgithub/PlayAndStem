import dbConnect from '../../lib/dbConnect'
import Learner from '../../models/learnerModel';

export default async (req, res) => {
    try {
       await dbConnect();
      let user = await Learner.findOne({ username: req.body.username })
        if (user && user.parentemail != req.body.parentemail) {
            //different parent email means a new user with a username already taken up
            return res.status(400).json({
                error: 'Username is taken'
            });
        }

        if (user && user.parentemail == req.body.parentemail) {
            //just update the password
            user.password = req.body.password;
            let saveduser = await user.save();

            if (saveduser)
            {
                return res.status(200).json({
                    message: 'Password updated'
                });

            }
            else {
                return res.status(400).json({
                    error: 'Cannot update password'
                });

            }           
        }
    
        const { firstname, lastname, username, parentemail, password } = req.body;
        let newlearner = new Learner({ firstname, lastname, username, password, parentemail});

        try {
            let saveResult = await newlearner.save();
            return res.status(200).json({
                message: 'User Created'
            });

        }catch (e) {
            console.error(e);
            return res.status(400).json({
                error: 'Cannot create user'
            });
        }
    } catch (e) {
        console.error(e);
    }
 };