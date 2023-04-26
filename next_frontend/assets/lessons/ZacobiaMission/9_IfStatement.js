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
    {id:15, type: "TM", message: "Hi, welcome to the ninth chapter in our mission"},
    {id:15, type: "TM", message: "In this chapter, we will learn how to use the \'if\' statment"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "The syntax for if statement is"},
    {id:12, type:"TM", message: "if  <b>condition<b/>:"},
    {id:12, type:"TM", message: "Followed by the block to execute"},
    {id:12, type:"TM", message: "Please note that the block to be executed should have extra indentation or spacing than the if statement"},
    {id:12, type:"TM", message: "Let's go through a few examples"},
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
    {id:1, type: "QWBOL", message: "Provide your response", options:IfBlockFirstQuestion},
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
    {id:12, type:"TM", message: "With if statement, we can also use elif and else keywords to tell what should be done when if condition fails"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "Let's learn how to use <b>elif</b> keyword first"},
    {id:12, type:"TM", message: "Using the elif keyword, we can provide a new condition to try when the if condition has failed"},   
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Syntax for elif is similar to if statement"},
    {id:12, type:"TM", message: "elif  <b>condition<b/>:"},
    {id:12, type:"TM", message: "Followed by the block to execute"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "elif statement itself should have the same indentation as the if statement"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "but the block to be executed should have extra indentation or spacing than the elif statement"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "the block is executed only when the if condition has failed but the elif condition is true"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "Let's go through an example"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:10, type: "pycb", value: `
    a = 10
    b = 10
    if a > b:
        print ("A is greater than B")
    elif a == b:
        print ("A is equal to B")
    `},
    {id:12, type:"TM", message: "The output of the code above will be <b>A is equal to B</b>"},
    {id:12, type:"TM", message: "The block under if statement will not be executed as the condition a > b is not true"},
    {id:12, type:"TM", message: "But the block under elif statement will be executed as the condition a == b is true"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Let's discuss else keyword now"},
    {id:12, type:"TM", message: "The else keyword provides the block that should be executed when conditions in if and elif blocks have not met"},   
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Syntax for else keyword is similar to if statement without any condition"},
    {id:12, type:"TM", message: "<b>else:</b>"},
    {id:12, type:"TM", message: "Followed by the block to execute"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "else statement itself should have the same indentation as the if statement"},
    {id:12, type:"TM", message: "but the block to be executed should have extra indentation or spacing than the else statement"},
    {id:12, type:"TM", message: "the block is executed only when the if condition and all the elif conditions have failed"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "Let's go through an example"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:10, type: "pycb", value: `
    a = 9
    b = 10
    if a > b:
        print ("A is greater than B")
    elif a == b:
        print ("A is equal to B")
    else:
        print ("A is less than B")
    `},
    {id:12, type:"TM", message: "The output of the code above will be <b>A is less than B</b>"},
    {id:12, type:"TM", message: "The block under if statement will not be executed as the condition a > b is not true"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "The block under elif statement will not be executed as the condition a == b is not true"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "Since all the conditions under if and elif statement have failed, the block under else condition will be executed and <b>A is less than B</b> will be printed"},
    {id:1, type: "donothing"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:11, type: "TM", message: "We have covered all the important parts of using the if statement"},
    {id:1, type: "TM", message:"Let's go through few more code examples in a quiz to revise what we just covered"},
    {id:1, type: "donothing"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type:"quiz", id: 8},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:1, type: "endmessage"}
]