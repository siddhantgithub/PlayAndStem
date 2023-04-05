//Type TM = Normal Message, TMR needs a replacement
//Type QWBO = question with button options
//TYPE ROOC = Response on option clicked
//TYPE OR = Option response
//TYPE ack = Simply get acknolowdgement to proceed further
//TYPE acksp = Special acknowledgement that prompts an action 
//TYPE ADD = Add a mission to learner's profile


//What should happen once someone has selected an option
//Tell them this module will get started
//Put the module in in-progress section
//Also, add other recommendations based on skill level on we know the skill-level
//Next time a learner logs in - show two options. Start with in-progress or try something new , or listen to a joke -- not a priority for now
//Need to start implementing backend and recording progress there

const introEndBlock = [
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TM", message: "We will start with \'Zacobian Lights\' mission"},
    {type: "TM", message: "You can access the mission by clicking on it in the section below"},
    {type: "TM", message: "The next mission \'NoNums' Number\' will become active after we have completed the Zacobia mission"},
    {type:"ADD", data: {type: "changemissionstatus", data:{missionid:1, newstatus:"available"}}},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TM", message: "It is time to start \'Zacobian Lights\' mission"},
    {type: "TM", message: "Click on the mission in the section below or click next to begin"},
    {id:1, type: "acksp", data: {type:"loadmission", data:1}},
];

const dontKnowProgrammingBlock = [
    {type: "TMR", message: "No worries at all."},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TMR", message: "We will go through the basics of Python programming in detail"},
    {type: "TM", message:  "So that you can learn and master the concepts"},
    {type: "block", block:introEndBlock}
];

const continueLittleProgrammingOptions = [
    {text:"Make a game in Scratch", onClickResponse:{type: "TMR", message: "Awesome!!! Let's get started then"}},
    {text:"Make a digital piano using Micro:bit", onClickResponse:{type: "TMR", message: "Hmmm. Sometimes just fine is good. I think once we get started you will soon start feeling great"}},
];

const knowLittleProgrammingBlock = [
    {type: "TMR", message: "Awesome!!!"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TM", message: "I am sure with some knowledge of Python you will be able to enjoy missions a lot"},
    {type: "TM", message: "and solve all three missions really fast"},
    {type: "block", block:introEndBlock}
];

const knowBlockProgrammingOnly = [
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TMR", message: "Awesome!!!"},
    {type: "TM", message: "Let's go on a mission during which we will start with text programming using Python"},
    {type: "donothing"},
    {type: "endmessage"},
];

const PythonRefresher = [
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TMR", message: "Let's go through a mission that will help us to learn basics of Python programming"},
    {type: "donothing"},
    {type: "endmessage"},
];

const AdvancedPythonCourse = [
    {type: "TMR", message: "I have the right mission for you. I have added the mission to your in-progress missions"},
    {type: "donothing"},
    {type: "endmessage"},
];

const pythonRefresherQuestion = [
    {text:"I would like to do a detailed Python based mission before going on an advanced mission", onClickResponse:{type: "block", block:knowBlockProgrammingOnly}},
    {text:"I would like to do a quick Python refresher before going on an advanced mission", onClickResponse:{type: "block", block:PythonRefresher}},
    {text:"I would directly love to go to the advanced mission", onClickResponse:{type: "block", block:AdvancedPythonCourse}},
];

const knowBlockAndTextProgramming = [
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TMR", message: "Incredible!!!"},
    {type: "TM", message: "We can work on a mission that will use few advanced programming concepts"},
    {type: "TM", message: "We will use Python programming language to solve the mission"},
    {type: "TM", message: "Do you want to do a quick refresher of Python language before going to the mission or you want to jump to the mission directly"},
    {id:8, type: "QWBOL", message: "Provide your response", options:pythonRefresherQuestion},
    {type: "donothing"},
    {type: "endmessage"},
];

const typeOfProgramming = [
    {text:"I have done block programming only", onClickResponse:{type: "block", block:knowBlockProgrammingOnly}},
    {text:"I have done block as well as text based programming", onClickResponse:{type: "block", block:knowBlockAndTextProgramming}},
];

const knowProgrammingWellBlock = [
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TMR", message: "Awesome. Great to know you already know programming well"},
    {type: "TM", message: "I would love to know more about what kind of programming you have done"},
    {type: "TM", message: "Please select the right option from below"},
    {id:8, type: "QWBOL", message: "Provide your response", options:typeOfProgramming},
    {type: "donothing"},
    {type: "endmessage"},
];

const askKnowProgrammingResponseOptions = [
    {text:"Not familiar at all", onClickResponse:{type: "block", block:dontKnowProgrammingBlock}},
    {text:"I am familiar", onClickResponse:{type: "block", block:knowLittleProgrammingBlock}},
];

const postInitialAssessmentBlock = [
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TMR", message: "Click a mission under \'Ongoing Missions\' category to get started on a new missions"},
    {type: "TM", message: "You will also find other missions listed under different categories"},
    {type: "TM", message: "Feel free to try them in case you are feeling adventurous"},
    {type: "donothing"},
    {type: "endmessage"},
];

export let LessonText = [
    {id:0, type: "TMR", message:"Hi <learnername>, it is great to see you here"},
    {id:5, type: "TM", message: "I am cairo and together we will solve exciting missions"},
    {id:5, type: "TM", message: "To solve the mission we will use Python and Micro:bit"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type:"ADD", data: {type: "changemissionstatus", data:{missionid:1, newstatus:"Available"}}},
    {id:5, type: "TM", message: "Question - How familiar are you with Python programming?"},
    {id:8, type: "QWBOL", message: "Provide your response", options:askKnowProgrammingResponseOptions},
    {id:1, type: "donothing"},
    {id:1, type: "donothing"},
    {id:1, type: "endmessage"},
];