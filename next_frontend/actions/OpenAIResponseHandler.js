
export const LearnerEventType = {
    ShortJoke: "shortjoke",
    CheckPythonCode: "checkpythoncode",
    ComparePythonCode: "comparepythoncode",
    AnswerQuestion: "answerquestion",
    HaveConversation: "haveconversation",
    OpenCairoSetting: "opencairosetting"
};
const ShortJokePrompt = `Generate a short joke for ten year olds`;

const CheckPythonCodePrompt = `Please check the Python code for syntax errors. Please only say correct if there are no syntax errors. Please only explain the errors. Also, please provide an explaination to fix the error so that a 10-year old can understand. Here is the code: `;

function returnPromptForCodeCheck (code, purpose)
{
  const returnPrompt = `Please check the Python code for errors. Please just say correct if the code will fulfill the purpose. The purpose of the code is ${purpose}. Please explain the errors but don't provide the correct code. Here is the code: ${code}`;
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

function returnHaveConversationPrompt (text, context)
{
  const AnswerQuestionPrompt = `Please respond to this text ${text}. The text is from a learner who is sending the text to ${context}. Please keep the response to two sentences and say something encouraging on learning robotics`;
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
            promptToSend = returnPromptForCodeCheck (request.data.code, request.data.purpose);
            break;

        case LearnerEventType.ComparePythonCode:
            promptToSend = returnPromptForCodeCompare(request.data.basecode,request.data.userresponse);
            break;

        case LearnerEventType.AnswerQuestion:
          promptToSend = returnAnswerQuestionPrompt(request.data.text);
          break;

          case LearnerEventType.HaveConversation:
            promptToSend = returnHaveConversationPrompt(request.data.text, request.data.context)
            break;
    }  
    
    const controller = new AbortController() // 5 second timeout:
    const timeoutId = setTimeout(() => {
        
      controller.abort()}, 2000)
    //console.log ("Prompt to send is", promptToSend);
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
      //throw new Error(response.statusText);
      request.dataRcvd (null, false,true);
      return;
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