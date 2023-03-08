const Question1 = [
    {answer:1},
    {questionPrompt:"Which of the following is a valid Python comment?"},
    {key:1, option:{type: "TM", message:"This is a comment"}},
    {key:2, option:{type: "TM", message:"#This is a comment"}},
    {key:3, option:{type: "TM", message:"//This is a comment"}},
];

const Question2 = [
    {answer:1},
    {questionPrompt:{id:10, type: "pycb", value: `x = 5
    if x > 10:
        print("x is greater than 10")
    else:
        print("x is less than or equal to 10")
    `},},
    {key:1, option:{id:10, type: "TM", value: `x is greater than 10`},},
    {key:1, option:{id:10, type: "TM", value: `x is less than or equal to 10`},},
    {key:1, option:{id:10, type: "TM", value: `The code will produce an error`},},
];

const Question3 = [
    {answer:1},
    {questionPrompt:{type: "TM", value: `What is the correct syntax for defining a function in Python?`},},

    {key:1, option:{id:10, type: "TM", value: `def my_function():`},},
    {key:1, option:{id:10, type: "TM", value: `function my_function():`},},
    {key:1, option:{id:10, type: "TM", value: `my_function(): def`},},
];

const Question4 = [
    {answer:1},
    {questionPrompt:{type: "TM", value: `What is the correct way to declare a variable in Python?`},},

    {key:1, option:{id:10, type: "TM", value: `variable = value`},},
    {key:1, option:{id:10, type: "TM", value: `variable: value`},},
    {key:1, option:{id:10, type: "TM", value: `value = variable`},},
    {key:1, option:{id:10, type: "TM", value: `I don't know`},},
];

const Question5 = [
    {answer:1},
    {questionPrompt:{type: "TM", value: `What is a loop?`},},

    {key:1, option:{id:10, type: "TM", value: `A type of algorithm`},},
    {key:1, option:{id:10, type: "TM", value: `A repeating sequence of instructions`},},
    {key:1, option:{id:10, type: "TM", value: `A way to organize data in a computer program`},},
    {key:1, option:{id:10, type: "TM", value: `I don't know`},},
];

const Question6 = [
    {answer:1},
    {questionPrompt:{type: "TM", value: `What is an algorithm?`},},

    {key:1, option:{id:10, type: "TM", value: `A person who is skilled in computer programming`},},
    {key:1, option:{id:10, type: "TM", value: `A set of instructions for solving a problem`},},
    {key:1, option:{id:10, type: "TM", value: `A type of computer language`},},
    {key:1, option:{id:10, type: "TM", value: `I don't know`},},
];

const Question7 = [
    {answer:1},
    {questionPrompt:{type: "TM", value: `What is the purpose of indentation in Python?`},},

    {key:1, option:{id:10, type: "TM", value: `To make the code look pretty`},},
    {key:1, option:{id:10, type: "TM", value: `To make the code easier to read`},},
    {key:1, option:{id:10, type: "TM", value: `To separate blocks of code`},},
    {key:1, option:{id:10, type: "TM", value: `I don't know`},},
];

const Question8 = [
    {answer:1},
    {questionPrompt:{type: "TM", value: `What is the purpose of the "if" statement in Python?`},},

    {key:1, option:{id:10, type: "TM", value: `To repeat a block of code a certain number of times`},},
    {key:1, option:{id:10, type: "TM", value: `To define a function in Python`},},
    {key:1, option:{id:10, type: "TM", value: `To execute a block of code if a certain condition is met`},},
    {key:1, option:{id:10, type: "TM", value: `I don't know`},},
];

const Question9 = [
    {answer:1},
    {questionPrompt:{type: "TM", value: `What is a breadboard?`},},

    {key:1, option:{id:10, type: "TM", value: `A type of circuit board used to prototype electronic circuits`},},
    {key:1, option:{id:10, type: "TM", value: `A type of bread-making machine`},},
    {key:1, option:{id:10, type: "TM", value: `A type of baking sheet`},},
    {key:1, option:{id:10, type: "TM", value: `I don't know`},},
];

const Question10 = [
    {answer:1},
    {questionPrompt:{type: "TM", value: `What is a sensor?`},},

    {key:1, option:{id:10, type: "TM", value: `A type of switch used to turn the Micro:bit on and off`},},
    {key:1, option:{id:10, type: "TM", value: `A device used to measure a physical quantity and convert it into an electrical signal`},},
    {key:1, option:{id:10, type: "TM", value: `A type of display used to show text and images`},},
    {key:1, option:{id:10, type: "TM", value: `I don't know`},},
];

const Question11 = [
    {answer:1},
    {questionPrompt:{type: "TM", value: `What is the purpose of comments in Python code?`},},

    {key:1, option:{id:10, type: "TM", value: `To execute a specific command in the program`},},
    {key:1, option:{id:10, type: "TM", value: `To provide context and explanations for the code`},},
    {key:1, option:{id:10, type: "TM", value: `To display information to the user`},},
    {key:1, option:{id:10, type: "TM", value: `I don't know`},},
];

const Question12 = [
    {answer:1},
    {questionPrompt:{type: "TM", value: `What is the purpose of comments in Python code?`},},

    {key:1, option:{id:10, type: "TM", value: `To execute a specific command in the program`},},
    {key:1, option:{id:10, type: "TM", value: `To provide context and explanations for the code`},},
    {key:1, option:{id:10, type: "TM", value: `To display information to the user`},},
    {key:1, option:{id:10, type: "TM", value: `I don't know`},},
];

const Question13 = [
    {answer:1},
    {questionPrompt:{type: "TM", value: `What is a module in Python?`},},

    {key:1, option:{id:10, type: "TM", value: `A type of data structure`},},
    {key:1, option:{id:10, type: "TM", value: `A type of function`},},
    {key:1, option:{id:10, type: "TM", value: `A way to organize code into reusable files`},},
    {key:1, option:{id:10, type: "TM", value: `I don't know`},},
];

export const LessonText = [
    {id:8, type: "QWBOL", message: "Provide your response", options:pythonImportQuestion},
    {id:1, type: "donothing"},
]