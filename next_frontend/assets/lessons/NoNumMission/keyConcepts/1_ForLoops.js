export const LessonText = [
    {id:0, type: "TM", message: "What is the syntax of for loop in Python?"},
    {id:12, type:"TM", message: "for <b>variable_name</b> in <b>set of elements</b>:"},
    {id:12, type:"TM", message: "followed by the block of code that should should be repeated"},
    {id:12, type:"TM", message: "For example"},
    {id:10, type: "pycb", value: 
    `for x in range (0,4):
        print (x)
    `},
    {id:1, type: "ack", message:"Click next to know how to solve Zacobians' problem"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:0, type: "TM", message: "What is the syntax of range function in Python?"},
    {id:12, type:"TM", message: "The syntax for the range function is: range(start, stop, step)"},
    {id:12, type:"TM", message: "The first value <b>start</b> is optional and it gives range function an integer number from where it should start generating the numbers; default is 0"},
    {type:"donothing"},
    {id:12, type:"TM", message: "The second value <b>stop</b> is required and it gives range function an integer number where to stop"},
    {type:"donothing"},
    {id:12, type:"TM", message: "The third value <b>step</b> is optional and it is the step or different between the numbers that are generated"},
    {type:"donothing"},
    {id:12, type:"TM", message: "What do you think the output of the code below will be:"},
    {id:10, type: "pycb", value: 
    `for x in range (2,8,3):
        print (x)
    `},
    {type: "TMR", message: "Output will be 2 and 5"},
    {type: "TMR", message: "Since we have provided third value of step 3, numbers starting with 2 will be printed with increase of 3 each time"},
    {id:1, type: "donothing"},
    {type: "TMR", message: "Number 8 will not be printed since the stop value - second value to the function - is not included in the sequence generated"},
    {id:1, type: "endmessage"}
]