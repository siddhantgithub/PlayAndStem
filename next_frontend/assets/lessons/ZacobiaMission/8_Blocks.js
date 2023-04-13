export const LessonText = [
    {id:15, type: "TM", message: "Hi, welcome to the eigth chapter in our mission"},
    {id:15, type: "TM", message: "In this chapter we will learn about blocks in Python"},
    {id:15, type: "TM", message: "This is an important concept in Python as we will discuss later"},
    {id:1, type: "ack", message:"Click Next"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "In Python, blocks are a set of statements that have the same spaces before them"},
    {id:12, type:"TM", message: "For example, refer to the following Python code"},
    {id:10, type: "pycb", value: `
    print ("Line 1 is in code block A")
    print ("Line 2 is in code block A")
        print ("Line 3 is in code block B")
        print ("Line 4 is in code block B")
            print ("Line 5 is in code block C")
            print ("Line 6 is in code block C")
    `},
    {id:12, type:"TM", message: "Line 1 and 2 are in the same block as they have the same whitespaces"},
    {id:12, type:"TM", message: "Similarily line 3 and 4 and so on"},
    {id:12, type:"TM", message: "Why are blocks important?"},
    {id:12, type:"TM", message: "Blocks are important because they tell you what statements should run together when we are using loops or conditions"},
    {id:12, type:"TM", message: "We will discuss this more in detail later"},
    {id:12, type:"TM", message: "For now, the only thing to remember is that the statements that have the same spaces before them together make a block"},
    {id:1, type: "ack", message:"Click next to proceed"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:1, type: "endmessage"}
]