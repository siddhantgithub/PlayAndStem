import fetch from 'isomorphic-fetch';

export const SendAddLearnerPostRequest = user => {
    //console.log ("sdfasdfsa",user);
    return fetch(`http://127.0.0.1:8000/api/addlearner`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const GetLearnersArray = userid => {
    return fetch(`http://127.0.0.1:8000/api/getlearners`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userid)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};