const ModuleContentQuestion = [
    {text:"A function that can be called", onClickResponse:{type: "TMR", message: "You are correct"}},
    {text:"Something else", onClickResponse:{type: "TMR", message: "Incorrect. We will need to write a function that can be called by NoNums"}},
];
const ForRangeQuestion2 = [
    {text:"2 3 4 5 6 7", onClickResponse:{type: "TMR", message: "Incorrect. Since we have provided third value of start 2 and step 2, numbers starting with 2 will be printed with increase of 2 each time"}},
    {text:"2 5", onClickResponse:{type: "TMR", message: "Correct. Since we have provided third value of step 2 only 5 and 2 will be printed. Please see 8 will not be printed"}},
];

export const LessonText = [
    {id:12, type:"TM", message: "Let's learn now how can we easily give our Python code to NoNums so they can use it in the future"},
    {type:"donothing"},
    {id:12, type:"TM", message: "In Python we make modules so that others can use our code or to make our code reusable"},
    {type:"donothing"},
    {id:12, type:"TM", message: "Let's understand now what modules actually are"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Remember from our Zacobia mission that whenver we ask help in Python using import statements we get modules"},
    {type:"donothing"},
    {id:12, type:"TM", message: "And we use functions in modules to get help"},
    {type:"donothing"},
    {id:12, type:"TM", message: "For example, suppose we need help from \'display\' module to read light level, we use API or function read_light_level"},
    {type:"donothing"},
    {id:1, type: "TM", message:"The syntax to use it is: \'display.read_light_level()\'"},
    {id:1, type: "ack", message:"Click next to proceed'"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Now to enable NoNums to use our code, we have to write a module for them"},
    {type:"donothing"},
    {id:12, type:"TM", message: "Now think what a module can have:"},
    {id:1, type: "QWBOL", message: "Provide your response", options:ModuleContentQuestion},
    {id:12, type:"TM", message: "Module is collection of functions and variables that can be reused by other Python programs"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Now we will create a module in Microbit project and reuse it "},
    {id:12, type:"TM", message: "Step1: Go to this url:https://python.microbit.org/v/3/project in a new tab or window"},
    {id:12, type:"TM", message: "Step2: In the left bar click \'Project\'"},
    {id:12, type:"TM", message: "Step3: Click \'Create file\' and in the pop window type filename NumberDisplayModule and click \'Create\'"},
    {id:12, type:"TM", message: "You should see a new file alongside main.py with the name \'NumberDisplayModule.py\'"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Now we have our module ready, we will type in the function from our last section here"},
    {id:12, type:"TM", message: "After putting the function DisplayNumbers the \'NumberDisplayModule.py\' file should have the following code"},
    {id:10, type: "pycb", value: 
    `# Imports go at the top
from microbit import *
    
# The function adds two numbers and displays the result on screen
def displayNumbersBetween (startNumber, endNumber):
    for x in range (startNumber, endNumber + 1):
        display.scroll(x)`},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "We have our module ready now. It is time to use it"},
    {id:12, type:"TM", message: "In main.py now we have to first import the module"},
    {id:1, type: "TM", message:"We import the module by writing import filename without .py extension"},
    {id:1, type: "TM", message:"So in our case the import statement will be <b>import NumberDisplayModule</b>"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:1, type: "TM", message:"Now we have the right module or help imported"},
    {id:12, type:"TM", message: "Now we need to use the service, function of the module"},
    {id:12, type:"TM", message: "Remember from Zacoiba mission, the value to use the help is: modulename.function(parameter1, parameter2 ...)"},
    {id:12, type:"TM", message: "So in our case, the code will be: NumberDisplayModule.displayNumbersBetween(2,3) "},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},

    {id:12, type:"TM", message: "So the complete code in main.py file will be"},
    {id:10, type: "pycb", value: 
    `# Imports go at the top
import NumberDisplayModule
    
NumberDisplayModule.displayNumbersBetween(2,3)`},
    {id:12, type:"TM", message: "And this is exactly, how NoNums can use our code."},
    {id:12, type:"TM", message: "We will give them NumberDisplayModule.py file and they can use our code in their own main.py file"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Congratulations, we have solved our mission"},
    {id:12, type:"TM", message: "As We now have a code that display numbers between two numbers and an easy way to share this code with NoNums"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:1, type: "endmessage_last"}
]