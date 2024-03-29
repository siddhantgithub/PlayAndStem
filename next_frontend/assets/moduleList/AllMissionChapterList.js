import { ZacobiaQuizList,NoNumQuizList, SadosQuizList } from "../quizData/AllQuizList";
import { ZacobiaConceptList } from "../lessons/ZacobiaMission/keyConcepts/AllKeyConceptList";
import { NoNumConceptList } from "../lessons/NoNumMission/keyConcepts/AllKeyConceptList";
import { SaddosConceptList } from "../lessons/SaddosMusic/keyConcepts/AllKeyConceptList";

export const ZacobiaModuleList = [
    {id:0, name:"Mission Introduction",   fileName:"ZacobiaMission/1_MissionIntroduction.js",  description: "Planet Zacobia's problem and how we can solve it",topicsCovered:"Problem Introduction",image:"MissionIntroduction.png"},
    {id:1,name:"How To Run",    fileName:"ZacobiaMission/1_1_HowToRunCodeOnMicrobit.js",    description: "How to run a program on Microbit",             topicsCovered:"Running Code On Microbit",image:"RunCode.jpg"},
    {id:2,name:"Let's Break It Down",    fileName:"ZacobiaMission/2_BreakingIntoSteps.js",    description: "Breaking down a problem into smaller parts",             topicsCovered:"Problem solving",image:"BreakItDown.png"},
    {id:3,name:"Statements and Syntax",  fileName:"ZacobiaMission/3_ProgramStmtsSyntax.js",   description: "Statements and syntax in computer programming",             topicsCovered:"Statements, Syntax",image:"StmtsAndSyntax.png"},
    {id:4,name:"Let's get help",         fileName:"ZacobiaMission/4_ModuleImport.js",         description: "Modules and using them in Python", topicsCovered:"Python Import Statement",image:"Help.png"},
    {id:5,name:"Reading light level",    fileName:"ZacobiaMission/5_LightLevel.js",           description: "Measure light level using Microbit",topicsCovered:"Calling API",image:"ReadLightLevel.png"},
    {id:6,name:"Display on and off",fileName:"ZacobiaMission/6_ShowClearDisplay.js",description: " API to switch on and off Microbit's display",topicsCovered:"Switching on and off display",image:"ShowAndClearDisplay.png"},
    {id:7,name:"Conditions",fileName:"ZacobiaMission/7_Conditions.js",description: "Conditional statements and their use",topicsCovered:"Conditional statements",image:"Conditions.png"},
    {id:8,name:"Blocks",fileName:"ZacobiaMission/8_Blocks.js",description: "Python blocks and why they are important",topicsCovered:"Indentation, Blocks",image:"Blocks.png"},
    {id:9,name:"Learning About If",fileName:"ZacobiaMission/9_IfStatement.js",description: "Conditions with If statement",topicsCovered:"If statement in Python",image:"LearnIf.png"},
    {id:10,name:"Switch display only if",fileName:"ZacobiaMission/10_ConditionOnOffDisplay.js",description: "Conditionally switch on and off a display",topicsCovered:"If statement implementation",image:"ConditionOnOff.png"},
    {id:11,name:"Loops - Doing again",fileName:"ZacobiaMission/11_WhileLoop.js",description: "Loops and using While for a loop in Python",topicsCovered:"Problem Introduction",image:"Loops.png"},
    {id:12,name:"Take rest with sleep",fileName:"ZacobiaMission/12_Sleep.js",description: "Adding a dealy using Python sleep statement",topicsCovered:"Sleep statement in Python",image:"Sleep.png"},
    {id:13,name:"We have done it",fileName:"ZacobiaMission/13_Conclusion.js",description: "Adding comments to our code",topicsCovered:"Problem Introduction",image:"Conclusion.png"},
    {id:14,name:"Final Walkthrough",fileName:"ZacobiaMission/14_FinalCodeWalkthrough.js",description: "Practice the Python code from the mission",topicsCovered:"Problem Introduction",image:"FinalWalkthrough.jpg"},
];

