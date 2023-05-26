// import * as React from "react";

export const OpenAIRequestHandler = (data) => {
  console.log("openai request handler -> ", data);

  var apiURL = "";
  switch (data.reqType) {
    case "GetJokeFromOpenai":
      apiURL = "/api/GenerateJokes";
      break;

    case "DebugPythonCode":
      apiURL = "/api/CheckPyCode";
      break;

    default:
      apiURL = "www.playandstem.com";
      break;
  }

  return fetch(apiURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      //console.log (response.status);
      return response.json();
    })
    .catch((err) => console.log("here is the error", err));
};

export const GetJokeFromOpenai = (data) => {
  //console.log ("sdfasdfsa",data);
  return fetch(`/api/GenerateJokes`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Content: "Tell me a Joke",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      //console.log (response.status);
      return response.json();
    })
    .catch((err) => console.log("here is the error", err));
};
////////////////////////////////////////////////////////////////////////////////////

// function getUpdatedRequestForOpenAi(reqOpenAi, data, reqType) {
//   switch (reqType) {
//     case "UPDATEJOKE":
//       reqOpenAi.joke = data;
//       break;

//     case "UPDATESTORY":
//       reqOpenAi.story = data;
//       break;

//     case "UPDATEPYTHONCODE":
//       reqOpenAi.checkPythonCode = data;
//       break;
//   }
//   return reqOpenAi;
// }

// function getDataFromOpenAi(reqOpenAi, reqType) {
//   var data;
//   switch (reqType) {
//     case "GETJOKE":
//       data = { getJoke: reqOpenAi.joke };
//       break;

//     case "GETSTORY":
//       data = { getStory: reqOpenAi.story };
//       break;

//     case "GETPYTHONRESULT":
//       data = { getPythonResult: reqOpenAi.checkPythonCode };
//       break;

//     // case "GETALLPROGRESS":
//     //   data = {
//     //     missionProgress: learner.missionProgress,
//     //     chapterProgress: learner.chapterProgress,
//     //     quizProgress: learner.quizProgress,
//     //   };
//     //   break;
//   }
//   return data;
// }

// export default async (req, res) => {
//   console.log("OpenAI working in  Task Manager!!!!!!!");

//   // if (req.method !== "POST") {
//   //   return res.status(400).json({ error: "Invalid request" });
//   // }

//   const { _id, data, reqType } = req.body;

//   const response = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "user",
//         content:
//           "Can you generate joke or a brief story related to robotics in less than 100?",
//       },
//     ],
//   });

//   const responseJoke = response.data.choices[0].message.content;

//   console.log("Getting Responses-   " + responseJoke.replace("/^\n+/", ""));
//   return res.status(200).json({
//     data: {
//       text: responseJoke.replace("/^\n+/", ""),
//     },
//     message: "Data Recevied Successfully!",
//   });
// };
