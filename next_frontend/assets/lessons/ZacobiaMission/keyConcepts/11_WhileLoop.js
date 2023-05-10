export const LessonText = [
    {id:15, type: "TM", message: "What is the syntax of a while loop in Python?"},
    {id:15, type: "TM", message: "Syntax - <b>while condition is true:"},
    {id:15, type: "TM", message: "Followed by the block the statements that should be repeated again and again till the condition is true"},
    {id:1, type: "donothing"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "What are finite and infinite loops?"},
    {id:15, type: "TM", message: "Finite loop means the loop will run for a certain number of times"},
    {id:15, type: "TM", message: "There are also infinite loops, loops that never stop"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},

    {id:15, type: "TM", message: "What is the code for continuously checking light level and switch on or off the display accordingly?"},
    {id:1, type: "donothing"},
    {id:10, type: "pycb", value: `from microbit import *

    while True:
        lightLevel = display.read_light_level();
        if lightLevel <= 100:
            display.show(Image.HEART)
        else:
            display.clear()
            `},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:1, type: "endmessage"}
]