const askNextStep = [
    {text:"Go to the mission dashboard", onClickResponse:{type:"learnerevent", data: {subtype: "showmissiondashboard"}}},
    {text:"Start next chapter", onClickResponse:{type:"learnerevent", data: {subtype: "loadnextchapter"}}},
];

export const CommonChapterEndBlock = [
    {id:1, type: "TM", message:"Our chapter ends now. What would you like to do?"},
    {id:8, type: "QWBOL", message: "Provide your response", options:askNextStep},
];

const askNextStepQuiz = [
    {text:"Go to the mission dashboard", onClickResponse:{type:"learnerevent", data: {subtype: "showmissiondashboard"}}},
    {text:"Start next Quiz", onClickResponse:{type:"learnerevent", data: {subtype: "loadnextchapter"}}},
];


export const QuizEndBlock = [
    {type:"donothing"},
    {id:1, type: "TM", message:"Click next to go to the mission dashboard"},
    {id:1, type: "acksp", data: {type:"learnerevent", subtype:"showmissiondashboard", data:0}},
];

const askNextStepConcept = [
    {text:"Go to the mission dashboard", onClickResponse:{type:"learnerevent", data: {subtype: "showmissiondashboard"}}},
    {text:"Revise next Concept", onClickResponse:{type:"learnerevent", data: {subtype: "loadnextchapter"}}},
];


export const ConceptEndBlock = [
    {id:1, type: "TM", message:"That is all for this concept. Click next to go to the mission dashboard"},
    {id:1, type: "acksp", data: {type:"learnerevent", subtype:"showmissiondashboard", data:0}},
];

export const LastChapterEndBlock = [
    {id:1, type: "TM", message:"Congratulations, your mission is complete"},
    {id:1, type: "missionendcelebration"},
    {type:"learnerevent", data: {type: "learnerevent", subtype: "changemissionstatus", data:{missionid:-1, newstatus:"Completed"}}},
    {id:1, type: "acksp", data: {type:"learnerevent", subtype:"showmissiondashboard", data:0}},
];