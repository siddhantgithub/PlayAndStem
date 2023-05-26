// Function to parse the quiz questions and answers from plain text
import { AllQuizList } from "../assets/quizData/AllQuizList";

function parseQuizQuestions(quizText) {
const quizQuestions = [];
const questions = quizText.split("Question:");

questions.forEach(question => {
    if (question.trim() !== "") {
    var lines = question.trim().split("\n");
    const questionObj = {
        question: lines[0].trim(),
        options: [],
        answer: "",
        codeblock:[]
    };
    //lines = lines.map (line => line.trim());
    var parsingcode = false;
    //console.log ("Lines is ", lines);
    for (let i = 1; i < lines.length; i++) {
        //let parsingcode = false; 

        if (parsingcode)
        {
            if (lines[i].indexOf("codeend:") != -1)
            {
                parsingcode = false;
            }
            else
                questionObj.codeblock.push(lines[i]);
            continue;
        }
        else if (lines[i].indexOf("codestart:") != -1)
        {
            parsingcode = true;
        }
        lines[i] = lines[i].trim();

        if (lines[i].startsWith("A.") || lines[i].startsWith("B.") ||
            lines[i].startsWith("C.") || lines[i].startsWith("D.")) {
                //console.log ("Line has an option");
            questionObj.options.push(lines[i].trim());
        } else if (lines[i].startsWith("Answer:")) {
            //console.log ("Line has an answer");
            questionObj.answer = lines[i].replace("Answer:", "").trim();
        }

    }
    quizQuestions.push(questionObj);
    }
});
    return quizQuestions;
}

function returnBlockFromParsedQuestions (quizQuestions)
{
    var questionBlock = quizQuestions.map ((question)=> {
        var optionBlock = question.options.map ((option) => {
            if (option.startsWith(question.answer))
                return {text:option, onClickResponse:{type: "correct"}};
            else
                return {text:option, onClickResponse:{type: "incorrect"}};
        })
        return {type: "QUESTION", question:question.question, options:optionBlock, answer:question.answer,codeblock:question.codeblock};
    });
    return questionBlock;
}

export function returnQuizBlockFromText (quizText)
{
    var parsedArray = parseQuizQuestions(quizText);
    return returnBlockFromParsedQuestions(parsedArray);
}

//Quiz controller - gets into action when Learning conversation gets a quiz block
//The controller parses the quiz block and creates a block that can be displayed by Learning Conversation
//Further, this controller keeps tab of the score by checking the answer and updates the backend accordingly
export class QuizController 
{
    currentQuestion;
    quizScore = 0;
    lastClicked = false;
    quizBlock = null;
    numQuestions = 0;
    learnerScoreUpdater = null;
    quizId = -1;
    constructor (id,updateQuizProgressForLearner)
    {
        var thisClass = this;
        this.quizId = id;
        this.waitingForText = true;
        this.lastClicked = true;
        this.learnerScoreUpdater = updateQuizProgressForLearner;
        (async function () {
            var completePath = `../assets/quizData/${AllQuizList[id].path}`;
            //console.log ("Complete path is ", completePath);
            const response = await require(`../assets/quizData/${AllQuizList[id].path}`);
            return response;
            
        }) ().then ((response) => {
            //console.log ("hereerere",response.quizText); 
            thisClass.quizBlock = returnQuizBlockFromText(response.quizText);
            this.waitingForText = false;
            this.numQuestions = thisClass.quizBlock.length;
        })
        //console.log ("Quiz block is", this.quizBlock);
    }

    performQuizEndTask()
    {
        var finalPScore = Math.round((this.quizScore/this.numQuestions) * 100);
        this.learnerScoreUpdater(this.quizId, finalPScore);
        return finalPScore;
    }

    returnNextQuestion ()
    {
        if (this.waitingForText)
            return {type:"donothing"};

        if (this.lastClicked)
        {
            this.lastClicked = false;
            return {type:"poplastelem"};
        }
        if (this.quizBlock.length > 0)
        {
            this.currentQuestion = this.quizBlock.pop();
            return this.currentQuestion;
        }
        else
        {
            var finalPercentScore = this.performQuizEndTask();
            return {type:"quizend", data:finalPercentScore};
        }
    }

    optionClicked(response)
    {
        this.lastClicked = true;
        if (response.type.trim() == "correct")
        {
            this.quizScore++;
            return true;
        }
        else
        {
            //console.log ("returning false");
            return false;
        }
        
    }
};