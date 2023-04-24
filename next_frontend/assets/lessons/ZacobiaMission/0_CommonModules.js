const askNextStep = [
    {text:"Go to the mission dashboard", onClickResponse:{type:"learnerevent", data: {subtype: "showmissiondashboard"}}},
    {text:"Start next chapter", onClickResponse:{type:"learnerevent", data: {subtype: "loadnextchapter"}}},
];

export const CommonChapterEndBlock = [
    {id:1, type: "TM", message:"Our chapter ends now. You can either go to mission dashboard or directly go to the next chapter"},
    {id:13, type: "donothing"},
    {id:13, type: "TM", message: "Would you like to go to the next chapter or the mission dashboard?"},
    {id:8, type: "QWBOL", message: "Provide your response", options:askNextStep},
];