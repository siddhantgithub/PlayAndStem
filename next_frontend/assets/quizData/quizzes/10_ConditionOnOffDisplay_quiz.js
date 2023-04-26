export const quizText = `
    Question: Does the following code has any error?
    codestart:
    from microbit import *

    lightLevel = display.read_light_level();
    if lightLevel <= 100:
    display.show(Image.HEART)
    codeend:

    A. No
    B. Yes, the the code under if statement should have an extra indentation
    Answer: B  

    Question: What do you think the following code does?
    codestart:
    from microbit import *

    lightLevel = display.read_light_level();
    if lightLevel <= 100:
        display.show(Image.HEART)
    elif lightLevel <= 200:
        display.show(Image.HAPPY)
    else
        display.clear()
    codeend:

    A. Displays HEART image if the light level is less than or equal to 100, displays HAPPY image if the light level is between 100 and 200, clears the display if the light level is greater than 200
    B. Displays HAPPY image if the light level is less than 100, clears the display if the light level is greater than 200
    C. Displays HEART image if the light level is greater than 100, clears the display if the light level is greater than 200
    D. The code has error in it
    Answer: A

    Question: What error does the following code has?
    codestart:
    from microbit import *

    lightLevel = display.read_light_level();
    if lightLevel <= 100:
        display.show(Image.HEART)
        else
            display.clear()
    codeend:

    A. display.show(Image.HEART) should have an extra indentation than the else statement
    B. display.clear() should have the same indentation as the if statement
    C. else statement should have the same indentation as the matching if statement
    D. No error in the code
    Answer: C
`;