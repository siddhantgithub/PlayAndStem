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
    {id:12, type:"TM", message: "In this chapter, we will make a piano and connect it to Microbit to play sounds"},
    {id:12, type:"TM", message: "To make a piano we will use carboard or thick paper to make the body and aluminium foils to make touch buttons"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "First we should make the piano body"},
    {id:12, type:"TM", message: "Use a carboard, or thick paper and cut out a body for the piano"},
    {id:12, type:"TM", message: "You can also reuse the cereal cardboard boxes or boxes you get from online delivery"},
    {id:12, type:"TM", message: "The body can take any shape such as a rectangle, guitar or even an animal"},
    {id:12, type:"TM", message: "You should have a body like below"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Now it is time to make touch buttons on piano"},
    {id:1, type: "TM", message:"These buttons will be used to play music"},
    {id:1, type: "TM", message:"Imagine these buttons to be like piano keys"},
    {id:1, type: "TM", message:"For touch buttons we will use aluminium foil"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Cut out from aluminium foil three small pieces with shapes of piano keys and paste them on piano body"},
    {id:1, type: "TM", message: "Now we should have a piano which looks something similar to the image below"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "It is time now to connect the piano to Microbit"},
    {id:1, type: "TM", message: "Using a crocodile clip, connect first key on piano body to pin1"},
    {id:1, type: "TM", message: "Using another crocodile clip, connect the second key on piano body to pin2"},
    {id:1, type: "TM", message: "Lastly, again using crocodile clip, connect the third key on piano body to GND"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "We now have the connections done, it is time to write the code"},
    {type:"donothing"},
    {id:12, type:"TM", message: "What we want is when we press the key 1 on piano a melody is played"},
    {id:12, type:"TM", message: "and when we press key 2 a different melody is played"},
    {id:12, type:"TM", message: "Below is the Python code to accomplish what we want"},
    {id:10, type: "pycb", value: `from microbit import *
import music

while True:
    if pin1.is_touched():
        music.play(music.ODE)
    if pin2.is_touched():
        music.play(music.BLUES)`},
    {id:12, type:"TM", message: "Run the code on Microbit and try the piano now"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "You will notice that if you just touch the key connected to pin1 no music is played"},
    {id:12, type:"TM", message: "For the music to play, you should touch both the keys - one connected to pin1 and the other connected to GND"},
    {id:12, type:"TM", message: "Once you touch both keys, the music should play now"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Why do we need to touch both the keys for the music to play?"},
    {id:1, type: "TM", message:"It is because the Python code plays the music when pin1 is touched is true"},
    {id:1, type: "TM", message:"The touched here will be true only when electric current can successfully flow through the pin1"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Remember, from the last chapter, the electric current will only flow when the circuit is complete"},
    {id:12, type:"TM", message: "Why does the circuit gets completed when we touch both the pins?"},
    {id:12, type:"TM", message: "Because when we touch both keys - pin1 and GND, our body acts as a conductor and completes the connection between the pin1 and GND"},
    {id:1, type: "donothing"},
    {id:12, type:"TM", message: "Allowing the electricity to flow and thus making pin1.is_touched() true"},
    {id:12, type:"TM", message: "We have made a piano but before we end it is time for a quiz"},
    {id:1, type: "ack"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {type:"quiz", id: 2},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "This completes our chapter and the mission"},
    {id:12, type:"TM", message: "We now have a small piano that Sados people can use to play music and get happy"},
    {id:1, type: "endmessage_last"}
]