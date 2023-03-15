const IfBlockFirstQuestion = [
    {text:"A is greater than B", onClickResponse:{type: "TMR", message: "Great"}},
    {text:"Nothing", onClickResponse:{type: "TMR", message: "Since a > b is true in this case \'A is greater than B\' will be printed"}},
];

const IfBlockSecondQuestion = [
    {text:"A is greater than B", onClickResponse:{type: "TMR", message: "Since a > b is not true in this case nothing will be printed"}},
    {text:"Nothing", onClickResponse:{type: "TMR", message: "Great"}},
];

const IfBlockThirdQuestion = [
    {text:"A is greater than B", onClickResponse:{type: "TMR", message: "This program has an error. Any if statement in Python should have an idented block that it can execute if the condition is true"}},
    {text:"Error since the code below if block is not indented further", onClickResponse:{type: "TMR", message: "Great"}},
];

export const LessonText = [
    {id:12, type:"TM", message: "Now that we know about conditions and blocks, it is time to learn about the if statement"},
    {id:12, type:"TM", message: "The syntax for if statement is"},
    {id:12, type:"TM", message: "if  \'<condition>\':"},
    {id:12, type:"TM", message: "Followed by the block to execute"},
    {id:12, type:"TM", message: "Please note that the block to be executed should have extra indentation or spacing then if block"},
    {id:12, type:"TM", message: "Let's go through few examples"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "In the code below we are using variables in greater than condition"},
    {id:10, type: "pycb", value: `
    a = 17
    b = 10
    if a > b:
        print ("A is greater than B")
    `},
    {id:12, type:"TM", message: "What do you think the output of the above code will be"},
    {id:1, type: "QWBO", message: "Provide your response", options:IfBlockFirstQuestion},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "In the code below we are using variables in greater than condition"},
    {id:10, type: "pycb", value: `
    a = 7
    b = 10
    if a > b:
        print ("A is greater than B")
    `},
    {id:12, type:"TM", message: "What do you think the output of the above code will be"},
    {id:1, type: "QWBO", message: "Provide your response", options:IfBlockSecondQuestion},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "In the code below we are using variables in greater than condition"},
    {id:10, type: "pycb", value: `
    a = 7
    b = 10
    if a > b:
    print ("A is greater than B")
    `},
    {id:12, type:"TM", message: "What do you think the output of the above code will be"},
    {id:1, type: "QWBOL", message: "Provide your response", options:IfBlockThirdQuestion},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "With if statement we can also provide else statment followed by the block to execute when if condition fails"},
    {id:12, type:"TM", message: "Now that we know how to write if statement, we have learned all the individual pieces to program Micro:bit"},
    {id:12, type:"TM", message: "Next it is time to write the code to conditionally switch on the lights"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:1, type: "endmessage"}
]