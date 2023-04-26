export const LessonText = [
    {id:15, type: "TM", message: "Hi, welcome to the last chapter in our mission"},
    {id:15, type: "TM", message: "In this chapter we will learn about comments in Python and with that our mission will end"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "What are comments in programming language?"},
    {id:15, type: "TM", message: "Comments are like notes you write to yourself or others to help them understand your code."},
    {id:15, type: "TM", message: "To understand better, let's take an example"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "Imagine you cook a great pizza and your friends asks for your recipe"},
    {id:15, type: "TM", message: "Apart from writing down your recipe, and giving it to him"},
    {id:15, type: "TM", message: "You would also like to add comments to the recipe, such as, even if you cook for 5 more minutes it is fine, etc.."},
    {id:1, type: "donothing"},
    {id:15, type: "TM", message: "Those comments are not a part of recipe but help your friend in cooking"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "Similarly, you write comments in code to make code more readable"},
    {id:15, type: "TM", message: "They are words or sentences in your code that the computer will ignore when it runs the program"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "How do you write a comment in Python?"},
    {id:15, type: "TM", message: "By using <b>#</b> symbol"},
    {id:15, type: "TM", message: "In a Python program, any line of code written after # will be ignored by computer"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "For example, we have the code from the last chapter with comments in it"},
    {id:10, type: "pycb", value: `from microbit import *
#We run a while loop to continuously check the light level
while True:
    lightLevel = display.read_light_level();
    #We use if statement to check whether the light level is low enough to switch on the display
    if lightLevel <= 100:
        display.show(Image.HEART)
    else:
        display.clear()
    #we put a sleep of 2 seconds to give microbit a break between two runs of the loop
    sleep(2000)
    `},
    {id:15, type: "TM", message: "Please notice the comments starting with # symbol and how they make our code more readable"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "That is all. Great job in solving the mission"},
    {id:12, type:"TM", message: "We not only solved Zacobians' light problem but alo learned several new things along the way"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "More importantly we coded a Python program together"},
    {id:12, type:"TM", message: "Let's go through few questions to revise the topics we covered in this mission"},
    {id:1, type: "donothing"},
    {id:1, type: "ack", message:"Let's get started"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type:"quiz", id: 12},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:1, type: "endmessage"}
];