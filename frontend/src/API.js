// src/API.js

async function run(prompt) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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", // put your key here
      "HTTP-Referer": window.location.origin, // optional but good
      "X-Title": "Placement Interview AI",   // optional
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-chat-v3.1:free", // free model
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  const data = await response.json();

  // OpenRouter returns choices like OpenAI
  return data.choices?.[0]?.message?.content || "No response";
}

export default run;
