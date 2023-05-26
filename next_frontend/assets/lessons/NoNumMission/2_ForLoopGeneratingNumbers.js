const ForRangeQuestion1 = [
    {text:"1 2 3", onClickResponse:{type: "TMR", message: "You are correct"}},
    {text:"1 2 3 4", onClickResponse:{type: "TMR", message: "Incorrect"}},
];
const ForRangeQuestion2 = [
    {text:"2 3 4 5 6 7", onClickResponse:{type: "TMR", message: "Incorrect"}},
    {text:"2 5", onClickResponse:{type: "TMR", message: "Correct"}},
];

export const LessonText = [
    {id:12, type:"TM", message: "In this chapter we will learn to generate all the numbers between two numbers"},
    {id:1, type: "donothin"},
    {id:12, type:"TM", message: "To generate the numbers we will use <b>For</b> loop"},
    {id:12, type:"TM", message: "To refresh, loops are used when we have to perform an operation repeatedly, which is true in this case as we have to generate numbers again and again"},
    {id:1, type: "donothin"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Let's discuss the syntax of <b>for</b> loop in Python, which is"},
    {id:12, type:"TM", message: "for variable name in set of elements:"},
    {id:12, type:"TM", message: "followed by the block of code that should should be repeated"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "For example"},
    {id:10, type: "pycb", value: 
    `for x in range (0,4):
    print (x)
    `},
    {id:12, type:"TM", message: "Here we are using the range function"},
    {id:12, type:"TM", message: "The range() function returns a sequence of numbers, starting from 0 by default, and increments by 1 (by default), and stops before a specified number"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Let's learn more about the range function"},
    {id:12, type:"TM", message: "The syntax for the range function is: range(start, stop, step)"},
    {id:1, type: "donothin"},
    {id:12, type:"TM", message: "As you can see, the range function takes three values start, stop, step"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "The first value <b>start</b> is optional and it gives range function an integer number from where it should start generating the numbers; default is 0"},
    {id:1, type: "donothing", message:"Click next to proceed"},
    {id:12, type:"TM", message: "When an argument is optional, even if we don't provide a value for it, the function will work by using the default value"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "The second value <b>stop</b> is required and it gives range function an integer number where to stop"},
    {id:12, type:"TM", message: "Please note stop number is not included in the generated sequence"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "The third value <b>step</b> is optional and it is the step or different between the numbers that are generated"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "Default value for step is 1"},
    {id:12, type:"TM", message: "Let's go through few examples now"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "What do you think the output of the code below will be:"},
    {id:10, type: "pycb", value: 
    `for x in range (0,4):
    print (x)
    `},
    {id:1, type: "QWBOL", message: "Provide your response", options:ForRangeQuestion1},
    {id:12, type:"TM", message: "In range second value, which is stop value, is not included so the output will be 0 1 2 3"},
    {id:12, type:"TM", message: "In this case we are not providing any value for step so default value of 1 will be taken"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "What do you think the output of the code below will be:"},
    {id:10, type: "pycb", value: 
    `
    for x in range (2,8,3):
        print (x)
    `},
    {id:1, type: "QWBOL", message: "Provide your response", options:ForRangeQuestion2},
    {type: "TMR", message: "Since we have provided third value of step 3, numbers starting with 2 will be printed with increase of 3 each time"},
    {id:1, type: "donothing"},
    {type: "TMR", message: "Number 8 will not be printed since the stop value - second value to the function - is not included in the sequence generated"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "So we now know how to use the for loop and range to generate numbers"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "For Nonums, since we need to generate all the number between the two numbers, we need a step value of 1 to the range function"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "Since step value is optional in range function and default value is 1, we can skip the value for step"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "So the code to display numbers between two numbers will be"},
    {id:10, type: "pycb", value: 
    `from microbit import *

x = range (2,6)
for n in x:
    display.show(n)
    sleep (1000)
    `},
    {id:12, type:"TM", message: "Next we will see how we can write our code so that Nonums can also use it"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "endmessage"}
]