export const NoNumModuleList = [
    {id:0,name:"Mission Introduction",   fileName:"NoNumMission/1_MissionIntroduction.js",  description: "Problem of numbers for the planet NoNum",topicsCovered:"Problem Introduction",image:"NoNums1.png"},
    {id:1,name:"Loop For Numbers",    fileName:"NoNumMission/2_ForLoopGeneratingNumbers.js",    description: "Generate numbers in a loop using For and Range",topicsCovered:"For Loop",image:"NoNums2.png"},
    {id:2,name:"Functions in Python",   fileName:"NoNumMission/3_IntroductionToFunction.js",  description: "How to reuse code using functions",topicsCovered:"Functions",image:"NoNums3.png"},
  //{id:3,name:"Create A Module",    fileName:"NoNumMission/4_CreatingModules.js",    description: "Creating and sharing our own modules",topicsCovered:"Creating Modules",image:"NoNums4.png"},
];

export const SaddosModuleList = [
    {id:0,name:"Mission Introduction",   fileName:"SaddosMusic/1_MissionIntroduction.js",  description: "Problem of sadness on plant Saddos",topicsCovered:"Problem Introduction",image:"SaddosUnhappy.jpg"},
    {id:1,name:"Understanding Circuits",    fileName:"SaddosMusic/2_UnderstandingCircuits.js",    description: "Understanding how electric circuit works",topicsCovered:"For Loop",image:"SaddosCircuits.jpg"},
    {id:2,name:"Building a piano",   fileName:"SaddosMusic/3_MakingAPiano.js",  description: "Making a small piano to make saddos happy",topicsCovered:"Making a small piano to make saddos happy",image:"SaddosPiano.jpg"},
];

export const AllMissionList = [
    {id: 0, dependency: [], category: "Robotics with Python and Microbit",name:"Zacobian Lights", image:"/zacobiamission.png", folderName: "ZacobiaMission", moduleList: ZacobiaModuleList,description:"Solve planet Zacobia's light problems", quizList:ZacobiaQuizList, conceptList: ZacobiaConceptList, goal:"Basics of Python and Microbit"},
    {id: 1, dependency: [1], category:"Robotics with Python and Microbit",name:"NoNums' Number", image:"/nonummission.png", folderName: "NoNumMission", moduleList: NoNumModuleList,description:"Generate numbers for NoNums", quizList:NoNumQuizList, conceptList: NoNumConceptList, goal:"Functions and for loops in Python"},
    {id: 2, dependency: [],category: "Robotics with Python and Microbit",name:"Saddos want music", image:"/missionImages/MissionSados.jpg", folderName: "SaddosMusic", moduleList: SaddosModuleList,description:"Make a piano for Planet Sados", quizList:SadosQuizList, conceptList:SaddosConceptList, goal:"Make a piano using Microbit"}
];

