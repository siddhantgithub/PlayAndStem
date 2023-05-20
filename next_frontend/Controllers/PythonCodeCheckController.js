//Quiz controller - gets into action when Learning conversation gets a quiz block
//The controller parses the quiz block and creates a block that can be displayed by Learning Conversation
//Further, this controller keeps tab of the score by checking the answer and updates the backend accordingly
const AnswerStatus = {
    Not_Answered: "notanswered",
    Answered_Incorrect: "answeredincorrect",
    Answered_Correct: "answeredcorrect",
  };

export class PythonCodeCheckController 
{
    state; 
    initialMessageStack;
    correctResponseStack;
    incorrectResponseStack;
    correctCode;
    messageStackCounter;
    currentPythonCode;

    checkPythonCode ()
    {
        //console.log ("herer", currentPythonCode.current, data.correctCode);
        this.currentPythonCode.replace(/(?:\r\n|\r|\n)/g, '');
        //console.log (currentPythonCode, correctCode);
        //console.log ("Answer and code match", currentPythonCode.current.localeCompare(data.correctCode));
        if (this.currentPythonCode.localeCompare(this.correctCode) == 0)
        { 
            console.log ("Code is correct");
            this.state = AnswerStatus.Answered_Correct;
            this.messageStackCounter = 0;
            //We can now move on with the next steps
        }
        else
        {
            console.log ("Code is not correct")
            this.state = AnswerStatus.Answered_Incorrect;
            this.messageStackCounter = 0;
            //The problem, code can be termed incorrect even if the number of spaces don't match
            //We need to figure out how to overcome that
            //simple solution can be, 
        }
        return;
    }
    
    constructor(answer,initialMessage,correctResponse, incorrectResponse)
    {
        console.log (answer,initialMessage, correctResponse, incorrectResponse);
        this.state = AnswerStatus.Not_Answered;
        this.correctResponseStack = correctResponse;
        this.incorrectResponseStack = incorrectResponse;
        this.correctCode = answer;
        this.initialMessageStack = initialMessage;
        this.messageStackCounter = 0;
        this.currentPythonCode = "";
    }

    onChangePythonCode (value) {
        console.log("change", value);
        this.currentPythonCode = value;   
        //currentPythonCode.current = value;
    }

    returnNextElem()
    {
        //console.log ("Return next elem called with current state", this.state, " this.messageStackCounter ", this.messageStackCounter,this.initialMessageStack.length);
        switch (this.state)
        {
            case AnswerStatus.Not_Answered:
                if (this.messageStackCounter < this.initialMessageStack.length)
                {
                    return this.initialMessageStack[this.messageStackCounter++];
                }
                else if (this.messageStackCounter == this.initialMessageStack.length)
                {
                    var elem = {type:"pycb", value:""};
                    this.messageStackCounter++;
                    return elem;
                }
                    
                else if (this.messageStackCounter == this.initialMessageStack.length + 1)
                    return {type:"ack", buttonText:"Check"};
                
                else
                    return {type:"donothing"};
                break;

            case AnswerStatus.Answered_Correct:
                if (this.messageStackCounter < this.correctResponseStack.length)
                {
                    return this.correctResponseStack[this.messageStackCounter++];
                }
                else if (this.messageStackCounter == this.correctResponseStack.length)
                {
                    this.messageStackCounter++;
                    return {type:"ack", buttonText:"Next"};
                }
                else
                    return {type:"donothing"};
                break;

            case AnswerStatus.Answered_Incorrect:
                if (this.messageStackCounter < this.incorrectResponseStack.length)
                {
                    return this.incorrectResponseStack[this.messageStackCounter++];
                }
                else if (this.messageStackCounter == this.incorrectResponseStack.length)
                {
                    this.messageStackCounter++
                    return {type: "TM", message:"What would you like to do next?"};

                }
                else if (this.messageStackCounter == this.incorrectResponseStack.length + 1)
                {
                    const optionsAfterIncorrect = [
                        {text:"Retry", onClickResponse:{type: "TM", message:"You are correct. Congratulations on identifying the first line of the code"}},
                        {text:"Skip Question", onClickResponse:{type: "TMR", message: "Not exactly. First we have to specify from where we have to import and then what. Since from microbit we want to get everything it should be \"from microbit import *\""}},
                    ];
                    return {id:8, type: "QWBOL", message: "Provide your response", options:optionsAfterIncorrect};
                   // return {type:"ack", buttonText:"Retry"};
                }
                else
                    return {type:"donothing"};
                break;
        }
    }

    onClick (response,data)
    {
        switch (this.state)
        {
            case AnswerStatus.Not_Answered:
                this.checkPythonCode();
                //Answer clicked
                return false;
                break;

            case AnswerStatus.Answered_Correct:
                return true;
                break;

            case AnswerStatus.Answered_Incorrect:
                if (response == "Retry")
                {
                    this.state = AnswerStatus.Not_Answered;
                    this.messageStackCounter = 0;
                    return false;
                }
                else
                    return true;
                break;
        }

    }
};