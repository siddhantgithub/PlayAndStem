//Type TM = Normal Message, TMR needs a replacement
//Type QWBO = question with button options
//TYPE ROOC = Response on option clicked
//TYPE OR = Option response
//TYPE ack = Simply get acknolowdgement to proceed further

const howAreYouResponseOptions = [
    {text:"Great", onClickResponse:{type: "TMR", message: "Awesome!!! Let's get started then"}},
    {text:"Just Fine", onClickResponse:{type: "TMR", message: "Hmmm. Sometimes just fine is good. I think once we get started you will soon start feeling great"}},
    {text:"Not Good", onClickResponse:{type: "TMR", message: "I am sorry to hear that. Good thing is we will have fun together now so let's get started"}},
];

const howYouTalkToRobotResponseOptions = [
    {text:"In plain English, like you and I are talking", onClickResponse:{type: "TMR", message: "Well, not exactly."}},
    {text:"In a language that robots understand", onClickResponse:{type: "TMR", message: "Yes. You are correct"}},
];

const knowBlockProgrammingBlock = [
    {type: "TMR", message: "Great. Then this is the end of our introduction"},
    {type: "TM", message: "Time to go to your learning dashboard and learn something new"},
    {type: "ack", message:"Go to learning dashboard"},
    {type: "donothing"},
    {type: "endmessage"},
];

const knowBlockProgrammingResponseOptions = [
    {text:"Yes, I have done block programming before and I know it well", onClickResponse:{type: "block", block:knowBlockProgrammingBlock}},
    {text:"I would love to go through block programming concepts", onClickResponse:{type: "TMR", message: "No worries at all.Let's quickly go through block programming concepts then"}},
];



export let LessonText = [
    {id:0, type: "TMR", message: "Hi <learnername>, how are you?"},
    {id:1, type: "QWBO", message: "Provide your response", options:howAreYouResponseOptions},
    {id:1, type: "donothing"},
    {id:1, type: "ack", message:"Click next to know more about me"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:5, type: "TM", message: "Let me introduce myself first"},
    {id:5, type: "TM", message: "I am cairo. I will be your virtual buddy and together we will solve exciting missions to save this universe"},
    {id:1, type: "donothing"},
    {id:1, type: "ack", message:"Click next to know more about the missions"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:5, type: "TM", message: "You know you won't be solving the missions alone, you will have a sidekick robot to solve to help you with the missions"},
    {id:1, type: "donothing"},
    {id:6, type: "TM", message: "But before we go on a mission let's learn how to talk to any robot"},
    {id:1, type: "ack", message:"Click next to learn how to talk to robots"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:7, type: "TM", message: "Let me ask you a question, how do you think we can talk to a robot?"},
    {id:8, type: "QWBOL", message: "Provide your response", options:howYouTalkToRobotResponseOptions},
    {id:1, type: "donothing"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:11, type: "TM", message: "To talk to a robot, we need to write in a different language that machines like computer and robot understand"},
    {id:12, type: "TM", message: "We call that language computer programming"},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:13, type: "TM", message: "Here, we will use blocks to to talk to the robot to make it do certain things"},
    {id:14, type: "TM", message: "or in other words we will use block programming to program the robot"},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "Do you have experience in block programming like programming in Scratch?"},
    {id:8, type: "QWBOL", message: "Provide your response", options:knowBlockProgrammingResponseOptions},
    {id:1, type: "ack", message:"Click next to start learning about block programming"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:11, type: "TM", message: "Block programming is like building with blocks! You have different blocks, each with a special function, that you can stack on top of each other to make a program. Just like building a tower, you can build a program step by step, using blocks to give your computer instructions on what to do."},
    {id:1, type: "donothing"},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:12, type:"TM", message: "Think about it like cooking a cake. You have a recipe that lists all the ingredients you need and the steps you need to follow to make a cake. Block programming is like having a recipe for a computer program. Each block is like an ingredient, and you stack them up in the right order to make the program work."},
    {id:1, type: "donothing"},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:10, type: "TM", message: "With block programming, you don't have to know how to write code using a programming language. Instead, you just drag and drop blocks and connect them to create a program. It's a fun and easy way to start learning about programming and making your own computer programs!"},
    {id:1, type: "ack", message:"Got It"},
    {id:1, type: "clearpage"},
    {id:1, type: "showpage"},
    {id:15, type: "TM", message: "This is the end of our introduction"},
    {id:15, type: "TM", message: "Hopefully you know a bit of me and block programming"},
    {id:15, type: "TM", message: "We will work on block programming a lot more together"},
    {id:15, type: "TM", message: "Time to go to your learning dashboard and learn something new"},
    {id:1, type: "ack", message:"Go to learning dashboard"},
    {id:1, type: "donothing"},
    {id:1, type: "endmessage"},
];