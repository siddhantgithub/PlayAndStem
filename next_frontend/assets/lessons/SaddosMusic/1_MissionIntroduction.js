//Type TM = Normal Message, TMR needs a replacement
//Type QWBO = question with button options
//TYPE ROOC = Response on option clicked
//TYPE OR = Option response
//TYPE ack = Simply get acknolowdgement to proceed further
//TYPE acksp = Special acknowledgement that prompts an action 
//TYPE ADD = Add a mission to learner's profile


//What should happen once someone has selected an option
//Tell them this module will get started
//Put the module in in-progress section
//Also, add other recommendations based on skill level on we know the skill-level
//Next time a learner logs in - show two options. Start with in-progress or try something new , or listen to a joke -- not a priority for now
//Need to start implementing backend and recording progress there

const haveMicroBit = [
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TM", message: "Great to hear that"},
    {type: "TM", message: "Playing with a Microbit is a lot of fun as we will see next"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TM", message: "To run your code on Microbit we will need to follow the following steps:"},
    {type: "TM", message: "Step 1: Go to the online code editor"},
    {type: "TM", message: "Step 2: Paste your code"},
    {type: "TM", message: "Step 3: Connect your Microbit to the system"},
    {type: "TM", message: "Step 4: Give permission to browser to connect to Microbit and run the code"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TM", message: "For Step 1: You will need a web browser to connect to your system"},
    {type: "TM", message: "The Chrome browser works best in this case"},
    {type: "TM", message: "In your Chrome browser, click on the link below"},
    {id:15, type: "TM", message: `<a target="_blank" href="https://python.microbit.org/v/3" rel="noopener noreferrer">Online Code Editor</a>`}, 
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: `For step 2, paste the code in the editor`},
    {id:15, type: "TM", message: `First, remove all the existing code and then copy and paste your code in the editor`},
    {id:15, type: "TM", message: `You can also use the default code in the editor to try it out`},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"}, 
    {id:15, type: "TM", message: `For step 3, Plug in your Microbit into your Desktop or Laptop by using the usb cable provided`},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"}, 
    {type: "TM", message: "For step 4, click the <b> Send to Microbit</b> button on the code editor, as shown on the image below"},
    {id:1, type: "image", path:"/microbitIntroductionImages/SendToMicrobit.png", altText:"testImage"},
    {type: "TM", message: "After clicking the button, you will see a popup"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"}, 
    {type: "TM", message: "In the popup, select the Microbit and click connect as shown in the image below"},
    {id:1, type: "image", path:"/microbitIntroductionImages/DevicePermission.png", altText:"testImage"},
    {type: "TM", message: "After clicking connect, you will see a popup with message <b>Sending Code (flashing)</b>"},
    {type: "TM", message: "Your code should run automatically on Microbit now"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"}, 
    {type: "TM", message: "If you are using the default code, you should see a flashing heart and scrolling Hello on the screen"},
    {type: "TM", message: "Anytime you want to make a change, just change the code in the editor and press <b>Sent to Microbit</b> button as we did in step 4"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TM", message: "That is all"},
    {type: "TM", message: "Happy exploring!!!"},
    {type: "endmessage"}
];

const dontHaveMicrobit = [
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TM", message: "No worries at all"},
    {type: "TM", message: "Microbit website has a great simulator to run and test your code"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TM", message: "To run your code on Microbit simulator we will need to follow the following steps:"},
    {type: "TM", message: "Step 1: Go to the online code editor"},
    {type: "TM", message: "Step 2: Paste your code"},
    {type: "TM", message: "Step 3: Open the simulator panel and run the code"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TM", message: "For Step 1: You will need a web browser to connect to your system"},
    {type: "TM", message: "The Chrome browser works best in this case"},
    {type: "TM", message: "In your Chrome browser, click on the link below"},
    {id:15, type: "TM", message: `<a target="_blank" href="https://python.microbit.org/v/3" rel="noopener noreferrer">Online Code Editor</a>`}, 
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: `For step 2, paste the code in the editor`},
    {id:15, type: "TM", message: `First, remove all the existing code and then copy and paste your code in the editor`},
    {id:15, type: "TM", message: `You can also use the default code in the editor to try it out`},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"}, 
    {type: "TM", message: "For step 3, click the <b>Simulator</b> button on the code editor towards upper right corner, as shown on the image below"},
    {id:1, type: "image", path:"/microbitIntroductionImages/SimulatorOpen.png", altText:"testImage"},
    {type: "TM", message: "After clicking the button, the simulator panel should open up"},
    {type: "TM", message: "In the simulator panel, click the button on top of the microbit in the simulator panel. The button is highlighted in the image below"},
    {id:1, type: "image", path:"/microbitIntroductionImages/RunCodeSimulator.png", altText:"testImage"},
    {type: "TM", message: "Your code should run and the output will be displayed on the microbit in the simulator panel"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"}, 
    {type: "TM", message: "If you are using the default code, you should see a flashing heart and scrolling Hello on the screen in the Microbit in the simulator panel"},
    {type: "TM", message: "Anytime you want to make a change, just change the code in the editor and presse the button as we did in step 3"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type: "TM", message: "That is all"},
    {type: "TM", message: "Happy exploring!!!"},
    {type: "endmessage"}
];

const haveMicrobitControllerQ = [
        {text:"I have a Microbit controller", onClickResponse:{type: "block", block:haveMicroBit}},
        {text:"I don't have a Microbit controller", onClickResponse:{type: "block", block:dontHaveMicrobit}},
];

const runMicrobitCodeHelpText = [
   //{type:"quiz", id: 8},
    //{id:1, type: "ack"},
    //{id:1, type: "clearpage"},
    //{id:1, type: "showpage"},
    //{id:1, type: "chpycon", messageStack:firstCodeMessageStack, correctCode:"from microbit import *",responseAction:firstPythonCodeResponseAction},
    //{id:1, type: "acksp", data: {type:"learnerevent", subtype:"loadmission", data:0}}, buttonText
   // {id:1, type: "image", path:"/lessonImages/Blocks.png", altText:"testImage"},
    {id:5, type: "TM", message: "Hi, in this module we will learn how to run and test your code on Microbit"},
    {id:6, type: "donothing"},
    {id:5, type: "TM", message: "You can either run the code on simulator or on an actual Microbit"},
    {id:5, type: "TM", message: "Question - Do you have a Microbit controller?"},
    {id:8, type: "QWBOL", message: "Provide your response", options:haveMicrobitControllerQ},
    {id:1, type: "endmessage"},
];

const needHelpInRunningCode = [
    {text:"No. I was able to run the code", onClickResponse:{type: "TM", message:"Awesome!"}},
    {text:"Yes, I need help in running the code", onClickResponse:{type: "block", block:dontHaveMicrobit}},
];

export const LessonText = [
    {id:0, type: "TMR", message: "Hi <learnername>, we have a new mission"},
    {id:1, type: "TM", message: "We have to help planet Sados"},
    {id:1, type: "TM", message: "People living on the planet Sados are always sad"},
    {id:1, type: "TM", message: "We can make them happy by creating a piano that they can use to play music"},
    {id:1, type: "donothing"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:5, type: "TM", message: "As the first step, we will learn how to play music using Microbit"},
    {id:7, type: "TM", message: "For playing music, we will use the play function of Microbit's music module"},
    {id:7, type: "TM", message: "To use the music module, we will first need to import it"},
    {id:7, type: "TM", message: "The code to import music module will be: <b>import music</b>"},
    {id:1, type: "donothing"},
    {id:12, type: "TM", message: ""},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type: "TM", message: "The syntax for the Play function is: <b>music.play(music, pin=pin0, wait=True, loop=False)</b>"},
    {id:12, type: "TM", message: "As you can see, the play function takes four arguments but three of them are optional as they have default values"},
    {id:12, type: "TM", message: "So the only argument that we must provide is music"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type: "TM", message: "For the music, we will use built-in melodies"},
    {id:12, type: "TM", message: "There are many built-in melodies available for Microbit"},
    {id:12, type: "TM", message: "For now, we will use music.NYAN"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type: "TM", message: "It is time to play some music on Microbit now"},
    {id:12, type: "TM", message: "Copy the code below and run it on your Microbit"},
    {id:10, type: "pycb", value: `import music
    music.play(music.NYAN)`},
    {id:5, type: "TM", message: "Question - Do you need help in running the code?"},
    {id:8, type: "QWBOL", message: "Provide your response", options:haveMicrobitControllerQ},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:1, type: "endmessage"}
]