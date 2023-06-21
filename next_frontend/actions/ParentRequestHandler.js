export const GetSetParentDataThroughAPI =  (data) => {
    //console.log ("sdfasdfsa",data);
    var apiURL ="/api/parent/ParentAPI";

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
