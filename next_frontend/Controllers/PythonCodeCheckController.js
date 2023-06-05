import { LearnerEventType } from "../actions/OpenAIResponseHandler";
import { breakParagraph } from "../components/ChatInterface/ShowLearningConversationWithAnimation";
import { GetOpenAIResponse } from "../actions/OpenAIResponseHandler";
//Quiz controller - gets into action when Learning conversation gets a quiz block
//The controller parses the quiz block and creates a block that can be displayed by Learning Conversation
//Further, this controller keeps tab of the score by checking the answer and updates the backend accordingly
const AnswerStatus = {
    Not_Answered: "notanswered",
    Answered_Incorrect: "answeredincorrect",
    Answered_Correct: "answeredcorrect",
    Checking_Answer: "checkinganswer"
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
    openAIBuffer;
    purpose;

    comparePythonCode(code1, code2) {
        const lines1 = code1.split('\n');
        const lines2 = code2.split('\n');
        
        const minLength = Math.min(lines1.length, lines2.length);
        for (let i = 0; i < minLength; i++) {
          if (lines1[i].trim() !== lines2[i].trim()) {
            return false;
          }
        }
        return lines1.length === lines2.length;
      }

    checkPythonCode ()
    {
        //console.log ("herer", currentPythonCode.current, data.correctCode);
        //First check whether the user code matches the correct answer we have
        if (this.comparePythonCode(this.currentPythonCode,this.correctCode) == true)
        {
            this.state = AnswerStatus.Answered_Correct;
            this.messageStackCounter = 0;
            return;
        }
        else
        {
            //Check whether the python code is correct
            //Code should import ever
            //var reqObj = {reqType: LearnerEventType.CheckPythonCode, data:{basecode:this.correctCode, userresponse:this.currentPythonCode}, dataRcvd:this.onOpeAIResponse.bind (this)};
            var reqObj = {reqType: LearnerEventType.CheckPythonCode, data:{code:this.currentPythonCode,purpose: this.purpose}, dataRcvd:this.onOpeAIResponse.bind (this)};
            GetOpenAIResponse(reqObj);
            this.state = AnswerStatus.Checking_Answer;
            return;
        }
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

    onOpeAIResponse(data,isDone)
    {
        if (isDone)
        {
            const paragraph = breakParagraph(this.openAIBuffer);
            var elemArray = paragraph.map ((item) => {
                    return {type:"TM", message:item}
            });
            console.log ("Elem array is", elemArray);
            this.messageStackCounter = 0;
            this.incorrectResponseStack = elemArray;
            this.state = AnswerStatus.Answered_Incorrect;
            return;
        }
        if (data.length == 0)
            return;
        console.log ("Data is", data, " open ai buffer ", this.openAIBuffer);
        this.openAIBuffer = this.openAIBuffer + data;
    }
    
    constructor(purpose,answer,initialMessage,correctResponse, incorrectResponse)
    {
        console.log (answer,initialMessage, correctResponse, incorrectResponse);
        this.purpose = purpose;
        this.state = AnswerStatus.Not_Answered;
        this.correctResponseStack = correctResponse;
        this.incorrectResponseStack = incorrectResponse;
        this.correctCode = answer;
        this.initialMessageStack = initialMessage;
        this.messageStackCounter = 0;
        this.currentPythonCode = "";
        this.openAIBuffer = "";
        console.log ("Open AI buffer is ", this.openAIBuffer);
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
            case AnswerStatus.Checking_Answer:
                return {type:"donothing"};

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