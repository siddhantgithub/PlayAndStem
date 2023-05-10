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
    {id:15, type: "TM", message: "What is the syntax of if statement?"},
    {id:12, type:"TM", message: "The syntax for if statement is"},
    {id:12, type:"TM", message: "if  <b>condition<b/>:"},
    {id:12, type:"TM", message: "Followed by the block to execute"},
    {id:12, type:"TM", message: "Please note that the block to be executed should have extra indentation or spacing than the if statement"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "How can we use elif with if statement?"},
    {id:12, type:"TM", message: "Using the elif keyword, we can provide a new condition to try when the if condition has failed"},
    {id:12, type:"TM", message: "Syntax for elif is similar to if statement"},
    {id:12, type:"TM", message: "elif  <b>condition<b/>:"},
    {id:12, type:"TM", message: "Followed by the block to execute"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "How can we use else with if statement?"},
    {id:12, type:"TM", message: "The else keyword provides the block that should be executed when conditions in if and elif blocks have not met"},
    {id:12, type:"TM", message: "Syntax for else keyword is similar to if statement without any condition"},
    {id:12, type:"TM", message: "<b>else:</b>"},
    {id:12, type:"TM", message: "Followed by the block to execute"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "endmessage"}
]