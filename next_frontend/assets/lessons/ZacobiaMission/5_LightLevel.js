const variableLightLevelStack =[
    {id:15, type: "TM", message:"Please write Python code to get light level and store the result in a variable called lightLevel"},
    {id:15, type: "TM", message:"Remember the syntax for storing a value in a variable is <b>variable name</b> = <b>variable value</b>"},
    {id:15, type: "TM", message:"We will get variable value by display.read_light_level()"}
];

const variableLightLevelResponseAction = {
    correct: [
        {id:1, type: "clearpage"},
        {id:1, type: "showpage"},
        {id:15, type: "TM", message:"Great!"}, 
        {id:15, type: "TM", message:"Now you know how to call  API and store values in a variable"},
        {id:15, type: "TM", message:"Press Next To proceed further"}
    ],
    incorrect:[
        {id:15, type: "TM", message:"Not exactly. the syntax is: <b>variable name</b> = <b>variable value</b>"},
        {id:15, type: "TM", message:"Since variable name is lightLevel and We will get variable value by display.read_light_level()"},
        {id:15, type: "TM", message:"So the correct answer is: lightLevel = display.read_light_level()"}
    ],
};

export const LessonText = [
    {id:15, type: "TM", message: "Hi, welcome to the next chapter in our mission"},
    {id:15, type: "TM", message: "In this chapter we will learn more about functions and how to use them"},
    {id:15, type: "TM", message: "We will also learn about the function to read light level and store the value we get in a variable"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Let's revisit the three steps that we need to take to solve our mission"},
    {id:15, type: "TM", message: "Step 1: Get the sunlight level"},
    {id:15, type: "TM", message: "Step 2: If the light level is low then switch on the lights"},
    {id:15, type: "TM", message: "Step 3: Else switch off the lights"},
    {id:15, type: "TM", message: "Let's implement the first step now"},
    {id:15, type: "ack", message: ""},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "For the first step, we have to first get the light level from Microbit"},
    {id:15, type: "TM", message: "To get the light level, we will use the \'display\' module"},
    {id:15, type: "TM", message: "Remember modules have different functions"},
    {id:15, type: "TM", message: "Here, we will use function called \'read_light_level()\'"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message:"To better understand a function, let's take the example of a chef"},
    {id:12, type:"TM", message: "Generally, a chef can make multiple dishes such as pasta, salad, etc...; You can imagine each of these dishes as different  services"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "so if you have to want pasta, you will use pasta service or  API"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "Similarly, the display module in Microbit offers multiple services or functions"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "One of the function is for getting the light level"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "How do we use function from a module?"},
    {id:12, type:"TM", message: "In Python we use a function by using following syntax"},
    {id:12, type:"TM", message: "Syntax: <b>Module Name</b>.<b>function name</b>()"},
    {id:12, type:"TM", message: "Name of the module, followed by a dot \'.\', followed by function name, followed by two parantheses"},
    {id:12, type:"TM", message: "The function name here is <b>display</b>"},
    {id:12, type:"TM", message: "For getting the light level, the function name is read_light_level"},
    {id:12, type:"TM", message: "So the code to get light level will be display.read_light_level()"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "We now know how to get the light level but we should also store it somewhere to use it"},
    {id:12, type:"TM", message: "We store the values by using variables"},
    {id:12, type:"TM", message: "Think of variables as containers"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "To understand variables, let's consider an example"},
    {id:12, type:"TM", message: "Suppose you call a chef to make pasta for your party, but chef will arrive early, cook and leave even before the party starts"},
    {id:13, type: "donothing"},
    {id:12, type:"TM", message: "So you will have to store the pasta that the chef will cook in a container so that you can serve it later when the party starts"},
    {id:13, type: "donothing"},
    {id:12, type:"TM", message: "Similarly, we need to store the light level so that we can use it later"},
    {id:1, type: "TM", message:"Next, we will learn how to store a value in a variable"},
    {id:1, type: "ack", message:""},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "The syntax to store a value in a variable is"},
    {id:12, type:"TM", message: "<b>variable name</b> = <b>variable value</b>"},
    {id:12, type:"TM", message: "So, the Python code to store the light level value in a variable will be:"},
    {id:12, type:"TM", message: "lightLevel = display.read_light_level()"},
    {id:12, type:"TM", message: "When Microbit reads the above statement, it creates a variable called <b>lightLevel</b> and stores the value of light level that we get from read_light_level API in it"},
    {id:13, type: "donothing"},
    {id:12, type:"TM", message: "It is time now to practice writing the code we just discussed"},
    {id:1, type: "ack", message:""},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:1, type: "chpycon", messageStack:variableLightLevelStack, correctCode:"lightLevel = display.read_light_level()",responseAction:variableLightLevelResponseAction},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:11, type: "TM", message: "We now know how to get the light level from Microbit. In the next chapter, we will learn to switch on or off the light depending on the light level"},
    {id:13, type: "donothing"},
    {id:1, type: "TM", message:"As always, before going to the next chapter, we will go through a quiz to revise the concepts we just discussed"},
    {id:13, type: "donothing"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type:"quiz", id: 4},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:1, type: "endmessage"}
]