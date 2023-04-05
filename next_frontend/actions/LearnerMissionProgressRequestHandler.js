export const GetSetLearnerDataThroughAPI =  (data) => {
    //console.log ("sdfasdfsa",data);
    var apiURL ="";
    switch (data.reqType)
    {
        case "GETMISSIONPROGRESS":
            apiURL =  `/api/missionManager/GetMissionProgressForLearner`;
            break;

        case "UPDATEMISSIONPROGRESS":
            apiURL =  `/api/missionManager/UpdateAssignedMissionToLearner`;
            break;

        case "GETCHAPTERPROGRESS":
            apiURL =  `/api/missionManager/APILearnerProgress`;
            break;
    
        case "UPDATECHAPTERPROGRESS":
            apiURL =  `/api/missionManager/APILearnerProgress`;
            break;
    }

    return fetch(apiURL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        //console.log (response.status);
        return response.json();
    })
    .catch(err => console.log("here is the error",err));
};

export const UpdateLearnerMissionProgress = learner => {
    //console.log ("sdfasdfsa",user);
    return fetch(`/api/missionManager/UpdateAssignedMissionToLearner`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(learner)
    })
    .then(response => {
        console.log (response.status);
        return response.json();
    })
    .catch(err => console.log("here is the error",err));
};

export const GetLearnerMissionProgress = data => {
    //console.log ("sdfasdfsa",data);
    return fetch(`/api/missionManager/GetMissionProgressForLearner`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        //console.log (response.status);
        return response.json();
    })
    .catch(err => console.log("here is the error",err));
};

export const UpdateLearnerChapterProgress = learner => {
    //console.log ("sdfasdfsa",user);
    return fetch(`/api/missionManager/UpdateChapterProgressForLearner`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(learner)
    })
    .then(response => {
        console.log (response.status);
        return response.json();
    })
    .catch(err => console.log("here is the error",err));
};

export const GetLearnerChapterProgress = data => {
    //console.log ("sdfasdfsa",data);
    return fetch(`/api/missionManager/GetChapterProgressForLearner`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        //console.log (response.status);
        return response.json();
    })
    .catch(err => console.log("here is the error",err));
};