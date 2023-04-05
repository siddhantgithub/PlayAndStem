export const ZacobiaModuleList = [
    {name:"Mission Introduction",   fileName:"ZacobiaMission/MissionIntroduction.js",  description: "This module provides an overview of the mission - planet Zacobia's problem and how we can solve it",topicsCovered:"Problem Introduction",image:"MissionIntroduction.png"},
    {name:"Let's Break It Down",    fileName:"ZacobiaMission/BreakingIntoSteps.js",    description: "This module explains why and how to break down a problem statement into smaller parts",             topicsCovered:"Problem solving",image:"BreakItDown.png"},
    {name:"Statements and Syntax",  fileName:"ZacobiaMission/ProgramStmtsSyntax.js",   description: "The module covers statements and syntax and their importance in computer programming",             topicsCovered:"Statements, Syntax",image:"StmtsAndSyntax.png"},
    {name:"Let's get help",         fileName:"ZacobiaMission/ModuleImport.js",         description: "In this module we will discuss how to import modules in Python", topicsCovered:"Python Import Statement",image:"Help.png"},
    {name:"Reading light level",    fileName:"ZacobiaMission/LightLevel.js",           description: "In this module we will learn how to measure light level using Micro:bit",topicsCovered:"Calling API",image:"ReadLightLevel.png"},
    {name:"Switch on and clear the display",fileName:"ZacobiaMission/ShowClearDisplay.js",description: "This module covers the APIs to switch on and off Microbit's display",topicsCovered:"Switching on and off display",image:"ShowAndClearDisplay.png"},
    {name:"Conditions",fileName:"ZacobiaMission/Conditions.js",description: "In this module we will explore what conditional statements are",topicsCovered:"Conditional statements",image:"Conditions.png"},
    {name:"Blocks",fileName:"ZacobiaMission/Blocks.js",description: "This module talks about blocks and how we define a block in Python",topicsCovered:"Indentation, Blocks",image:"Blocks.png"},
    {name:"Learning About If",fileName:"ZacobiaMission/IfStatement.js",description: "In this module we will cover syntax of If statement",topicsCovered:"If statement in Python",image:"LearnIf.png"},
    {name:"Switch display only if",fileName:"ZacobiaMission/ConditionOnOffDisplay.js",description: "In this module we will learn how to conditionally switch on and off a display",topicsCovered:"If statement implementation",image:"ConditionOnOff.png"},
    {name:"Loops - Doing again",fileName:"ZacobiaMission/WhileLoop.js",description: "In this module we will discuss loops and how to run an infinite While loop in Python",topicsCovered:"Problem Introduction",image:"Loops.png"},
    {name:"Sleep - Time to take rest",fileName:"ZacobiaMission/Sleep.js",description: "This module discusses Python sleep statement and its use to add a delay",topicsCovered:"Sleep statement in Python",image:"Sleep.png"},
    {name:"Yay!!! We have done it",fileName:"ZacobiaMission/Conclusion.js",description: "In this module we summarize our journey in solving the mission and the topics we learned along the way",topicsCovered:"Problem Introduction",image:"Conclusion.png"},
];

export const NoNumModuleList = [
    {name:"Mission Introduction",   fileName:"NoNumMission/MissionIntroduction.js",  description: "This module provides an overview of the mission - Problem of numbers for the planet NoNum",topicsCovered:"Problem Introduction",image:"NoNums1.png"},
    {name:"Loop For Numbers",    fileName:"NoNumMission/ForLoopGeneratingNumbers.js",    description: "Learn how to generate numbers using a for loop",topicsCovered:"For Loop",image:"NoNums2.png"},
    {name:"Functions for Code Reuse",   fileName:"NoNumMission/IntroductionToFunction.js",  description: "This module introduces the use of functions for reusing code",topicsCovered:"Functions",image:"NoNums3.png"},
    {name:"Create A Module",    fileName:"NoNumMission/CreatingModules.js",    description: "Module covers how to create our own modules",topicsCovered:"Creating Modules",image:"NoNums4.png"},
];

export const AllMissionList = [
    {id: 1, dependency: [], category: "Robotics,Intermediate,Python,Micro:bit",name:"Zacobian Lights", image:"/zacobiamission.png", moduleList: ZacobiaModuleList,description:"Solve planet Zacobia's light problems"},
    {id: 2, dependency: [1], category:"Robotics,Intermediate,Python,Micro:bit",name:"NoNums' Number", image:"/nonummission.png", moduleList: NoNumModuleList,description:"Generate numbers for NoNums"},
    {id: 3, dependency: [],category: "Robotics,Intermediate,Python,Micro:bit",name:"Sados want music", image:"/missionImages/MissionSados.png", moduleList: NoNumModuleList,description:"Make a piano for Planet Sados"},
    {id: 4, dependency: [],category: "Scratch Games,Beginner",name:"ABC Tutor", image:"/missionImages/MissionABCTutor.png", moduleList: NoNumModuleList,description:"A simple game that teaches English alphabets"},
    {id: 5, dependency: [],category: "Scratch Games,Intermediate",name:"Run Robo Run", image:"/missionImages/MissionRoboRun.png", moduleList: NoNumModuleList,description:"Robo is running and we have to help it run past obstacles"},
    {id: 6, dependency: [],category: "Scratch Games,Advanced",name:"Your Own Quiz Game", image:"/missionImages/MissionQuizGame.png", moduleList: NoNumModuleList,description:"Create your own small quiz game and share it with friends"},
   
];

export const CategoryList = ["In Progress", "Robotics"];