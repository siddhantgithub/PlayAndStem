//Type TM = Normal Message, TMR needs a replacement
//Type QWBO = question with button options
//TYPE ROOC = Response on option clicked
//TYPE OR = Option response
//TYPE ack = Simply get acknolowdgement to proceed further
//TYPE pycb = Python Code Block
//TYPE chpyco = Check Python code - Better to have one block to have the cyclic behavior. If correct then moveforward otherwise show a message and ask question again

const howWeSolveZacobiaProblem = [
    {text:"By getting them more energy from other planet", onClickResponse:{type: "TMR", message: "Not exactly because Zacobia people will use the extra energy soon"}},
    {text:"By helping them save energy", onClickResponse:{type: "TMR", message: "Great! This is the right choice. Saving energy is always the best option."}},
];

const milliSecondsToASecond = [
    {text:"1000", onClickResponse:{type: "TMR", message: "Awesome! You know it all"}},
    {text:"100", onClickResponse:{type: "TMR", message: "Not exactly. Milli means one thousandth, which means if you divde a second into thousand parts then one part will be a milli second. So we need 1000 milli seconds to make a second"}},
];

const whenShouldCheckDayOrNight = [
    {text:"Only Once", onClickResponse:{type: "TMR", message: "Not Exactly"}},
    {text:"Continuously or Always", onClickResponse:{type: "TMR", message: "Yes, you are right!"}},
];

const pythonImportQuestion1 = [
    {type: "TMR", message: "Great. Then this is the end of our introduction"},
    {type: "TM", message: "Time to go to your learning dashboard and learn something new"},
    {type: "ack", message:"Go to learning dashboard"},
    {type: "donothing"},
    {type: "endmessage"},
];

const pythonImportQuestion = [
    {text:"from microbit import  *", onClickResponse:{type: "TM", message:"You are correct. Congratulations on identifying the first line of the code"}},
    {text:"import everything from microbit", onClickResponse:{type: "TMR", message: "Not exactly. First we have to specify from where we have to import and then what. Since from microbit we want to get everything it should be \"from microbit import *\""}},
];

const firstPythonCodeResponseAction = {
    correct: {id:10, type: "TM", message: "Awesome job. Congratulations you completed your first line of code"},
    incorrect:{id:10, type: "TM", message: "Not exactly, the syntax is from place import what we want. Since we are looking to get all the help from microbit the correct answer will be from microbit import  *"},
};

const storeLightLevelVariableResponse = {
    correct: {id:10, type: "TM", message: "Awesome job. Congratulations now you know how to store a value in a variable"},
    incorrect:{id:10, type: "TM", message: "Not exactly, Remember the syntax is - <variable name> = <variable value>; so the answer will be lightLevel = display.read_light_level()"},
};

const whileLoopPythonCodeResponseAction = {
    correct: {id:10, type: "TM", message: "Awesome job. Congratulations you successfully coded a while loop statement"},
    incorrect:{id:10, type: "TM", message: "Not exactly, the syntax is 'while True:'. Few things to notice, true has a capital T there is a colon"},
};

const checkFirstPythonCode = [
    {id:10, type: "TM", message: "Let's start practicing by actually typing out our first line of code"},
    {id:10, type: "TM", message: "Please write the code in the code editor below to import from microbit everything"},
    {id:10, type: "pycb"},
    {id:1, type: "chpyco", message:"Click Next When Done", correctCode:"from microbit import *", responseAction:firstPythonCodeResponseAction},
];

const noticeIfThenElseStructure = [
    {text:"Yes", onClickResponse:{type: "TMR", message: "Great"}},
    {text:"No", onClickResponse:{type: "TMR", message: "No worries. See in step 2, if it is day then we do something, else we do something else as mentioned in step 3"}},
];

