const PlaySoundAPIQuestion = [
    {text:"audio.play(Sound.HAPPY)", onClickResponse:{type: "TMR", message: "You are correct"}},
    {text:"play.audio(Sound.HAPPY)", onClickResponse:{type: "TMR", message: "No. The syntax is help.api() since the api is play and help is audio the correct answer is audio.play(Sound.HAPPY)"}},
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
    {id:12, type:"TM", message: "Let's first revisit our code from previous lesson"},
    {id:10, type: "pycb", value: `from microbit import *

    while True:
        if display.read_light_level() < 100:
            display.show(Image.HEART)
        else:
            display.clear()
        sleep(2000)`},
    {id:12, type:"TM", message: "Now to play sound we will need to get additional help"},
    {id:12, type:"TM", message: "This time we will get help differently"},
    {id:12, type:"TM", message: "Instead of doing from <place> import <help>"},
    {id:12, type:"TM", message: "We will just import help"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "The help we need in our case is \'audio\'"},
    {id:12, type:"TM", message: "So the statement we will need to write is"},
    {id:12, type:"TM", message: "import audio"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "We will write this statement just below our first import statement"},
    {id:12, type:"TM", message: "So the code now becomes"},
    {id:10, type: "pycb", value: `from microbit import *
    import audio


    while True:
        if display.read_light_level() < 100:
            display.show(Image.HEART)
        else:
            display.clear()
        sleep(2000)`},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Now it is time to use audio module that we imported to play sound"},
    {id:12, type:"TM", message: "The API we will use is \'play\' and we need to tell the API the sound we should play"},
    {id:12, type:"TM", message: "Let's play sound Sound.HAPPY when the lights are off"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "What do you think the code will be to play a sound using API \'play\' and the sound Sound.HAPPY"},
    {id:1, type: "QWBOL", message: "Provide your response", options:PlaySoundAPIQuestion},
    {id:10, type: "pycb", value: `from microbit import *
    import audio


    while True:
        if display.read_light_level() < 100:
            display.show(Image.HEART)
        else:
            display.clear()
        sleep(2000)`},
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