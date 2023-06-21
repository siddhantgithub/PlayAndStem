const milliSecondsToASecond = [
    {text:"1000", onClickResponse:{type: "TM", message: "Awesome! You know it all"}},
    {text:"100", onClickResponse:{type: "TM", message: "Not exactly. Milli means one thousandth, which means if you divde a second into thousand parts then one part will be a milli second. So we need 1000 milli seconds to make a second"}},
];

export const LessonText = [
    {id:15, type: "TM", message: "Hi, welcome to the twelth chapter in our mission"},
    {id:15, type: "TM", message: "This is the second last chapter and we will complete our mission in it"},
    {id:15, type: "TM", message: "In this chapter we will learn about sleep statement"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "From the previous sections, we have a code that checks for the light level continuously"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "Now suppose you have to switch on and off the lights yourself"},
    {id:12, type:"TM", message: "Imagine going out checking out the light level and then coming back and doing that again and again without taking a break"},
    {id:121, type:"donothing"},
    {id:12, type:"TM", message: "But, even if we take small breaks, we will not miss much because the light level will always drop slowly"},
    {id:12, type:"TM", message: "Wouldn't it be great to take a break in between like sleeping for sometime?"},
    {id:12, type:"TM", message: "So let's ask Microbit to take a break"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "We tell Microbit to take a rest by calling the function sleep"},
    {id:12, type:"TM", message: "Syntax for the sleep statement is <b>sleep(time to sleep in milliseconds)</b>"},
    {id:12, type:"TM", message: "In the function, we have to tell for how long Microbit should sleep"},
    {id:12, type:"TM", message: "We tell how long to sleep to Microbit in milli seconds"},
    {id:1, type: "ack", message:"Click next to know more about milli seconds"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Do you know how many milli seconds make a second?"},
    {id:1, type: "QWBOL", message: "Provide your response", options:milliSecondsToASecond},
    {id:12, type:"TM", message: "So let's say we want Microbit to sleep for two seconds before checking for light again"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "To do that we have to call sleep function in our code. The Python code is sleep(2000)"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "Please observe that there is no module name needed to call the sleep function"},
    {id:1, type: "donothing"},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Now we add sleep(2000) to our code and now our code becomes"},
    {id:10, type: "pycb", value: `from microbit import *
while True:
    lightLevel = display.read_light_level()
    if lightLevel <= 50:
        display.show(Image.HEART)
    else:
        display.clear()
    sleep(2000)
`},
    {id:12, type:"TM", message: "Please see the sleep statement has extra indentation than while statement but same indentation as if statement"},
    {id:1, type: "donothing"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:11, type: "TM", message: "In this chapter, we finally have the code to complete our mission"},
    {id:1, type: "TM", message:  "Also, we learned about sleep statement and how to use it"},
    {id:1, type: "TM", message: "Time for a short quiz before going to the final chapter of our mission"},
    {id:1, type: "donothing"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type:"quiz", id: 11},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:1, type: "endmessage"}
]