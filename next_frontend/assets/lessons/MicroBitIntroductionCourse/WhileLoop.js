const whenShouldCheckDayOrNight = [
    {text:"Only Once", onClickResponse:{type: "TMR", message: "Not Exactly"}},
    {text:"Continuously or Always", onClickResponse:{type: "TMR", message: "Yes, you are right!"}},
];

export const LessonText = [
    {id:15, type: "TM", message: "Till now we have the code to check the light level and accordingly switch on or off the display"},
    {id:15, type: "TM", message: "In our program we are checking the light level only once but checking only once will not solve our problem"},
    {id:15, type: "TM", message: "What do you think how often should the light level?"},
    {id:1, type: "QWBO", message: "Provide your response", options:whenShouldCheckDayOrNight},
    {id:15, type: "TM", message: "We have to check continuously or always because otherwise the lights will stay on or off"},
    {id:15, type: "TM", message: "To check continuously we will have to check regularly or repeat the process of check"},
    {id:15, type: "TM", message: "If we have to repeat something again and again we say we have to do it in a loop"},
    {id:1, type: "ack", message:"Got It"},
    {id:15, type: "TM", message: "Now let's learn how to do somethign repeatedyly or write a loop in Python"},
    {id:15, type: "TM", message: "There are different ways to do something in a loop in Python. For this mission we will use While loop"},
    {id:15, type: "TM", message: "The syntax of while loop is while 'condition is true', followed by a colon ':', followed by the block that should be repeated"},
    {id:15, type: "TM", message: "Syntax - <b>while \<condition is true\>:"},
    {id:15, type: "TM", message: "Followed by the block the statements that should be repeated again and again"},
    {id:12, type:"TM", message: "In our case since we have to continuously check whether it is day or night we will simply right 'while True:'"},
    {id:12, type:"TM", message: "Now we know how to write a while loop, let's change our program from the previous section so that it repeates continuously"},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "In our last section we got to the following program that conditionally switches on or off the display:"},
    {id:10, type: "pycb", value: `from microbit import *

    if display.read_light_level() < 100:
         display.show(Image.HEART)
    else:
        display.clear()
    `},
    {id:12, type:"TM", message: "Now we need to run all the statements from if again and again using while loop"},
    {id:12, type:"TM", message: "So the code now becomes"},
    {id:10, type: "pycb", value: `from microbit import *

    while True:
        if display.read_light_level() < 100:
            display.show(Image.HEART)
        else:
            display.clear()
    `},
    {id:12, type:"TM", message: "Please observe that all the statements after while statement have extra spaces than the while block"},
    {id:12, type:"TM", message: "Those extra spaces are important to tell the while block that we have to repeat all those statements"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:1, type: "endmessage"}
]