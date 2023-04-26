const askNextStep = [
    {text:"Go to the mission dashboard", onClickResponse:{type:"learnerevent", data: {subtype: "showmissiondashboard"}}},
    {text:"Start next chapter", onClickResponse:{type:"learnerevent", data: {subtype: "loadnextchapter"}}},
];

export const CommonChapterEndBlock = [
    {id:1, type: "TM", message:"Our chapter ends now. What would you like to do?"},
    {id:8, type: "QWBOL", message: "Provide your response", options:askNextStep},
];