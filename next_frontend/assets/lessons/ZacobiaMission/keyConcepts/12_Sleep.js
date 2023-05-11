const milliSecondsToASecond = [
    {text:"1000", onClickResponse:{type: "TM", message: "Awesome! You know it all"}},
    {text:"100", onClickResponse:{type: "TM", message: "Not exactly. Milli means one thousandth, which means if you divde a second into thousand parts then one part will be a milli second. So we need 1000 milli seconds to make a second"}},
];

export const LessonText = [
    {id:15, type: "TM", message: "What is the syntax for sleep statement in Python?"},
    {id:12, type:"TM", message:  "Syntax for the sleep statement is <b>sleep(time to sleep in milliseconds)</b>"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "What is the code for continuously checking light level and switch on or off the display accordingly after adding a sleep statement?"},
    {id:1, type: "donothing"},
    {id:10, type: "pycb", value: `from microbit import *
    while True:
        lightLevel = display.read_light_level();
        if lightLevel <= 100:
            display.show(Image.HEART)
        else:
            display.clear()
        sleep(2000)
    `},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:1, type: "endmessage"}
]