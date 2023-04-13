// Function to parse the quiz questions and answers from plain text
function parseQuizQuestions(quizText) {
const quizQuestions = [];
const questions = quizText.split("Question:");

questions.forEach(question => {
    if (question.trim() !== "") {
    var lines = question.trim().split("\n");
    const questionObj = {
        question: lines[0].trim(),
        options: [],
        answer: ""
    };
    lines = lines.map (line => line.trim());
    //console.log ("Lines is ", lines);
    for (let i = 1; i < lines.length; i++) {

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
        return {type: "QUESTION", question:question.question, options:optionBlock, answer:question.answer};
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
    constructor (quizText)
    {
        this.quizBlock = returnQuizBlockFromText(quizText);
        //console.log ("Quiz block is", this.quizBlock);
    }

    returnNextQuestion ()
    {
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
            return {type:"quizend"};
    }

    optionClicked(response)
    {
        this.lastClicked = true;
        if (response.type.trim() == "correct")
        {
            this.quizScore++;
            //console.log ("returning true");
            return true;

        }
        else
        {
            //console.log ("returning false");
            return false;
        }
        
    }
};