export const AllDiscoverMissionList = [
    {id: 0, dependency: [],  status:"Added To Dashboard", category: "Robotics with Python and Microbit",name:"Zacobian Lights", image:"/zacobiamission.png", folderName: "ZacobiaMission", moduleList: ZacobiaModuleList,description:"Solve planet Zacobia's light problems", quizList:ZacobiaQuizList, conceptList: ZacobiaConceptList},
    {id: 1, dependency: [], status:"Added To Dashboard", category:"Robotics with Python and Microbit",name:"NoNums' Number", image:"/nonummission.png", folderName: "NoNumMission", moduleList: NoNumModuleList,description:"Generate numbers for NoNums", quizList:NoNumQuizList, conceptList: NoNumConceptList},
    {id: 2, dependency: [],  status:"Added To Dashboard", category: "Robotics with Python and Microbit",name:"Saddos want music", image:"/missionImages/MissionSados.jpg", folderName: "SaddosMusic", moduleList: SaddosModuleList,description:"Make a piano for Planet Sados", quizList:SadosQuizList, conceptList:SaddosConceptList},
    {id: 3, dependency: [],  status:"Coming Soon", category: "Robotics with Python and Microbit",name:"Advance Piano", image:"/missionImages/AdvancedPiano.jpg", folderName: "SaddosMusic", moduleList: SaddosModuleList,description:"Make a piano for Planet Sados", quizList:SadosQuizList, conceptList:SaddosConceptList},
    {id: 4, dependency: [],  status:"Coming Soon", category: "Robotics with Block Programming and Microbit",name:"Zacobian Lights", image:"/zacobiamission.png", folderName: "ZacobiaMission", moduleList: ZacobiaModuleList,description:"Solve planet Zacobia's light problems", quizList:ZacobiaQuizList, conceptList: ZacobiaConceptList},
    {id: 6, dependency: [],  status:"Coming Soon", category: "Robotics with Block Programming and Microbit",name:"Saddos want music", image:"/missionImages/MissionSados.jpg", folderName: "SaddosMusic", moduleList: SaddosModuleList,description:"Make a piano for Planet Sados", quizList:SadosQuizList, conceptList:SaddosConceptList},
    {id: 2, dependency: [],  status:"Added To Dashboard", category: "Robotics with Block Programming and Microbit",name:"Advance Piano", image:"/missionImages/AdvancedPiano.jpg", folderName: "SaddosMusic", moduleList: SaddosModuleList,description:"Make a piano for Planet Sados", quizList:SadosQuizList, conceptList:SaddosConceptList},
    {id: 7, dependency: [],  status:"Coming Soon", category: "First Lego Robotics",name:"What is it?", image:"/missionImages/WhatIsIt.jpg", folderName: "ZacobiaMission", moduleList: ZacobiaModuleList,description:"Solve planet Zacobia's light problems", quizList:ZacobiaQuizList, conceptList: ZacobiaConceptList},
    {id: 8, dependency: [], status:"Coming Soon", category:"First Lego Robotics",name:"Moving A Robot", image:"/missionImages/RoboRun.jpg", folderName: "NoNumMission", moduleList: NoNumModuleList,description:"Generate numbers for NoNums", quizList:NoNumQuizList, conceptList: NoNumConceptList},
    {id: 9, dependency: [],  status:"Coming Soon", category: "First Lego Robotics",name:"Building Attachements", image:"/missionImages/LegoAttachments.jpg", folderName: "SaddosMusic", moduleList: SaddosModuleList,description:"Make a piano for Planet Sados", quizList:SadosQuizList, conceptList:SaddosConceptList}
];

export const MissionDetailedDescription = [
    {
        details:
            "Save planet Zacobia by solving its energy problems. While solving the mission, you will have fun while playing with Microbit. You will also learn basics of computer programming and Python language along the way.",
        level: "Beginner",
    },
    {
        details:
            "Planet NoNums need your help as they keep forgetting about numbers. Use Micro:bit to generate numbers by learning about Python functions and For loops",
        level: "Intermediate. Basic Python knowledge is required.",
    },
    {
        details:
            "Planet Saddos need fun. Use Micro:bit to make a piano for them and learn how to generate music and basics of electric circuits with Micro:bit",
        level: "Intermediate. Basic Python knowledge is required.",
    },
    {
        details:
            "Want to improve a slightly advanced piano than what you build for Saddos. This mission is for you.",
        level: "Advanced. Completing Saddos want music mission is recommended",
    },    
    {
        details:
            "Save planet Zacobia by solving its energy problems. While solving the mission, you will have fun while playing with Microbit. You will also learn how to use blocks to program Micro:bit",
        level: "Beginner",
    },
    {
        details:
            "Planet Saddos need fun. Use Micro:bit to make a piano for them and learn how to generate music and basics of electric circuits with Micro:bit",
        level: "Intermediate. Basic Python knowledge is required.",
    },
    {
        details:
            "Want to improve the advanced piano than what you build for Saddos. This mission is for you.",
        level: "Advanced. Completing Saddos want music mission is recommended",
    },  
    {
        details:
            "Want to participate in a robotics competition. Learn about First Lego League and how to take part in the competition",
        level: "Beginner",
    },
    {
        details:
            "Learn how to move a Lego Spike Prime robot using block programming in this introductory tutorial. You will learn basics of robot movement and color sensors",
        level: "Beginner",
    },    {
        details:
            "Learn how to make different attachments to enable a Lego Spike Prime robot accomplish different tasks such as moving a level, and lifting an object",
        level: "Beginner",
    },

];
export const CategoryList = ["In Progress", "Robotics with Python and Microbit"];
export const DiscoverCategoryList = ["Robotics with Python and Microbit", "Robotics with Block Programming and Microbit", "First Lego Robotics"];