const ForRangeQuestion1 = [
    {text:"1 2 3", onClickResponse:{type: "TMR", message: "You are correct"}},
    {text:"1 2 3 4", onClickResponse:{type: "TMR", message: "Incorrect"}},
];
const ForRangeQuestion2 = [
    {text:"2 3 4 5 6 7", onClickResponse:{type: "TMR", message: "Incorrect"}},
    {text:"2 5", onClickResponse:{type: "TMR", message: "Correct"}},
];

export const LessonText = [
    {id:12, type:"TM", message: "In this chapter we will learn about what circuits are"},
    {id:12, type:"TM", message: "We will also learn about what pin 0, pin1 and gnd mean on Microbit"},
    {id:1, type: "donothing"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Let's first start with circuits"},
    {id:12, type:"TM", message: "Circuits are important because it is through circuits that electric current flows"},
    {id:12, type:"TM", message: "Using the flowing electric current, we can light up bulb and play music"},
    {id:12, type:"TM", message: "But for electric current to flow, we need a circuit to be complete"},
    {id:1, type: "ack", message:"Click next to p"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "An electric circuit is complete when there is a connection between a source of electric power and ground"},
    {id:12, type:"donothing"},
    {id:12, type:"TM", message: "A battery is an example of a power source. Ground is something that can take electric current without accumulating any power "},
    {id:12, type:"TM", message: "Let's understand this with an example"},
    {id:12, type:"TM", message: "Suppose you put a ball on a flat ground, if you don't push or move the ball, the ball will stay at one place"},
    {id:12, type:"TM", message: "But if you put a ball on an incline on the higher side, the ball will automatically roll from high elevation to low elevation side"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Simiarly, for the electric current to flow, we need difference in heights"},
    {id:12, type:"TM", message: "You can imagine power source is at a higher elevation and ground is at lower elevation"},
    {id:12, type:"TM", message: "And electric current flows from power source to ground"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Just like for the ball to move on its own, we need a smooth surface between high side and low side"},
    {id:12, type:"TM", message: "Similarily, for the electric current to move we need a connection between a power source and ground"},
    {id:12, type:"TM", message: "Also, it is important that the connection between high voltage and ground exists by using a conductor"},
    {id:1, type: "donothin"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "What is a conductor?"},
    {id:12, type:"TM", message: "Any material that allows electric current to pass through itself"},
    {id:12, type:"TM", message: "Few examples of conductors - metals such as iron, water and even our own body"},
    {id:12, type:"TM", message: "As we will see later, we will use our body to complete a circuit"},
    {id:1, type: "donothin"},
    {id:1, type: "ack", message:"Click next to p"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "It is now time to discuss different pins or slots on Microbit"},
    {id:12, type:"TM", message: "If you will look at the Microbit towards the bottom of the side with LEDs on it, the side with golden strip"},
    {id:12, type:"TM", message: "You will notice that following are written - 0 , 1, 2, 3V, GND"},
    {id:12, type:"TM", message: "Microbit can play sound using pins 0, 1 and 2. GND is the ground. We will not use the 3V pin for now"},
    {id:1, type: "ack", message:"Click next to p"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "We will now connect a headphone to our Microbit to hear the sound it is playing"},
    {id:12, type:"TM", message: "Please connect a headphone to Microbit by using crocodile clips as shown in the image below"},
    {id:1, type: "image", path:"/SaddosMusic/ConnectHeadphone.JPG", altText:"headphone_connection_image"},
    {id:12, type: "TM", message: "Copy the code below and run it on your Microbit"},
    {id:10, type: "pycb", value: `import music
    music.play(music.NYAN)`},
    {id:12, type:"TM", message: "You should now be able to listen to the music on your headphone"},
    {id:1, type: "ack", message:"Click next to p"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "We will now discuss how the headphone connection works"},
    {id:12, type:"TM", message: "The connection provides a complete path for the electric signal that Microbit generates on Pin0 to the GND"},
    {id:12, type:"TM", message: "The electric signal flows through the headphone as the headphone is connected to both Pin0 and GND"},
    {id:12, type:"TM", message: "The role of the headphone is to convert the electric signal into music, which we then hear through headphone"},
    {id:1, type: "ack", message:"Click next to p"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Please notice that we have connected the heaphone on pin0. What if we want to connect to Pin1?"},
    {id:12, type: "TM", message: "Remember The syntax for the Play function is: <b>music.play(music, pin=pin0, wait=True, loop=False)</b>"},
    {id:12, type: "TM", message: "Since we are not providing any value of pin, default value of pin0 is used"},
    {id:12, type: "TM", message: "If we have to use pin1, our code will be"},
    {id:10, type: "pycb", value: `import music
    music.play(music.NYAN, pin1)`},
    {id:1, type: "ack", message:"Click next to p"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type: "TM", message: "It is now time to experiment with sounds"},
    {id:12, type: "TM", message: "Go to the link below and try few built-in melodies"},
    {id:15, type: "TM", message: `<a target="_blank" href="https://microbit-micropython.readthedocs.io/en/v2-docs/tutorials/images.html" rel="noopener noreferrer">Microbit Python reference document  </a>`},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:1, type: "endmessage"}
]