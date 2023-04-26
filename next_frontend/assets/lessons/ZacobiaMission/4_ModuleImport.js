const pythonImportQuestion = [
    {text:"from microbit import  *", onClickResponse:{type: "TM", message:"You are correct. Congratulations on identifying the first line of the code"}},
    {text:"import everything from microbit", onClickResponse:{type: "TMR", message: "Not exactly. First we have to specify from where we have to import and then what. Since from microbit we want to get everything it should be \"from microbit import *\""}},
];

const firstCodeMessageStack =[
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "Please write the import statement that gets all the help from microbit and click check when you are done"},
    {id:1, type: "donothing"},
    {id:15, type: "TM", message: "Remember the syntax of the import statement is:"},
    {id:15, type: "TM", message: "from <b>place you need help</b> import <b>what help you need</b>"}
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
        {id:12, type:"TM", message: "from <b>place you need help</b> import <b>what help you need</b>"},
        {id:15, type: "TM", message: "Since we are using microbit, place will be microbit"},
        {id:15, type: "TM", message: "Since we want to import everything, we will use \'*\' for what help we need"},
        {id:15, type: "TM", message: "So the correct answer is: from microbit import *"},
        {id:15, type: "TM", message: "Please note that that there is a space between import and '*'"}
    ],
};

export const LessonText = [
    {id:15, type: "TM", message: "Hi, welcome to the fourth chapter in our mission"},
    {id:15, type: "TM", message: "In this chapter, we will start writing the Python code for solving the mission"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:11, type: "TM", message: "From the earlier chapter, we know that computer program is a group of statements"},
    {id:11, type: "TM", message: "Let's discuss what the first statement in a computer program should be"},
    {id:11, type: "TM", message: "Generally, the first satement in a computer program is for bringing in more help"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:11, type: "TM", message: "Why do we need help, let's imagine you want to organize a party with delicious food for your friends"},
    {id:1, type: "donothing"},
    {id:11, type: "TM", message: "If you cannot cook or don't want to cook, you will need to get outside help, say from of a Chef"},
    {id:1, type: "donothing"},
    {id:11, type: "TM", message: "Similarily, When writing computer programs, you need to get additional help to complete different tasks"},
    {id:1, type: "donothing"},
    {id:11, type: "TM", message: "Let's learn how to bring in additional help in Python"},
    {id:1, type: "ack", message:"Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "You bring additional help in Python by using import statement"},
    {id:12, type:"TM", message: "The syntax for using the import statement is:"},
    {id:12, type:"TM", message: "from <b>place you need help</b> import <b>what help you need</b>"},
    {id:12, type:"TM", message: "Please note that in syntax the bold section should be replaced with actual values"},
    {id:12, type:"TM", message: "For example, suppose you have to bring a \'Chef\' from \'New York\', you will write in Python the following:"},
    {id:12, type:"TM", message: "from NewYork import Chef"},
    {id:1, type: "ack", message:"Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Now to solve the energy problem for Zacobians, we need help from Microbit"},
    {id:12, type:"TM", message: "So In our case 'from' will be <b>microbit</b>"},
    {id:12, type:"TM", message: "For <b>what help you need</b>, we should ask for all the help we can get or everything"},
    {id:12, type:"TM", message: "When we need everything instead of writing everything we use the character \'*\'"},
    {id:1, type: "ack", message:"Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Based on what we just discussed, how do you think in Python we will get all the help from microbit"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "Remember the syntax is - "},
    {id:12, type:"TM", message: "from <b>place you need help</b> import <b>what help you need</b>"},
    {id:12, type:"TM", message: "the place is \'microbit\' and we need all the help, for which we should use \'*\'"},
    {id:8, type: "QWBOL", message: "Provide your response", options:pythonImportQuestion},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "Given from what we have learned. Let's start writing some code"},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "chpycon", messageStack:firstCodeMessageStack, correctCode:"from microbit import *",responseAction:firstPythonCodeResponseAction},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "When we do an import, we get helpers that are also called function or API from different modules"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "You can imagine a module is like a Chef"},
    {id:12, type:"TM", message: "just like a Chef can have different skills such making pasta or a pizza"},
    {id:12, type:"TM", message: "Modules have different skills which we call functions or APIs"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "When we import everything from microbit, by writing from microbit import *, we are asking to get all the skills or functions from the module microbit"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "so another way to remember the import statement is that from <b>modulename</b> import <b>function</b>"},
    {id:1, type: "ack", message:"Got It"},
    {id:11, type: "TM", message: "We have now covered how to get additional help using import statement"},
    {id:13, type: "donothing"},
    {id:1, type: "TM", message:"Before we go to the next chapter, we will go through a quize to revise the concepts we discussed"},
    {id:13, type: "donothing"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type:"quiz", id: 3},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:1, type: "endmessage"}
]