export const LessonText = [
    {id:15, type: "TM", message: "What is the code for conditionally switching on and off the display of Micro:bit?"},
    {id:10, type: "pycb", value: `from microbit import *

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