export let LessonText1 = [
    {id:0, type: "TMR", message: "Hi <learnername>, I hope you are doing great"},
    {id:1, type: "TM", message: "Planet Zacobia needs our urgent help"},
    {id:1, type: "TM", message: "Planet Zacobia's native people, who are called Zacobians, are afraid that they may not survive in the future"},
    {id:1, type: "TM", message: "You and I have to work together to solve their problem so that Zacobians can live for the next 100 years"},
    {id:1, type: "donothing"},
    {id:1, type: "ack", message:"Click next to know more about the mission"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:5, type: "TM", message: "Zacobians mostly work during the night"},
    {id:6, type: "TM", message: "To see in the night, Zacobia have lights that are always on, wasting a lot of energy during the day"},
    {id:7, type: "TM", message: "Because of the energy wastage, Zacobians will soon run out of the energy"},
    {id:7, type: "TM", message: "How can we solve Zacobians' energy problem?"},
    {id:8, type: "QWBOL", message: "Provide your response", options:howWeSolveZacobiaProblem},
    {id:1, type: "ack", message:"Click next to solve Zacobian's problems"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type: "TM", message: "We can help them save energy by building lights that automatically switch off during the day when there is enough sunlight"},
    {id:12, type: "TM", message: "We will use Micro:bit to develop lights that will automatically switch off during the day"},
    {id:1, type: "ack", message:"Click next to see how to switch off the lights when sunlight is high"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:13, type: "TM", message: "To use Micro:bit, first we need to learn how to talk to it"},
    {id:14, type: "TM", message: "Talking to a computer or a machine to use them for solving a problem is called computer programming"},
    {id:14, type: "TM", message: "We can use different languages to talk to a computer or program a computer"},
    {id:14, type: "TM", message: "For this mission, we will use Python programming language"},
    {id:1, type: "ack", message:"Let's get started"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "The first step to solve a problem using computer programming is to break it down into smaller steps"},
    {id:15, type: "TM", message: "For this case we will have three simple steps to solve the problem, which are:"},
    {id:15, type: "TM", message: "Step 1: Get the sunlight level"},
    {id:15, type: "TM", message: "Step 2: If the sunlight level is low then switch on the lights"},
    {id:15, type: "TM", message: "Step 3: Else switch off the lights"},
    {id:15, type: "TM", message: "With our simple steps ready, now it is time to learn more about computer programming"},
    {id:1, type: "ack", message:"Let's learn about a couple of programming concepts"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:11, type: "TM", message: "We will now learn about two terms that we will use quite often"},
    {id:1, type: "donothing"},
    {id:11, type: "TM", message: "The first term is \'statement\'"},
    {id:11, type: "TM", message: "In computer programming, we use statements to tell the computer what to do"},
    {id:11, type: "TM", message: "Statements usually comprise of normal english words such as - for, while, and if"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:11, type: "TM", message: "The second term is syntax"},
    {id:11, type: "TM", message: "Syntax is the way statements have to be used so that computers can understand them"},
    {id:11, type: "TM", message: "Just like, for us, if we don't have the proper order, english words will stop making sense"},
    {id:1, type: "ack", message:"Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:11, type: "TM", message: "Consider the sentence - \'Please don't eat food that is not healthy\'"},
    {id:11, type: "TM", message: "Now if we don't arrange the words in a proper order they will stop making sense"},
    {id:11, type: "TM", message: "For example in the sentence- \'Healthy please don't is eat not food that\'"},
    {id:11, type: "TM", message: "We have used the same words but they don't make much sense now"},
    {id:11, type: "TM", message: "Similarily, statements have to use the right syntax so that computers can understand them"},
    {id:1, type: "ack", message:"Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:11, type: "TM", message: "To summarize:"},
    {id:11, type: "TM", message: "Statements tell computers what to do"},
    {id:11, type: "TM", message: "Syntax is the order in which statements should be used so that statements make sense to the computers"},
    {id:1, type: "TM", message:  "Computer program is a set of statements that teach computers to solve a problem"},
    {id:1, type: "ack", message: "Let's start writing our first program"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:11, type: "TM", message: "Generally, the first satement in a computer program is for brining in more help"},
    {id:11, type: "TM", message: "To understand, let's imagine you want to organize a party for your friends and you want to have good food for them"},
    {id:11, type: "TM", message: "Instead of cooking the food yourself, you decided to get help from of a Chef"},
    {id:11, type: "TM", message: "Similarily, When writing computer programs, you need to get additional help to complete different tasks"},
    {id:11, type: "TM", message: "Let's learn how to bring in additional help in Python"},
    {id:1, type: "ack", message:"Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "You bring additional help in Python by using import statement"},
    {id:12, type:"TM", message: "The syntax for using the import statement is:"},
    {id:12, type:"TM", message: "from <place you need help from> import <what help you need>"},
    {id:12, type:"TM", message: "For example, suppose you have to bring a Chef from New York, you will write in Python"},
    {id:12, type:"TM", message: "from NewYork import Chef"},
    {id:1, type: "ack", message:"Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Now to solve the energy problem for Zacobians, we need help from Microbit"},
    {id:12, type:"TM", message: <p>So In our case 'from' will be <b>microbit</b></p>},
    {id:12, type:"TM", message: "For \'what help you need\', we need all the help we can get or everything"},
    {id:12, type:"TM", message: "When we need everything instead of saying everything we use the character \'*\'"},
    {id:1, type: "ack", message:"Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Based on what we just discussed, how do you think in Python we will get all the help from microbit"},
    {id:12, type:"TM", message: "Remember the syntax is - from <place you need help from> import <what help you need>"},
    {id:12, type:"TM", message: "from <place you need help from> import <what help you need>"},
    {id:12, type:"TM", message: "the place is \'microbit\' and we need all the help, for which we should use \'*\'"},
    {id:8, type: "QWBOL", message: "Provide your response", options:pythonImportQuestion},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "Given from what we have learned. Let's start writing the code"},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:10, type: "TM", message: "Let's start by typing out our first line of code"},
    {id:10, type: "TM", message: "Please write the code in the code editor below that imports everything from microbit"},
    {id:12, type:"TM", message: "Remember the syntax is - from <place you want to import> import <what do you want to import>"},
    {id:10, type: "pycb"},
    {id:1, type: "chpyco", message:"Click Next When Done", correctCode:"from microbit import  *",responseAction:firstPythonCodeResponseAction},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "When we do an import, we get helpers that in Python are called modules"},
    {id:12, type:"TM", message: "just like helpers have different skills such as a chef can make pasta or a pizza"},
    {id:12, type:"TM", message: "Modules have different skills which we call function or API"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "When we import everything from microbit, by writing from microbit import*, we get many helpers or modules"},
    {id:12, type:"TM", message: "for our current problem we will just use the module \'display\'"},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Now since we have got all the help, now it is time to use the help to solve the energy problem"},
    {id:12, type:"TM", message: "Let's revisit the three steps that we need to take to solve the problem"},
    {id:15, type: "TM", message: "Step 1: Get the sunlight level"},
    {id:15, type: "TM", message: "Step 2: If it is low then switch on the lights"},
    {id:15, type: "TM", message: "Step 3: Else switch off the lights"},
    {id:1, type: "donothing"},
    {id:15, type: "TM", message: "Let's implement the first step now"},
    {id:15, type: "TM", message: ""},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "Fort the first step, we have to first get the light level from Microbit"},
    {id:15, type: "TM", message: "To get the light level we will use the \'display\' module that we got from the import statement"},
    {id:15, type: "TM", message: "Remember modules have different skills or APIs or functions"},
    {id:15, type: "TM", message: "Here we will use api or function called \'read_light_level()\'"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message:"To better understand API or function, let's again let's take the example of a chef. Imagine a chef as a module"},
    {id:12, type:"TM", message: "Now a chef can make multiple dishes such as pasta, and spinch salad. You can imagine each of these dishes as different API or services"},
    {id:12, type:"TM", message: "so if you have to want pasta, you will use pasta API"},
    {id:12, type:"TM", message: "Similarily the display module in Micro:bit offers multiple services or API or functions"},
    {id:12, type:"TM", message: "One of the API is for getting the light level"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Now how do we use an API?"},
    {id:12, type:"TM", message: "In Python we use an API by the following syntax"},
    {id:12, type:"TM", message: "Syntax: <Module Name>.<api name>()"},
    {id:12, type:"TM", message: "name of the module followed by a dot \'.\' followed by api name followed by two brackets"},
    {id:12, type:"TM", message: "For getting the light level, the api name is read_light_level()"},
    {id:12, type:"TM", message: "So the code to get light level will be display.read_light_level()"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "We now know how to get the light level but we should also store it somewhere to use it"},
    {id:12, type:"TM", message: "We store the values by using variables"},
    {id:12, type:"TM", message: "Think of variables as containers"},
    {id:12, type:"TM", message: "If a chef has made pasta then you have to put it in a container to serve it"},
    {id:12, type:"TM", message: "Similarily we need to store the light level we get from API to use it later"},
    {id:1, type: "TM", message:"Next we will learn how to store a value in a variable"},
    {id:1, type: "ack", message:""},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "The syntax to store a value in a variable is"},
    {id:12, type:"TM", message: "<variable name> = <variable value>"},
    {id:12, type:"TM", message: "So, the Python code to store the light level value in a variable will be:"},
    {id:12, type:"TM", message: "lightLevel = display.read_light_level()"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:10, type: "TM", message: "Let's practice writing the Python code we just learned"},
    {id:10, type: "TM", message: "Please write the code in the code editor below that gets light level value and stores it in the variable \'lightLevel\'"},
    {id:12, type:"TM", message: "Remember the syntax is - <variable name> = <variable value>"},
    {id:10, type: "pycb"},
    {id:1, type: "chpyco", message:"Click Next When Done", correctCode:"lightLevel = display.read_light_level()",responseAction:storeLightLevelVariableResponse},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "So we know now how to read light level"},
    {id:12, type:"TM", message: "Let's now learn how to switch on the display"},
    {id:12, type:"TM", message: "To switch on the display, we will use the \'show\' api of display module"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "To use the \'show\' API we need to provide more details to it"},
    {id:12, type:"TM", message: "It is like when you are ordering pasta, you also need to provide the type of pasta you want to order"},
    {id:12, type:"TM", message: "Similarily for display API you also need to tell what it should display"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "For this mission we will display a heart when the sunlight level is low"},
    {id:12, type:"TM", message: "So along with calling the \'show\' API of module display we also have to tell to display heart"},
    {id:12, type:"TM", message: "The code to display the heart is: \'display.show(Image.HEART)\'"},
    {id:12, type:"TM", message: "Please notice we are telling api \'show\' to display heart by passing the value \'Image.HEART\' between the ending brackets"},
    {id:12, type:"TM", message: "Now we know how to show a heart, next let's learn how to switch off the display"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "In this case we will use the api \'clear\' of display module"},
    {id:12, type:"TM", message: "The Python code to clear the display will be \'display.clear()\'"},
    {id:12, type:"TM", message: "We now know how to show heart and clear the display"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Now we need to write the code to make the decision based on the light level"},
    {id:12, type:"TM", message: "In Python programming one way to make a decision is by using \'if\' statement"},
    {id:12, type:"TM", message: "But before we learn if statement, we need to learn about two things:"},
    {id:12, type:"TM", message: "1. Conditions"},
    {id:12, type:"TM", message: "2. Blocks"},
    {id:1, type: "ack", message:"First we will learn about conditions"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Conditions are statements that either are true or false"},
    {id:12, type:"TM", message: "Python supports many different logcial conditions"},
    {id:12, type:"TM", message: "For our current mission, we will use greater than condition"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Greater than condition uses the operator \'>\'"},
    {id:12, type:"TM", message: "The condition is true when the left hand side is greater than the right hand side and false otherwise"},
    {id:12, type:"TM", message: "For example, 6 > 5 is true, where as 7 > 9 is false"},
    {id:12, type:"TM", message: "Next we will learn about blocks"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "In Python, blocks are a set of statements that have the same spaces before them"},
    {id:12, type:"TM", message: "For example, refer to the following Python code"},
    {id:10, type: "pycb", value: `
    print ("This is code block 1")
    print ("This is code block 1")
        print ("This belongs to code block 2")
        print ("This belongs to code block 2")
            print ("This belongs to code block 3")
            print ("This belongs to code block 3")
    `},
    {id:12, type:"TM", message: "Line 1 and 2 are in the same block as they have the same whitespaces"},
    {id:12, type:"TM", message: "Similarily line 3 and 4 and so on"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "The syntax for if statement is"},
    {id:12, type:"TM", message: "if  <\'condition\'>:"},
    {id:12, type:"TM", message: "Followed by the block to execute"},
    {id:12, type:"TM", message: "Please note that the block to be executed should have extra indentation or spacing then if block"},
    {id:12, type:"TM", message: "Let's go through few examples to understand this better"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "In the code below we are using variables in greater than condition"},
    {id:10, type: "pycb", value: `
    a = 7
    b = 10
    if a > b:
        print ("A is greater than B")
    print ("This belongs to code block 2")
    `},
    {id:12, type:"TM", message: "What do you think the output of the code will be"},
    {id:12, type:"TM", message: "if  <\'condition\'>:"},
    {id:12, type:"TM", message: "Followed by the block to execute"},
    {id:12, type:"TM", message: "Let's go through few examples to understand this better"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "With if statement we can also provide else statment followed by the block to execute when if condition fails"},
    {id:12, type:"TM", message: "Now that we know how to write if statement, we have learned all the individual pieces to program Micro:bit"},
    {id:12, type:"TM", message: "Next it is time to put all our knowledge together"},
    {id:15, type: "TM", message: "Did you notice, how we have a simple if-else structure?"},
    {id:1, type: "QWBO", message: "Provide your response", options:noticeIfThenElseStructure},
    {id:15, type: "TM", message: "Now let's learn how to write a loop in Python"},
    {id:15, type: "TM", message: "There are different types of loops in Python. For this mission we will use While loop"},
    {id:15, type: "TM", message: "The syntax of while loop is while 'condition is true' followed by a colon ':'"},
    {id:15, type: "TM", message: "Let's discuss few examples of what a condition may look like and what their value will be"},
    {id:15, type: "TM", message: "Condition 1: 6 > 4 is True"},
    {id:15, type: "TM", message: "Condition 2: 2 > 4 is False"},
    {id:15, type: "TM", message: "Condition 3: 7 < 9 is True"},
    {id:15, type: "TM", message: "Condition 4: 8 == 8 is True"},
    {id:15, type: "TM", message: "Condition 4: 9 != 10 is True"},
    {id:12, type:"TM", message: "In our case since we have to continuously check whether it is day or night we will simply right 'while True:'"},
    {id:12, type:"TM", message: "Given from what we have learned. Let's start writing the code"},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:10, type: "TM", message: "Let's start practicing by typing out our second line of code"},
    {id:10, type: "TM", message: "Please write the code in the code editor below to start a while loop which continuosly executes"},
    {id:10, type: "pycb"},
    {id:1, type: "chpyco", message:"Click Next When Done", correctCode:"while True:",responseAction:whileLoopPythonCodeResponseAction},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Before we implment the code"},
    {id:15, type: "TM", message: "What do you think how often should we check whether it is day or night"},
    {id:1, type: "QWBO", message: "Provide your response", options:whenShouldCheckDayOrNight},
    {id:15, type: "TM", message: "We have to check continuously or always because otherwise the lights will stay on"},
    {id:15, type: "TM", message: "To check continuously we have to repeat something (checking whether it is day or night) at a regular interval"},
    {id:15, type: "TM", message: "If we have to repeat something again and again we say we have to do it in a loop"},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    
    {id:15, type: "TM", message: "Till now we have a while loop that will continuously execute something"},
    {id:15, type: "TM", message: "Now we can implement step 2 in our algorithm which is check whether it is day or not"},
    {id:15, type: "TM", message: "Now time to implement our first step"},
    {id:12, type:"TM", message: "Which is check whether it is day or night"},
    {id:12, type:"TM", message: "How can we know whether it is day or night?"},
    {id:12, type:"TM", message: "Microbit provides a way to check light level"},
    {id:12, type:"TM", message: "Light level gives us a number. We know that Zacobian people cannot go out if light level is greater than 100"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "Let's learn now how to get light level from Microbit"},
    {id:15, type: "TM", message: "To measure the level we will use the help we have got by importing everything from microbit"},
    {id:15, type: "TM", message: "For measuring the level, specifically we will use display module"},
    {id:15, type: "TM", message: "You can imagine display module as one of the chef that you have got to help you in cooking food"},
    {id:15, type: "TM", message: "In this case instead of chef cooking a food, we have got a display to give us light level"},
    {id:15, type: "TM", message: "We will get help from modules through APIs. You can imagine API as a way to tell what do you need"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message:"To better understand, let's again go back to the example of chef"},
    {id:12, type:"TM", message: "Now imagine chef can make multiple dishes such as pasta, and spinch salad. You can imagine each of these dishes as different API or services"},
    {id:12, type:"TM", message: "so if you have to order pasta, you will ask for Pasta service or API"},
    {id:12, type:"TM", message: "Similarily the display module in Micro:bit offers multiple services or API"},
    {id:12, type:"TM", message: "One of the API or service is to get light level"},
    {id:12, type:"TM", message: "Now how do we use the API or service, in Python we do that by following a syntax"},
    {id:12, type:"TM", message: "The syntax is module_name.api()"},
    {id:12, type:"TM", message: "name of the module followed by a dot ('.') followed by api name"},
    {id:12, type:"TM", message: "In this case the api name we need is read_light_level()"},
    {id:12, type:"TM", message: "So the code to get light leve will be display.read_light_level()"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "So we know now how to read light level"},
    {id:12, type:"TM", message: "Let's now learn how to switch on the display"},
    {id:12, type:"TM", message: "To switch on the display, we will use the show api of display module"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "To use the show API we need to provide more details to it"},
    {id:12, type:"TM", message: "It is like when you are ordering pasta, you also need to provide the type of pasta you want to order"},
    {id:12, type:"TM", message: "Similarily for display API you also need to tell what it should display"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "For this mission we will display a heart when the light level is low"},
    {id:12, type:"TM", message: "So we will call the api \'show\' of module display telling to show the heart"},
    {id:12, type:"TM", message: "The way to do it is by using the code: display.show(Image.HEART)"},
    {id:12, type:"TM", message: "Please notice we are telling api show to display heart by passing the Image.HEART between the ending brackets"},
    {id:12, type:"TM", message: "Now we know how to show a heart, let's also learn how to switch off the display"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "In this case we will use the api 'clear' of display module"},
    {id:12, type:"TM", message: "The Python code to clear the display will be display.clear()"},
    {id:12, type:"TM", message: "We now know how to show heart and clear the display"},
    {id:12, type:"TM", message: "Now we need to write the code to make the decision based on the light level"},
    {id:12, type:"TM", message: "In Python programming one way to make a decision is using if else block"},
    {id:12, type:"TM", message: "Next we will learn how to write the if statement in Python"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "The syntax for if statement is"},
    {id:12, type:"TM", message: "if followed by space followed by the 'condition' followed by colon"},
    {id:12, type:"TM", message: "Then followed by the block to execute"},
    {id:12, type:"TM", message: "With if statement we can also provide else statment followed by the block to execute when if condition fails"},
    {id:12, type:"TM", message: "Now that we know how to write if statement, we have learned all the individual pieces to program Micro:bit"},
    {id:12, type:"TM", message: "Next it is time to put all our knowledge together"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "We will go step by step and write the complete program"},
    {id:12, type:"TM", message: "Remember the first step in writing the Python program is to get help"},
    {id:12, type:"TM", message: "we get help by using import statement in Python"},
    {id:12, type:"TM", message: "Syntax is from place import 'what we want'"},
    {id:12, type:"TM", message: "Since we want everything, our first line of the code will be"},
    {id:10, type: "pycb", value: `from microbit import *`},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Next we will run a while loop to continuously check whether we have the sufficient light"},
    {id:12, type:"TM", message: "After adding the while loop, the code becomes"},
    {id:10, type: "pycb", value: `from microbit import *
    
    while True:`},
    {id:12, type:"TM", message: "Next we need to check whether light level is sufficient for switching on the LED"},
    {id:12, type:"TM", message: "We use the if statement with read_light_level api to check the light level"},
    {id:12, type:"TM", message: "We will switch on the lights if light level are less than 100"},
    {id:12, type:"TM", message: "With this check, the code then becomes"},
    {id:10, type: "pycb", value: 
    `from microbit import *

    while True:
        if display.read_light_level() < 100:
    
    `},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Now we have the condition set up. We will add the code to show heart if light level is less than 100"},
    {id:12, type:"TM", message: "So the code becomes"},
    {id:10, type: "pycb", value: 
    `from microbit import *

    while True:
        if display.read_light_level() < 100:
            display.show(Image.HEART)
    `},
    {id:12, type:"TM", message: "Now it is time to put what do if light level are high"},
    {id:12, type:"TM", message: "We will tell that with the else statement"},
    {id:12, type:"TM", message: "So the code now becomes"},
    {id:10, type: "pycb", value: `from microbit import *

    while True:
        if display.read_light_level() < 100:
            display.show(Image.HEART)
        else:
            display.clear()
    
    `},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "We have almost have all the code now"},
    {id:12, type:"TM", message: "The reason I say almost because we need to make one more change"},
    {id:1, type: "ack", message:"Click next to to make the last change"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Right now our code checks for the light level continously"},
    {id:12, type:"TM", message: "We don't really need to do that. Microbit can take a break in between"},
    {id:1, type: "ack", message:"Click next to to make the last change"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Imagine going out checking out the light level and then coming back and doing that again and again without taking a break"},
    {id:12, type:"TM", message: "Wouldn't it be great to take a break in between like sleeping for sometime?"},
    {id:12, type:"TM", message: "So let's ask Microbit to take a break"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "We tell Microbit to take a rest by calling the api sleep"},
    {id:12, type:"TM", message: "In the api we have to tell for how long Microbit should sleep"},
    {id:12, type:"TM", message: "We tell that to Microbit in milli seconds"},
    {id:1, type: "ack", message:"Click next to know more about milli seconds"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Do you know how many milli seconds make a second?"},
    {id:1, type: "QWBO", message: "Provide your response", options:milliSecondsToASecond},
    {id:12, type:"TM", message: "So let's say we want Micro:bit to sleep for two seconds before checking for light again"},
    {id:12, type:"TM", message: "To do that we have to call sleep api in our code. The Python code is sleep(2000)"},
    {id:12, type:"TM", message: "Please observe that there is no module name needed to call the sleep api"},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Now we add sleep(2000) to our code and now our code becomes"},
    {id:10, type: "pycb", value: `from microbit import *

    while True:
        if display.read_light_level() < 100:
            display.show(Image.HEART)
        else:
            display.clear()
        sleep(2000)`},
    {id:12, type:"TM", message: "Please read the code again"},
    {id:15, type: "TM", message: "With this our module ends here"},
    {id:1, type: "endmessage"},
];