import axios from "axios";

export const getAICommitMessage = async (description: string) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an assistant that writes git commit messages in conventional commit format." },
        { role: "user", content: `Write a commit message for: ${description}` }
      ],
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
};
