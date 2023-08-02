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
    Checking_Answer: "checkinganswer",
    LoadingPrompt: "loadingprompt"
  };

export class PythonCodeCheckController 
{
    state; 
    initialMessageStack;
    correctResponseStack;
    incorrectResponseStack;
    checkingResponseStack;
    correctCode;
    messageStackCounter;
    currentPythonCode;
    openAIBuffer;
    purpose;
    //codeValue;

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

    parseParagraph(paragraph) {
        var lines = paragraph.split('\n');
        var result = [];
      
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i].trim();
      
          if (line !== '') {

            if (line.includes ("#SPE#"))
            {
                result.push({type:"TM", message:"Please type the code in the editor below"});
                result.push({type:"GETINPUT", value:this.currentPythonCode});
                result.push ({type:"ack", buttonText:"Done"});
                result.push ({type:"clearpage"});
                result.push ({type:"showpage"});
                continue;
            }
            else if (line.includes ("#break#"))
            {
                result.push ({type:"ack"});
                result.push ({type:"clearpage"});
                result.push ({type:"showpage"});
                continue;

            }
            var jsonElement = {
              type: 'TM',
              message: line
            };
            
            result.push(jsonElement);
          }
        }
        return result;
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
    }

    onOpeAIResponse(data,isDone, isError = false)
    {
        if (isError)
        {
            const elemArray = [{type:"TM", message: "Thanks for the reponse. I am having few issues. Please try again"}];
            this.messageStackCounter = 0;
            this.incorrectResponseStack = elemArray;
            this.state = AnswerStatus.Answered_Incorrect;
            this.openAIBuffer = "";
            return;
        }
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
            this.openAIBuffer = "";
            return;
        }
        if (data.length == 0)
            return;
        console.log ("Data is", data, " open ai buffer ", this.openAIBuffer);
        this.openAIBuffer = this.openAIBuffer + data;
    }
    
    constructor(purpose,answer,initialMessage,correctResponse, incorrectResponse)
    {
        //console.log (answer,initialMessage, correctResponse, incorrectResponse);
        this.purpose = purpose;
        this.state = AnswerStatus.LoadingPrompt;
        this.correctResponseStack = correctResponse;
        this.incorrectResponseStack = incorrectResponse;
        this.correctCode = answer;
        this.initialMessageStack = typeof initialMessage == "string"? this.parseParagraph (initialMessage): initialMessage ;
        this.messageStackCounter = 0;
        this.currentPythonCode = "";
        this.openAIBuffer = "";
        this.codeValue = "";
        this.checkingResponseStack = [ {id:1, type: "clearpage"},
        {id:1, type: "showpage"},{id:1, type: "TM", message:"Checking Answer"}];
        //console.log ("Open AI buffer is ", this.openAIBuffer);
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
                if (this.messageStackCounter < this.checkingResponseStack.length)
                {
                    return this.checkingResponseStack[this.messageStackCounter++];
                }
                
                else
                    return {type:"wait"};
                break;

            case AnswerStatus.Not_Answered:
            case AnswerStatus.LoadingPrompt:
                if (this.messageStackCounter < this.initialMessageStack.length)
                {
                    var nextElem = this.initialMessageStack[this.messageStackCounter++];
                    if (nextElem.type == "GETINPUT")
                    {
                        var elem = {type:"pycb", value:this.currentPythonCode};
                        return elem;

                    }
                    return nextElem;
                }
                else if (this.messageStackCounter == this.initialMessageStack.length)
                {
                    this.state = AnswerStatus.Not_Answered;
                    var elem = {type:"pycb", value:this.currentPythonCode};
                    this.messageStackCounter++;
                    return elem;
                }
                    
                else if (this.messageStackCounter == this.initialMessageStack.length + 1)
                    return {type:"ack", buttonText:"Check"};
                
                else
                    return {type:"wait"};
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
                    return {type:"wait"};
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
                    return {type:"wait"};
                break;
        }
    }

    onClick (response,data)
    {
        switch (this.state)
        {
            case AnswerStatus.LoadingPrompt:
                return;

            case AnswerStatus.Not_Answered:
                this.checkPythonCode();
                this.messageStackCounter = 0;
                //Answer clicked
                return false;
                break;

            case AnswerStatus.Answered_Correct:
                return true;
                break;

            case AnswerStatus.Answered_Incorrect:
                if (response == "Retry")
                {
                    //No need to go through whole set again
                    this.initialMessageStack = [{type:"TM", message:"Please fix the errors in the code in the Python editor and click Check when you are done"}];
                    this.state = AnswerStatus.LoadingPrompt;
                    this.messageStackCounter = 0;
                    return false;
                }
                else
                    return true;
                break;
        }

    }
};