const milliSecondsToASecond = [
    {text:"1000", onClickResponse:{type: "TMR", message: "Awesome! You know it all"}},
    {text:"100", onClickResponse:{type: "TMR", message: "Not exactly. Milli means one thousandth, which means if you divde a second into thousand parts then one part will be a milli second. So we need 1000 milli seconds to make a second"}},
];

export const LessonText = [
    {id:12, type:"TM", message: "From the previous sections, we have a code that checks for the light level continously"},
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
    {id:12, type:"TM", message: "We tell how long to sleep to Microbit in milli seconds"},
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
    {id:12, type:"TM", message: "Please see the sleep statement has extra spaces than while as the sleep statement has to be repeated as well"},
    {id:1, type: "ack", message:"Let's get started"},
    {id:1, type: "endmessage"}
]