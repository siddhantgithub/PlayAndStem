export const ZacobiaModuleList = [
    {id:0, name:"Mission Introduction",   fileName:"ZacobiaMission/1_MissionIntroduction.js",  description: "Planet Zacobia's problem and how we can solve it",topicsCovered:"Problem Introduction",image:"MissionIntroduction.png"},
    {id:1,name:"How To Run",    fileName:"ZacobiaMission/1_1_HowToRunCodeOnMicrobit.js",    description: "How to run a program on Micro:bit",             topicsCovered:"Running Code On Micro:bit",image:"RunCode.jpg"},
    {id:2,name:"Let's Break It Down",    fileName:"ZacobiaMission/2_BreakingIntoSteps.js",    description: "Breaking down a problem into smaller parts",             topicsCovered:"Problem solving",image:"BreakItDown.png"},
    {id:3,name:"Statements and Syntax",  fileName:"ZacobiaMission/3_ProgramStmtsSyntax.js",   description: "Statements and syntax in computer programming",             topicsCovered:"Statements, Syntax",image:"StmtsAndSyntax.png"},
    {id:4,name:"Let's get help",         fileName:"ZacobiaMission/4_ModuleImport.js",         description: "Modules and using them in Python", topicsCovered:"Python Import Statement",image:"Help.png"},
    {id:5,name:"Reading light level",    fileName:"ZacobiaMission/5_LightLevel.js",           description: "Measure light level using Micro:bit",topicsCovered:"Calling API",image:"ReadLightLevel.png"},
    {id:6,name:"Display on and off",fileName:"ZacobiaMission/6_ShowClearDisplay.js",description: "APIs to switch on and off Microbit's display",topicsCovered:"Switching on and off display",image:"ShowAndClearDisplay.png"},
    {id:7,name:"Conditions",fileName:"ZacobiaMission/7_Conditions.js",description: "Conditional statements and their use",topicsCovered:"Conditional statements",image:"Conditions.png"},
    {id:8,name:"Blocks",fileName:"ZacobiaMission/8_Blocks.js",description: "Python blocks and why they are important",topicsCovered:"Indentation, Blocks",image:"Blocks.png"},
    {id:9,name:"Learning About If",fileName:"ZacobiaMission/9_IfStatement.js",description: "Conditions with If statement",topicsCovered:"If statement in Python",image:"LearnIf.png"},
    {id:10,name:"Switch display only if",fileName:"ZacobiaMission/10_ConditionOnOffDisplay.js",description: "Conditionally switch on and off a display",topicsCovered:"If statement implementation",image:"ConditionOnOff.png"},
    {id:11,name:"Loops - Doing again",fileName:"ZacobiaMission/11_WhileLoop.js",description: "Loops and using While for a loop in Python",topicsCovered:"Problem Introduction",image:"Loops.png"},
    {id:12,name:"Take rest with sleep",fileName:"ZacobiaMission/12_Sleep.js",description: "Adding a dealy using Python sleep statement",topicsCovered:"Sleep statement in Python",image:"Sleep.png"},
    {id:13,name:"Yay!!! We have done it",fileName:"ZacobiaMission/13_Conclusion.js",description: "Walkthrough of the topcics covered in the mission",topicsCovered:"Problem Introduction",image:"Conclusion.png"},
];

export const NoNumModuleList = [
    {id:0,name:"Mission Introduction",   fileName:"NoNumMission/MissionIntroduction.js",  description: "This module provides an overview of the mission - Problem of numbers for the planet NoNum",topicsCovered:"Problem Introduction",image:"NoNums1.png"},
    {id:1,name:"Loop For Numbers",    fileName:"NoNumMission/ForLoopGeneratingNumbers.js",    description: "Learn how to generate numbers using a for loop",topicsCovered:"For Loop",image:"NoNums2.png"},
    {id:2,name:"Functions for Code Reuse",   fileName:"NoNumMission/IntroductionToFunction.js",  description: "This module introduces the use of functions for reusing code",topicsCovered:"Functions",image:"NoNums3.png"},
    {id:3,name:"Create A Module",    fileName:"NoNumMission/CreatingModules.js",    description: "Module covers how to create our own modules",topicsCovered:"Creating Modules",image:"NoNums4.png"},
];

export const AllMissionList = [
    {id: 0, dependency: [], category: "Robotics,Intermediate,Python,Micro:bit",name:"Zacobian Lights", image:"/zacobiamission.png", moduleList: ZacobiaModuleList,description:"Solve planet Zacobia's light problems"},
    {id: 1, dependency: [1], category:"Robotics,Intermediate,Python,Micro:bit",name:"NoNums' Number", image:"/nonummission.png", moduleList: NoNumModuleList,description:"Generate numbers for NoNums"},
    {id: 2, dependency: [],category: "Robotics,Intermediate,Python,Micro:bit",name:"Sados want music", image:"/missionImages/MissionSados.png", moduleList: NoNumModuleList,description:"Make a piano for Planet Sados"},
    {id: 3, dependency: [],category: "Scratch Games,Beginner",name:"ABC Tutor", image:"/missionImages/MissionABCTutor.png", moduleList: NoNumModuleList,description:"A simple game that teaches English alphabets"},
    {id: 4, dependency: [],category: "Scratch Games,Intermediate",name:"Run Robo Run", image:"/missionImages/MissionRoboRun.png", moduleList: NoNumModuleList,description:"Robo is running and we have to help it run past obstacles"},
    {id: 5, dependency: [],category: "Scratch Games,Advanced",name:"Your Own Quiz Game", image:"/missionImages/MissionQuizGame.png", moduleList: NoNumModuleList,description:"Create your own small quiz game and share it with friends"},
   
];

export const CategoryList = ["In Progress", "Robotics"];