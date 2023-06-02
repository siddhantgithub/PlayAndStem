export const LessonText = [
    {id:15, type: "TM", message: "How are functions written in Python?"},
    {id:12, type:"TM", message: "A function consists of two parts"},
    {id:12, type:"TM", message: "First part is the function definition, which is written in the first line"},
    {type:"donothing"},
    {id:12, type:"TM", message: "Second part is the block of code that the function should execute"},
    {type:"donothing"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "The first line of the function contains the function name and the parameters it takes"},
    {type:"donothing"},
    {id:12, type:"TM", message: "The syntax for the first line is: def function name (parameter1, parameter2 ..):"},
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
    {id:15, type: "TM", message: "Example code of a function that adds two numbers and displays the result on Microbit?"},
    {id:10, type: "pycb", value: 
    `# Imports go at the top
from microbit import *
    
# The function adds two numbers and displays the result on screen
def addTwoNumbers (number1, number2):
    sum = number1 + number2
    display.scroll(sum)
    `},
    {id:13, type: "donothing"},
    {id:1, type: "endmessage"}
]