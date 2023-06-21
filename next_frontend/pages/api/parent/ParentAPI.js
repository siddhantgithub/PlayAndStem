import dbConnect from '../../../lib/dbConnect'
import Parent from '../../../models/parentModel';
import { RequestTypeForParentLogin } from '../../../constants/AllEnums';
import { AddLearner } from '../../../models/CommonFunctions';

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

function getParentData (reqType, parentData,res)
{
    var data;
    switch (reqType)
    {
        case RequestTypeForParentLogin.Login:
            data = {missionProgress: learner.missionProgress};
            break;

        case RequestTypeForParentLogin.AddLearner:
            break;
   
    }
    return data;
}

export default async (req, res) => {
    await dbConnect();
    console.log ("Request body is", req.body);
    const { reqType} = req.body;
    const { id,name, email,provider} = req.body.user;

    
    // check if user exist
    try {
        let parentObj = await Parent.findOne({email });
        if (!parentObj)
        {
            
            const learners = [];
            const password = "newpassword";
            let newParent = new Parent({ id, name, email, learners, password});
            try {
                parentObj = await newParent.save();
                //return res.status(200).json(saveResult);
    
            }catch (e) {
                console.error(e);
                return res.status(400).json({
                    error: 'Parent Not Found and cannot create parent'
                });
            }
        }
        console.log ("Reqtype is ", reqType, " request obj is", parentObj);
        switch (reqType)
        {
            case RequestTypeForParentLogin.Login:
                return res.status(200).json(parentObj);
                break;

            case RequestTypeForParentLogin.AddLearner:
                //Learner name, age, sex, username will be set after first login
                //When adding Learner, need to see whether account already exists - second stage
                //Learner added in the array and in the db
                console.log ("Learner got is",req.body.learner);
                const {name, username, password} = req.body.learner;
                var learnerObj = {firstname:name, lastname:"asdf", username, password, parentemail: email };
                let newLearner = await AddLearner(learnerObj);
                console.log ("New learner we have got is ", newLearner);
                if (newLearner.error)
                {
                    return res.status(400).json({
                        error: newLearner.error
                    });

                }
                try {
                    let saveResult = await newLearner.save();
                    return res.status(200).json({
                        message: 'Learner Added'
                    });
        
                }catch (e) {
                    console.error(e);
                    return res.status(400).json({
                        error: 'Cannot Add Learner'
                    });
                }
                //return res.status(200).json(req.body.learner);
                break;       
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