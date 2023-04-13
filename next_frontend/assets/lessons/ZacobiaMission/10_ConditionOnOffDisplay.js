export const LessonText = [
    {id:15, type: "TM", message: "Hi, welcome to the tenth chapter in our mission"},
    {id:15, type: "TM", message: "In this chapter we will learn how to use if statement to switch on and off the display"},
    {id:15, type: "TM", message: "depending on the light level"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Let's start writing the code to switch on and off the display depending on the light level"},
    {id:12, type:"TM", message: "We use the if statement with read_light_level api to check the light level"},
    {id:12, type:"TM", message: "We will switch on the lights if light level is less than 100"},
    {id:12, type:"TM", message: "With this check, the code then becomes"},
    {id:10, type: "pycb", value: 
    `from microbit import *

    if display.read_light_level() < 100:
    
    `},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Now we have the condition set up. We will add the code to show heart if light level is less than 100"},
    {id:12, type:"TM", message: "So the code becomes"},
    {id:10, type: "pycb", value: 
    `from microbit import *

    if display.read_light_level() < 100:
        display.show(Image.HEART)
    `},
    {id:12, type:"TM", message: "Please observe that the display statement has extra spaces than the if statement"},
    {id:12, type:"TM", message: "As we discussed in previous sections the extra space starts a new block, which tells the if statement what to execute when the statement is true"},
    {id:12, type:"TM", message: "Now it is time write the statement to switch of the display when the light level is less than 100"},
    {id:12, type:"TM", message: "We will use else statement. Remember the code below else statement will run only when the if condition is not true"},
    {id:12, type:"TM", message: "So the code now becomes"},
    {id:10, type: "pycb", value: `from microbit import *

    while True:
        if display.read_light_level() < 100:
            display.show(Image.HEART)
        else:
            display.clear()
    
    `},
    {id:12, type:"TM", message: "Again, please observe that the display.clear() statement has extra spaces than the else statement"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:1, type: "endmessage"}
]