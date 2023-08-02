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
import { LearnerEventType } from "../../actions/OpenAIResponseHandler";

const codeMessageStackString = `
Time to practice writing the whole code again

We will go through the entire code line by line and you should write the code along the way

#break#

First, we should import all the help from microbit. 

The code for the import will be: <b>from microbit import *</b>

#SPE#

Next, start an indefinite while loop by using the following code <b>while True:</b>

#SPE#

Within the while loop, we should first store the value of light level and store it in the variable called lightLevel

The code to store the value will be <b>lightLevel = display.read_light_level()</b>

#SPE#

Next we check whether the light level is below 50 by using if statement so we add the code <b>if lightLevel <= 50:</b>

Please note that the if statement will have an extra indentation than while statement

#SPE#

Next we will write the code to execute if the lightLevel is less than 50

Since we want to show the heart, the code will be <b>display.show (“Image.HEART”)</b>

The code to display the heart will have an extra indentation than the if statement

#SPE# 

With the code for if condition complete, we start the else block to write the code when the light level is greater than 50

The code of the else block will be <b>else:</b>

Remember, the else statement will have the same indentation as the if statement

#SPE# 

Now under else statement, we will write the code to switch off the display

The code will be: display.clear()

The code to clear the display will have an extra indentation than the else statement

#SPE# 

Lastly, we will add a sleep statement to add a delay of 2 seconds before checking again

The code to write will be: sleep (2000)

The sleep statement will have the same indentation as the if statement

#SPE# 

Our code for the mission is complete. Please review the code and click Check when you are done
`;

