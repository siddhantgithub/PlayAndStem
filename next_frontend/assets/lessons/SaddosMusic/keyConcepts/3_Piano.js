export const LessonText = [
    {id:0, type: "TM", message: "What is the Python code to play music when Pin1 is touched?"},
    {id:10, type: "pycb", value: `from microbit import *
    import music
    
    while True:
        if pin1.is_touched():
            music.play(music.ODE)`},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:5, type: "TM", message: "To make pin1.is_touched() true, why is it important to touch ground along with the pin?"},
    {id:6, type: "TM", message: "Touching ground is important to make the electric circuit complete"},
    {id:6, type: "TM", message: "As electric current will only flow when a circuit is complete"},
    {id:13, type: "ack"},
    {id:13, type: "donothing"},
    {id:1, type: "endmessage"}
]