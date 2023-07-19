const codeMessageStackString = `
We will go through the entire code line by line and you should write the code along the way

#break#

First, we should import all the help from microbit. 

The code for the import will be: <b>from microbit import *</b>

#SPE#

Next, start an infinite while loop by using the following code <b>while True:</b>

#SPE#

Within the while loop, we should first store the value of light level and store it in the variable called lightLevel

The code to store the value will be <b>lightLevel = display.read_light_level()</b>

Please note that the code to store the value will have an extra indentation than the while statement

#SPE#

Next we check whether the light level is below 50 by using if statement so we add the code  <b>if lightLevel</b> <= <b>50</b>

Please note that the if statement will have an extra indentation than while statement

#SPE#

Next we will write the code to execute if the lightLevel is less than 50

Since we want to show the heart, the code will be <b>display.show (Image.HEART)</b>

The code to display the heart will have an extra indentation than the if statement

#SPE# 

With the code for if condition complete, we start the else block to write the code when the light level is greater than 50

The code of the else block will be <b>else:</b>

Remember, the else statement will have the same indentation as the if statement

#SPE# 

Now under else statement, we will write the code to switch off the display

The code will be: display.clear()

The code to clear the display will have an extra indentation than the else statement

#SPE# 

Lastly, we will add a sleep statement to add a delay of 2 seconds before checking again

The code to write will be: <b>sleep (2000)</b>

The sleep statement will have the same indentation as the if statement

#SPE# 

Our code for the mission is complete. Please review the code and click Check when you are done
`;

const codeMessageStackString1 = `
Time to practice writing the whole code again
`;


const firstCodeMessageStack =[
    {id:15, type: "TM", message: "Please write the import statement that gets all the help from microbit and click check when you are done"},
];

const firstPythonCodeResponseAction = {
    correct: [
        {id:1, type: "clearpage"},
        {id:1, type: "showpage"},
        {id:15, type: "TM", message: "Awesome job"},
        {id:15, type: "TM", message: "Congratulations you completed your first line of code"},
        {id:15, type: "TM", message: "Press Next To proceed further"}
    ],
    incorrect:[
        {id:1, type: "clearpage"},
        {id:1, type: "showpage"},
        {id:15, type: "TM", message: "Not exactly. the syntax is: from \'<where to import>\' import \'<what to import>\'"},
        {id:15, type: "TM", message: "Since we are using microbit, where to import is microbit"},
        {id:15, type: "TM", message: "Since we want to import everything, we will use \'*\' for what to import"},
        {id:15, type: "TM", message: "So the correct answer is: from microbit import *"},
        {id:15, type: "TM", message: "Please note that that there is a space between import and '*'"}
    ],
};

export let LessonText = [
    //{type:"askquestion"},
    //{type:"quiz", id: 8},
    //{id:1, type: "ack"},
    //{id:1, type: "clearpage"},
    //{id:1, type: "showpage"},
    {id:15, type: "TM", message: "Hi, welcome to the last chapter in our mission"},
    {id:15, type: "TM", message: "Before we end, it is time to practice writing all the code we learned together"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:1, type: "chpycon", purpose: "code to show a heart on microbit when the light level is less than 50 and clear the display otherwise", messageStack:codeMessageStackString, correctCode:"from microbit import *",responseAction:firstPythonCodeResponseAction},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:1, type: "endmessage_last"}
];