const whenShouldCheckDayOrNight = [
    {text:"Only Once", onClickResponse:{type: "TMR", message: "Not Exactly"}},
    {text:"Continuously or Always", onClickResponse:{type: "TMR", message: "Yes, you are right!"}},
];

const finiteLoopQuestion = [
    {text:"Finite loop", onClickResponse:{type: "TMR", message: "Not Exactly"}},
    {text:"Infinite loop", onClickResponse:{type: "TMR", message: "Yes, you are right!"}},
];

export const LessonText = [
    {id:15, type: "TM", message: "Hi, welcome to the eleventh chapter in our mission"},
    {id:15, type: "TM", message: "In this chapter, we will learn about while loop to improve our existing code"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "Till now, we have the code to check the light level and accordingly switch on or clear the display"},
    {id:1, type: "donothing"},
    {id:15, type: "TM", message: "In our program we are checking the light level only once but checking only once will not solve our problem"},
    {id:1, type: "donothing"},
    {id:15, type: "TM", message: "What do you think how often should we check the light level?"},
    {id:1, type: "QWBOL", message: "Provide your response", options:whenShouldCheckDayOrNight},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "We have to check continuously or always because otherwise the lights will stay on or off"},
    {id:1, type: "donothing"},
    {id:15, type: "TM", message: "To check continuously we will have to check regularly or repeat the process of check"},
    {id:1, type: "donothing"},
    {id:15, type: "TM", message: "If we have to repeat something again and again we say we have to do it in a loop"},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "Now let's learn how to do somethign repeatedyly or write a loop in Python"},
    {id:1, type: "donothing"},
    {id:15, type: "TM", message: "There are different ways run loops in Python. For this mission we will use While loop"},
    {id:1, type: "donothing"},
    {id:15, type: "TM", message: "The syntax of while loop is while 'condition is true', followed by a colon ':', followed by the block that should be repeated"},
    {id:1, type: "donothing"},
    {id:15, type: "TM", message: "Syntax - <b>while condition is true:"},
    {id:15, type: "TM", message: "Followed by the block the statements that should be repeated again and again till the condition is true"},
    {id:1, type: "donothing"},
    {id:15, type: "TM", message: "Let's take a few examples to better understand the while loop"},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "Let's write a program using while loop to print all the numbers from 1 to 10"},
    {id:15, type: "TM", message: "we will first make a variable x and give it a value of 1. We will use x to print the values"},
    {id:1, type: "donothing"},
    {id:15, type: "TM", message: "so our code will be the following"},
    {id:10, type: "pycb", value: `x = 1
    `},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "we will first make a variable x and give it a value of 1. We will use the value of x to print the numbers"},
    {id:1, type: "donothing"},
    {id:15, type: "TM", message: "so our code will be the following"},
    {id:10, type: "pycb", value: `x = 1
    `},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "we will next start a while loop. We have to run the loop till value of x is less than or equal to 10"},
    {id:1, type: "donothing"},
    {id:15, type: "TM", message: "so our code will be the following"},
    {id:10, type: "pycb", value: `x = 1
while (x <= 10)
    `},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "Next we will print the value of x"},
    {id:15, type: "TM", message: "We will print the value of x using the Python's print statement"},
    {id:15, type: "TM", message: "Syntax for Python print statement is <b>print(value to print)</b>"},
    {id:15, type: "TM", message: "Since we have to print the value of x. We will write print(x), with an extra indentation than while statement"},
    {id:1, type: "donothing"},
    {id:15, type: "TM", message: "So our code now becomes"},
    {id:10, type: "pycb", value: `x = 1
while (x <= 10)
    print (x)
    `},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "Now we will change the value of x by 1 each time the loop is run"},
    {id:15, type: "TM", message: "we will change the value of 1 by using the statement x = x + 1"},
    {id:15, type: "TM", message: "The value of x should be changed each time the loop is run"},
    {id:15, type: "TM", message: "So the statement will be a part of the while loop block"},
    {id:15, type: "TM", message: "So our code now becomes"},
    {id:10, type: "pycb", value: `x = 1
while (x <= 10)
    print (x)
    x = x + 1
    `},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "Here is our final code"},
    {id:10, type: "pycb", value: `x = 1
while (x <= 10)
    print (x)
    x = x + 1
    `},
    {id:15, type: "TM", message: "Please go through each line of the code again to ensure you know it well"},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "The while loop we just went through is an example of a finite loop"},
    {id:15, type: "TM", message: "Finite loop means the loop will run for a certain number of times"},
    {id:15, type: "TM", message: "There are also infinite loops, loops that never stop"},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "What do you think for our mission do we need a finite loop or an infinite loop?"},
    {id:1, type: "donothing"},
    {id:1, type: "QWBOL", message: "Provide your response", options:finiteLoopQuestion},
    {id:15, type: "TM", message: "We need an infinite loop because we have to check for the light level continuously day and night"},
    {id:1, type: "donothing"},
    {id:15, type: "TM", message: "Because imagine, if the loop stops, we will stop checking the light level"},
    {id:15, type: "TM", message: "and then the display will either remain on or cleared, depending on when the loop stopped"},
    {id:1, type: "donothing"},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "One way to run an infinite loop using the while statement is by writing <b>while True:</b>"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "Remember, conditions either evaluate to True or False"},
    {id:12, type:"TM", message: "By writing while True: we are saying the codition to execute the block is always true"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "Meaning the loop will never stop"},
    {id:12, type:"TM", message: "Now we know how to write a while loop, let's change our program from the previous section so that it repeates continuously"},
    {id:1, type: "donothing"},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "In our last chapter we got to the following program that conditionally switches on or off the display:"},
    {id:10, type: "pycb", value: `from microbit import *

lightLevel = display.read_light_level();
if lightLevel <= 100:
    display.show(Image.HEART)
else:
    display.clear()
    `},
    {id:12, type:"TM", message: "Now we have to repeat all the statements continuously, so we should put them in a loop"},
    {id:12, type:"TM", message: "So the code now becomes"},
    {id:10, type: "pycb", value: `from microbit import *

while True:
    lightLevel = display.read_light_level();
    if lightLevel <= 100:
        display.show(Image.HEART)
    else:
        display.clear()
        `},
    {id:12, type:"TM", message: "Please observe that all the statements after while statement have extra spaces than the while block"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "Those extra spaces are important to tell the while block that we have to repeat all those statements"},
    {id:1, type: "donothing"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:11, type: "TM", message: "In this chapter, we have almost completed the code to complete our mission"},
    {id:1, type: "TM", message:"Along the way we learned about loops, especially while loop"},
    {id:1, type: "TM", message:"As you should already know by now, it is time now for a quiz to revise the concepts we discussed"},
    {id:1, type: "donothing"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type:"quiz", id: 10},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:1, type: "endmessage"}
]