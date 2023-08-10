export const LessonText = [
    {id:15, type: "TM", message: "Hi, welcome to the tenth chapter in our mission"},
    {id:15, type: "TM", message: "In this chapter, we will learn how to use if statement to switch on and clear the display depending on the light level"},
    {id:15, type: "donothing"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Let's refresh the three steps to solve our mission:"},
    {id:15, type: "TM", message: "Step 1: Get the sunlight level"},
    {id:15, type: "TM", message: "Step 2: If the light level is low then switch on the lights"},
    {id:15, type: "TM", message: "Step 3: Else switch off the lights"},
    {id:15, type: "TM", message: "Let's start writing the code now to implement the steps"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "We will implement the Step 1: Get the sunlight level"},
    {id:15, type: "TM", message: "First we will get help by importing everything from microbit using <b>from microbit import *</b> line"},
    {id:15, type: "donothing"},
    {id:15, type: "TM", message: "Next, we will get the light level using read_light_level() function of display module and store it in lightLevel variable"},
    {id:15, type: "donothing"},
    {id:15, type: "TM", message: "So our code becomes"},
    {id:10, type: "pycb", value: 
    `from microbit import *

lightLevel = display.read_light_level();

    `},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Now we will implement Step 2: If the light level is low then switch on the lights"},
    {id:12, type:"TM", message: "First, we need to decide what low light level means"},
    {id:12, type:"TM", message: "read_light_level function returns a number between 0 and 255, with higher value meaning more light"},
    {id:15, type: "donothing"},
    {id:12, type:"TM", message: "Zacobians want to switch on the lights when the light level is less than or equal to 50"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "To implement the step 2, first we will write the if statement using <b>less than equal to operator</b> to check the light level"},
    {id:10, type: "pycb", value: 
    `from microbit import *

lightLevel = display.read_light_level();
if lightLevel <= 50:
    `},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "With the condition set up, we will add the code to show heart when the if condition is true"},
    {id:12, type:"TM", message: "Remember, we have to start a new block of code by using extra indentation than the if statement for the code that should be executed when the condition is true"},
    {id:15, type: "donothing"},
    {id:12, type:"TM", message: "So the code becomes"},
    {id:10, type: "pycb", value: 
    `from microbit import *

lightLevel = display.read_light_level();
if lightLevel <= 50:
    display.show(Image.HEART)
    `},
    {id:12, type:"TM", message: "Please observe that the display statement has extra spaces than the if statement for the indentation"},
    {id:15, type: "donothing"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Now, we will implement Step 3: Else switch off the lights"},
    {id:12, type:"TM", message: "We will use else statement followed by the indented block of code to clear the display. Remember the code below else statement will run only when the if condition is not true"},
    {id:15, type: "donothing"},
    {id:12, type:"TM", message: "So, the code now becomes"},
    {id:10, type: "pycb", value: `from microbit import *

lightLevel = display.read_light_level();
if lightLevel <= 50:
    display.show(Image.HEART)
else:
    display.clear()
    `},
    {id:12, type:"TM", message: "Again, please observe that the display.clear() statement has extra indentation than the else statement"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:11, type: "TM", message: "This brings us to the end of the current chapter"},
    {id:11, type: "TM", message: "We made a good progress in solving our mission in this chapter"},
    {id:1, type: "TM", message:  "To make sure we remember the concepts we just covered, let's go through a few questions in a quiz"},
    {id:1, type: "donothing"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type:"quiz", id: 9},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:1, type: "endmessage"}
]