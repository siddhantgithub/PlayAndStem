export const quizText = `
    Question: Can we use a plastic instead of alumnium foil for making piano keys in our project?
    A. Yes, we can 
    B. No, we cannot because plastic is not a conductor and hence electric circuit will not complete
    Answer: B

    Question: Why is While True: important in the code below?
    codestart:
    from microbit import *
    import music
    
    while True:
        if pin1.is_touched():
            music.play(music.ODE)
        if pin2.is_touched():
            music.play(music.BLUES)
    codeend:

    A. While True ensures that we are always check if the pin1 is touched and plays music accordingly 
    B. While True is not needed in the code
    Answer: A

    Question: Which of the following will be correct if we touch both pin1 and GND of a Microbit?

    A. Both pin1.is_touched() and gnd.is_touched() will be true as we are touching both 
    B. Only pin1.is_touched() will be true because our body will complete the circuit by connecting pin1 and GND
    C. pin1.is_touched() will be false since we are touching both the pins
    D. Microbit will give an error
    Answer: B
`;