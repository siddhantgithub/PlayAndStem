const YummyChocolateQuestion = [
    {text:"Write down the recipe and use the recpie again", onClickResponse:{type: "TMR", message: "You are correct"}},
    {text:"Try again each time and don't use the steps you last took", onClickResponse:{type: "TMR", message: "Incorrect. It may take another year to make similar chocolate again"}},
];

const CodeRunQuestion = [
    {text:"The code displays sum of 2 and 3", onClickResponse:{type: "TMR", message: "Incorrect."}},
    {text:"The code doesn't do anything", onClickResponse:{type: "TMR", message: "Correct"}},
];
const ForRangeQuestion2 = [
    {text:"2 3 4 5 6 7", onClickResponse:{type: "TMR", message: "Incorrect. Since we have provided third value of start 2 and step 2, numbers starting with 2 will be printed with increase of 2 each time"}},
    {text:"2 5", onClickResponse:{type: "TMR", message: "Correct. Since we have provided third value of step 2 only 5 and 2 will be printed. Please see 8 will not be printed"}},
];

export const LessonText = [
    {id:12, type:"TM", message: "In this section we will learn about Python functions, the first step to start writing code that others can reuse"},
    {type:"donothing"},
    {id:12, type:"TM", message: "Ability to use an existing code is also called code reusability and it is important part of computer programming"},
    {type:"donothing"},
    {id:12, type:"TM", message: "In fact, any modern software that you use such as different websites, reuses a lot of different codes"},
    {type:"donothing"},
    {id:12, type:"TM", message: "Let's take an example to understand functions and code reusability"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Suppose you are a cook and you discovered a new way to create a yummy chocolate"},
    {type:"donothing"},
    {id:12, type:"TM", message: "and it took you years to discover the new way"},
    {id:12, type:"TM", message: "Now you have two options, either you write down the steps you took"},
    {type:"donothing"},
    {id:12, type:"TM", message: "or you again try without reusing the steps you took earlier"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "What do you think will be a better way to quickly make that yummy chocolate again and again?"},
    {id:1, type: "QWBOL", message: "Provide your response", options:YummyChocolateQuestion},
    {type:"donothing"},
    {id:12, type:"TM", message: "To make that yummy chocolate again fast, it is important that you note down the steps to make a recipe and reuse it"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Similarly, you can imagine a function as a Python block of code that you can reuse to solve problems faster"},
    {type:"donothing"},
    {id:12, type:"TM", message: "Now imagine in addition to noting down the recipe, you also created a machine that can create the yummy chocolate from ingredients"},
    {type:"donothing"},
    {id:12, type:"TM", message: "If someone now has to create a yummy chocolate, all they have to do is put the ingredients in the machine and they will get the yummy chocolate"},
    {type:"donothing"},
    {type:"donothing"},
    {id:12, type:"TM", message: "A Python function is very similar to the machine, it takes certain inputs that are called parameters and solves a problem by running a block of code"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Now we will discuss how to write a function in Python"},
    {id:12, type:"TM", message: "A function consists of two parts"},
    {id:12, type:"TM", message: "First part is the function definition, which is written in the first line"},
    {type:"donothing"},
    {id:12, type:"TM", message: "Second part is the block of code that the function should execute"},
    {type:"donothing"},
    {id:12, type:"TM", message: "Let's discuss the function definition, which is written in the first line of the code"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "The first line of the function contains the function name and the parameters it takes"},
    {type:"donothing"},
    {id:12, type:"TM", message: "The syntax for the first line is: def function name (parameter1, parameter2 ..):"},
    {type:"donothing"},
    {id:12, type:"TM", message: "First we write def and after def we write function name. It is up to us what function name we choose"},
    {type:"donothing"},
    {id:12, type:"TM", message: "After function name, we list all the parameters that the function needs between two parantheses and separated by commas"},
    {id:12, type:"TM", message: "After parameter list, we put <b>:</b>, which completes the first line"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "After the first line of the code comes the block of the code that the function should execute"},
    {type:"donothing"},
    {id:12, type:"TM", message: "The block of the code will have an extra indentation than the function definition line"},
    {type:"donothing"},
    {id:12, type:"TM", message: "Also, block of code can use the paramaters listed in the function definition line"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Let's now write a simple function that adds two numbers and scrolls the result on a Microbit screen"},
    {type:"donothing"},
    {id:12, type:"TM", message: "Function definiton line will be: <b>def addTwoNumbers (number1, number2)</b>:"},
    {type:"donothing"},
    {id:12, type:"TM", message: "In the function's code block, the first line will add the numbers and store the result in a new variable"},
    {type:"donothing"},
    {id:12, type:"TM", message: "Therefore, the first line will be: \'sum = number1 + number2\'"},
    {id:12, type:"TM", message: "The second line will show the result on Microbit disply so it will be: \'display.scroll(sum)\'"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Now the code block should have an extra indentation than the function definition line"},
    {id:12, type:"TM", message: "So the code will be"},
    {id:10, type: "pycb", value: 
    `# Imports go at the top
from microbit import *
    
# The function adds two numbers and displays the result on screen
def addTwoNumbers (number1, number2):
    sum = number1 + number2
    display.scroll(sum)
    `},
    {id:12, type:"TM", message: "Please see we have added a Python comment to explain what the function does so that others can easily understand it"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Now run the code and in Microbit and answer the question based on what the code does"},
    {id:1, type: "QWBOL", message: "Provide your response", options:CodeRunQuestion},
    {id:12, type:"TM", message: "Nothing happens as we have not used the function till now. We will now learn how to use the function"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "To use the function, we write the function name, followed by the paranthese, followed by the parameter values"},
    {type:"donothing"},
    {id:12, type:"TM", message: "We should provide value for all the parameters in function definitions"},
    {id:12, type:"TM", message: "Otherwise, the Python code will give an error"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Since in the function definition, we specified two parameters, we need to provide two values"},
    {type:"donothing"},
    {id:12, type:"TM", message: "So the code to call the function will be: <b>addTwoNumbers(2,3)</b>"},
    {type:"donothing"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "The complete code that defines and calls the function will be:"},
    {id:10, type: "pycb", value: 
    `# Imports go at the top
    from microbit import *
    
    # The function adds two numbers and displays the result on screen
    def addTwoNumbers (number1, number2):
        sum = number1 + number2
        display.scroll(sum)
    
    addTwoNumbers(2,3)
    `},

    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Now let's write a function that solves NoNums problem of displaying the number"},
    {type:"donothing"},
    {id:12, type:"TM", message: "First let's write the function definition"},
    {id:12, type:"TM", message: "Function name will be displayNumbersBetween"},
    {id:12, type:"TM", message: "It should take two arguments, number to start and number to end, so the parameters will be startNumber, endNumber"},
    {type:"donothing"},
    {id:12, type:"TM", message: "So the function definition line becomes: def displayNumbersBetween(startNumber, endNumber):"},
    {type:"donothing"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Now for the code block, we will run a for loop on range from startNumber to endNumber + 1, since we want to display the endNumber"},
    {type:"donothing"},
    {id:12, type:"TM", message: "Within for loop we will display each number. So the function code will be:"},
    {id:10, type: "pycb", value: 
    `# Imports go at the top
    from microbit import *
    
    # The function displays numbers between two numbers (including both) on the screen
    def displayNumbersBetween (startNumber, endNumber):
        for x in range (startNumber, endNumber + 1):
            display.scroll(x)
    
    displayNumbersBetween(2,3)
    `},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Now we have written a function that displays the numbers between two numbers"},
    {type:"donothing"},
    {id:12, type:"TM", message: "In the next section we will learn how to distribute our function"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "endmessage"}
]