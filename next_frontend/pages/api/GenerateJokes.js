import openai from "../../utils/OpenAI";

export default async (req, res) => {
  console.log("OPenAI working!!!!!!!");

  if (req.method !== "POST") {
    return res.status(400).json({ error: "Invalid request" });
  }

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    // prompt: "Tell me a joke on Javascript",
    messages: [
      {
        role: "user",
        content:
          "Can you generate a meme or joke or a brief story related to robotics?",
      },
    ],
    // temperature: 0.7,
    // prompt: "Tell me a joke.",
  });

  console.log(response);
  const responseJoke = response.data.choices[0].message.content;

  console.log(responseJoke);
  return res.status(200).json({
    data: {
      ...responseJoke,
      text: responseJoke.text.replace(/^\n+/, ""),
    },
  });
};
