import dbConnect from '../../lib/dbConnect'
import Learner from '../../models/learnerModel';
import { AllMissionList } from '../../assets/moduleList/AllMissionChapterList';
import { AddLearner } from '../../models/CommonFunctions';

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
    
        let newlearner = await AddLearner(req.body);
        //console.log ("New learner got is", newlearner);
/*         const { firstname, lastname, username, parentemail, password } = req.body;
        let missionProgress = Array(AllMissionList.length).fill("Not Available");
        
        //let chapterProgress = []; [[2,0,0,0,0,0,0,0,0,0,0,0,0],[2,0,0,0,0,0,0,0,0,0,0,0,0],[2,0,0,0,0,0,0,0,0,0,0,0,0]];
        let chapterProgress = AllMissionList.map ((elem) => {
            var array = Array(elem.moduleList.length).fill (0)
            array[0] = 2;
            return array;

        });
        let quizProgress = AllMissionList.map ((elem) => {
            var array = Array(elem.quizList.length).fill (-1);
            return array;

        });
        //let quizProgress = Array(20).fill(-1);
        let newlearner = new Learner({ firstname, lastname, username, password, parentemail,missionProgress,chapterProgress,quizProgress,currentActivityState:0,
                                        speechVolume:1, typeWriterDealy:50, forwardSpeed:1, isCairoMuted:false, cairoVoice: 'Google UK English Female'}); */

        try {
            let saveResult = await newlearner.save();
            return res.status(200).json({
                message: 'User Created',
                id:saveResult._id
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