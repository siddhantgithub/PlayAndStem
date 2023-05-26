import openai from "../../utils/OpenAI";

export default async (req, res) => {
  console.log("OpenAI working for python code!!!!!!!");

  /*   if (req.method !== "POST") {
    return res.status(400).json({ error: "Invalid request" });
  } */

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        '##### Please explain the bugs in the Python code\n \n### Buggy Python\nimport Random\na = random.randint(1,12)\nb = random.randint(1,12)\nfor i in range(10):\n    question = "What is "+a+" x "+b+"? "\n    answer = input(question)\n    if answer = a*b\n        print (Well done!)\n    else:\n        print("No.")\n    \n### Fixed Python',
      temperature: 0,
      max_tokens: 182,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["###"],
    });

    console.log(response.data);
    // const reply = response.data.choices[0].message.content;
    // console.log(reply);
    //const result = reply.trim().split("\n", 1)[1].trim();

    return res.status(200).json({ data: response.data });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//   const responseJoke = response.data.choices[0].message.content;

//   console.log("Getting Responses-   " + responseJoke.replace("/^\n+/", ""));
//   return res.status(200).json({
//     data: {
//       text: responseJoke.replace("/^\n+/", ""),
//     },
//     message: "Joke Recevied Successfully!",
//   });
// };

// // const configuration = new Configuration({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });
// // const openai = new OpenAIApi(configuration);

// // const response = await openai.createCompletion({
// //   model: "gpt-3.5-turbo",
// //   prompt:
// //     '##### Fix bugs in the below function\n \n### Buggy Python\nimport Random\na = random.randint(1,12)\nb = random.randint(1,12)\nfor i in range(10):\n    question = "What is "+a+" x "+b+"? "\n    answer = input(question)\n    if answer = a*b\n        print (Well done!)\n    else:\n        print("No.")\n    \n### Fixed Python',
// //   temperature: 0,
// //   max_tokens: 182,
// //   top_p: 1.0,
// //   frequency_penalty: 0.0,
// //   presence_penalty: 0.0,
// //   stop: ["###"],
// // });

// import openai from "../../utils/OpenAI";

// export default async function CheckPyCode(code) {
//   // Set up OpenAI API credentials
//   const openaiInstance = new openai.OpenAIApi(process.env.OPENAI_API_KEY);

//   // Define the initial message to send to the model
//   const initialMessage = "```python\n" + code + "\n```";

//   // Create the prompt for the conversation
//   const prompt = [
//     { role: "system", content: "You are a Python code checker." },
//     { role: "user", content: initialMessage },
//   ];

//   // Send the prompt to the model
//   const response = await openai.ChatCompletion.create({
//     model: "gpt-3.5-turbo",
//     messages: prompt,
//   });

//   // Extract the code from the model's reply
//   const reply = response.choices[0].message.content;
//   const result = reply.trim().split("\n", 1)[1].trim();

//   return result;
// }

// // Example usage
// const pythonCode = `
// def square(x):
//     return x ** 2

// print(square(5))
// `;

// CheckPyCode(pythonCode)
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