const introEndBlock = [
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TM", message: "We will start with \'Zacobian Lights\' mission"},
    {type: "TM", message: "The next mission \'NoNums' Number\' will become active after we have completed the Zacobia mission"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TM", message: "A mission is made up of many chapters"},
    {type: "TM", message: "You will see all the chapter when you will click a mission"},
    {type: "TM", message: "To finish a mission, please complete all the chapters in it"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type:"learnerevent", data: {type: "learnerevent", subtype: "changemissionstatus", data:{missionid:0, newstatus:"Available"}}},
    {type: "TM", message: "It is time to start \'Zacobian Lights\' mission"},
    {type: "TM", message: "You should see its status now changed to \'Available\'"},
    {type: "TM", message: "Click on the mission in the section below or click next to begin"},
    {id:1, type: "acksp", data: {type:"learnerevent", subtype:"loadmission", data:0}},
];

const dontKnowProgrammingBlock = [
    {type: "TM", message: "No worries at all."},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TM", message: "We will go through the basics of Python programming in detail"},
    {type: "TM", message:  "So that you can learn and master the concepts"},
    {type: "block", block:introEndBlock}
];

const continueLittleProgrammingOptions = [
    {text:"Make a game in Scratch", onClickResponse:{type: "TM", message: "Awesome!!! Let's get started then"}},
    {text:"Make a digital piano using Microbit", onClickResponse:{type: "TM", message: "Hmmm. Sometimes just fine is good. I think once we get started you will soon start feeling great"}},
];

const knowLittleProgrammingBlock = [
    {type: "TM", message: "Awesome!!!"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TM", message: "I am sure with some knowledge of Python you will be able to enjoy missions a lot"},
    {type: "TM", message: "and solve all three missions really fast"},
    {type: "block", block:introEndBlock}
];

const knowBlockProgrammingOnly = [
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TM", message: "Awesome!!!"},
    {type: "TM", message: "Let's go on a mission during which we will start with text programming using Python"},
    {type: "donothing"},
    {type: "endmessage"},
];

const PythonRefresher = [
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TM", message: "Let's go through a mission that will help us to learn basics of Python programming"},
    {type: "donothing"},
    {type: "endmessage"},
];

const AdvancedPythonCourse = [
    {type: "TM", message: "I have the right mission for you. I have added the mission to your in-progress missions"},
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
    {type: "TM", message: "Incredible!!!"},
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
    {type: "TM", message: "Awesome. Great to know you already know programming well"},
    {type: "TM", message: "I would love to know more about what kind of programming you have done"},
    {type: "TM", message: "Please select the right option from below"},
    {id:8, type: "QWBOL", message: "Provide your response", options:typeOfProgramming},
    {type: "donothing"},
    {type: "endmessage"},
];

const askKnowProgrammingResponseOptions = [
    {text:"I am not familiar", onClickResponse:{type: "block", block:dontKnowProgrammingBlock}},
    {text:"I am familiar", onClickResponse:{type: "block", block:knowLittleProgrammingBlock}},
];

const postInitialAssessmentBlock = [
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TM", message: "Click a mission under \'Ongoing Missions\' category to get started on a new missions"},
    {type: "TM", message: "You will also find other missions listed under different categories"},
    {type: "TM", message: "Feel free to try them in case you are feeling adventurous"},
    {type: "donothing"},
    {type: "endmessage"},
];

const programmingLanguageQuestionOptions = [
    {text:"I am not familiar", onClickResponse:{type: "block", block:dontKnowProgrammingBlock}},
    {text:"I am familiar", onClickResponse:{type: "block", block:knowLittleProgrammingBlock}},
];

const quizText = `
    Question: What is the capital of France?
    A. London
    B. Paris
    C. Berlin
    D. Rome
    Answer: B

    Question: What is the largest mammal on Earth?
    A. Elephant
    B. Blue Whale
    C. Polar Bear
    D. Giraffe
    Answer: B

    Question: Which planet is closest to the Sun?
    A. Mars
    B. Venus
    C. Mercury
    D. Jupiter
    Answer: C
    `;

    const firstCodeMessageStack =[
        {id:15, type: "TM", message: "Please write the import statement that gets all the help from microbit and click check when you are done"},
        {id:15, type: "TM", message: "Remember the syntax of the import statement is:"},
        {id:15, type: "TM", message: "from \'where to import\' import \'what to import\'"},
        {type: "ack"},
        {id:1, type: "clearpage"},
        {id:1, type: "showpage"},
        {type:"GETINPUT"},
        {type: "ack"},
        {id:1, type: "clearpage"},
        {id:1, type: "showpage"},
        {id:15, type: "TM", message: "Next let's do somethin special"},
        {id:15, type: "TM", message: "Remember the syntax of the import statement is:"},
        {id:15, type: "TM", message: "from \'where to import\' import \'what to import\'"},
    ];
    
    const firstPythonCodeResponseAction = {
        correct: [
            {id:1, type: "clearpage"},
            {id:1, type: "showpage"},
            {id:15, type: "TM", message: "Awesome job"},
            {id:15, type: "TM", message: "Congratulations you completed your first line of code"},
            {id:15, type: "TM", message: "Press Next To proceed further"}
        ],
        incorrect:[
            {id:1, type: "clearpage"},
            {id:1, type: "showpage"},
            {id:15, type: "TM", message: "Not exactly. the syntax is: from \'<where to import>\' import \'<what to import>\'"},
            {id:15, type: "TM", message: "Since we are using microbit, where to import is microbit"},
            {id:15, type: "TM", message: "Since we want to import everything, we will use \'*\' for what to import"},
            {id:15, type: "TM", message: "So the correct answer is: from microbit import *"},
            {id:15, type: "TM", message: "Please note that that there is a space between import and '*'"}
        ],
    };

    const testOptions = [
        {text:"Tell A Joke", onClickResponse:{type:"learnerevent", data:{subtype:"shortjoke", data:0}}},
        {text:"Proceed", onClickResponse:{type: "TMR", message: "Not exactly. First we have to specify from where we have to import and then what. Since from microbit we want to get everything it should be \"from microbit import *\""}},
    ];

    const askNextStep = [
        {text:"Tell A Joke", onClickResponse:{type:"learnerevent", data: {subtype: LearnerEventType.AnswerQuestion}}},
        {text:"Move Forward", onClickResponse:{type:"donothing", message:""}},
    ];

    const ForRangeQuestion2 = [
        {text:"2 3 4 5 6 7", onClickResponse:{type: "TMR", message: "Incorrect"}},
        {text:"2 5", onClickResponse:{type: "TMR", message: "Correct"}},
    ];

export let LessonText_Guest = [
    //{type:"askquestion"},
    //{type:"quiz", id: 8},
    //{id:1, type: "ack"},
    //{id:1, type: "clearpage"},
    //{id:1, type: "showpage"},
    //{id:1, type: "chpycon", purpose: "import everything from microbit module", messageStack:codeMessageStackString, correctCode:"from microbit import *",responseAction:firstPythonCodeResponseAction},
    //{id:1, type: "acksp", data: {type:"learnerevent", subtype:"loadmission", data:0}}, buttonText
    //{id:1, type: "image", path:"/lessonImages/Blocks.png", altText:"testImage"},
    //{id:1, type: "acksp", buttonText: "Tell A Joke", data: {type:"openaievent", subtype:"openaievent", data:0}},
    // {id:1, type: "TM", message:"Our chapter ends now. What would you like to do?"},
    // {id:8, type: "QWBOL", message: "Provide your response", options:askNextStep},
    // {id:1, type: "ack"},
    // {id:1, type: "clearpage"},
    // {id:1, type: "showpage"},
    // {id:1, type: "image", path:"/microbitIntroductionImages/SimulatorOpen.png", altText:"testImage"},
    //    {id:12, type:"TM", message: "What do you think the output of the code below will be:"},
    //     {id:10, type: "pycb", value: 
    //     `for x in range (2,8,3):
    //         print (x)<
    //     `},
    //     {id:1, type: "QWBOL", message: "Provide your response", options:ForRangeQuestion2},
    // {type:"sharetext", context: "share why learning robotics"},
    // {id:1, type: "video", path:"/lessonImages/Blocks.png", altText:"testImage", videoId:"AwjXgBJNfWE"},
    // {id:0, type: "TM", message:"Meet Cairo, Your Virtual Buddy"},
    // {id:1, type: "ack", buttonText: "Say Hi"},
    // {id:1, type: "clearpage"},
    // {id:1, type: "showpage"},
    {id:0, type: "TMR", message:"Hey, thanks a lot for trying out RoboUni"},
    {id:5, type: "TM", message: "I am cairo and together we will solve exciting missions"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:0, type: "TM", message:"While solving missions, we will not only learn new things but also make cool stuff like a small piano!!!"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:5, type: "TM", message: "One thing to note, since you are using a guest account, your progress will not be saved"},
    {id:5, type: "TM", message: "If you like working with me and want to save your progress, please create an account by clicking <b>Create Account</b> from the top menu"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:5, type: "TM", message: "Before we start, I would love to know more about you"},
    {id:5, type: "TM", message: "Please share what excites you about learning robotics in the pop up"},
    {id:1, type: "donothing"},
    {type:"sharetext", context: "share why learning robotics"},
    //{id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:5, type: "TM", message: "It is now your turn to ask any question you may have about computer programming or robotics or any stem topic in general"},
    {id:5, type: "TM", message: "Please type your question in the pop up"},
    {type:"askquestion", context: "share why learning robotics"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TM", message: "It is now time to start solving missions together"},
    {type: "TM", message: "We will start with \'Zacobian Lights\' mission"},
    {type: "TM", message: "The next mission \'NoNums' Number\' will become active after we have completed the Zacobia mission"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TM", message: "A mission is made up of many chapters, which you will see once you click the mission dashboard"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type:"learnerevent", data: {type: "learnerevent", subtype: "changemissionstatus", data:{missionid:0, newstatus:"Available"}}},
    {type: "TM", message: "It is time to start \'Zacobian Lights\' mission"},
    {type: "TM", message: "You should see its status now changed to \'Available\'"},
    {type: "TM", message: "Click on the mission in the section below or click next to begin"},
    {id:5, type: "TM", message: "Please again note, since you are using a guest account, your progress will not be saved"},
    {id:1, type: "acksp", data: {type:"learnerevent", subtype:"loadmission", data:0}},
    {id:1, type: "endmessage"},
];