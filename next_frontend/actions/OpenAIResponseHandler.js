
export const LearnerEventType = {
    ShortJoke: "shortjoke",
    CheckPythonCode: "checkpythoncode",
    ComparePythonCode: "comparepythoncode",
    AnswerQuestion: "answerquestion"
};
const ShortJokePrompt = `Generate a short joke for ten year olds related to robotics and computer programming`;

const CheckPythonCodePrompt = `Please check the Python code for errors. Also, please provide an explaination to fix the error so that a 10-year old can understand. Here is the code: `;

function returnPromptForCodeCheck (code, purpose)
{
  const returnPrompt = `Please check the Python code for errors and just answer correct if the code is correct. The purpose of the code is ${purpose}. If there is an error, please provide an explaination to fix the error so that a 10-year old can understand. Here is the code: ${code}`;
  return returnPrompt;
}

function returnPromptForCodeCompare (basecode, userresponse)
{
  const ComparePythonCodePrompt = `Please check whether python Code ${basecode} is same as ${userresponse} and answer just yes or no. If no, explain why the code is different`;
  return ComparePythonCodePrompt; 
}

function returnAnswerQuestionPrompt (question)
{
  const AnswerQuestionPrompt = `Please answer a question only if the question is related to STEM topic. If the question is not appropriate, please answer not appropriate with the reason. Please make the answer simple so that even a seven year old can understand. Please limit the response to two sentences. Question is ${question}`;
  return AnswerQuestionPrompt;
}


//Request should have following fields
//Request type as reqType
//data such as Python code
//dataRcvd -- Callback function that takes two values chunkValue and a boolean parameter indicating stream has ended or not
export const GetOpenAIResponse = async (request) => 
{
    var promptToSend = '';
    switch (request.reqType)
    {
        case LearnerEventType.ShortJoke:
            promptToSend = ShortJokePrompt;
            break;

        case LearnerEventType.CheckPythonCode:
            promptToSend = returnPromptForCodeCheck (request.code, request.purpose);
            break;

        case LearnerEventType.ComparePythonCode:
            promptToSend = returnPromptForCodeCompare(request.data.basecode,request.data.userresponse);
            break;

            case LearnerEventType.AnswerQuestion:
              promptToSend = returnAnswerQuestionPrompt(request.question);
              break;
    }
    const response = await fetch("/api/openAI/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt:promptToSend,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      request.dataRcvd (chunkValue, false);
      //setGeneratedBios((prev) => prev + chunkValue);
    }
    request.dataRcvd (null, true);



    //setLoading(false);
  };