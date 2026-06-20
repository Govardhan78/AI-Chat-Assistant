const Groq = require("groq-sdk");
const { tavily } = require("@tavily/core");
const NodeCache = require("node-cache");
const dotEnv = require("dotenv");
dotEnv.config();

const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const cache = new NodeCache({
  stdTTL: 60 * 60 * 24,
});

const generate = async function generate(userMessage, threadId) {
  const baseMessages = [
    {
      role: "system",
      content: `You are a smart personal assistant.`,
    },
  ];

  const messages = cache.get(threadId) ?? baseMessages;

  messages.push({
    role: "user",
    content: userMessage,
  });

  while (true) {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      tool_choice: "auto",
      messages,
      tools: [
        {
          type: "function",
          function: {
            name: "webSearch",
            description: "Search the web",
            parameters: {
              type: "object",
              properties: {
                query: {
                  type: "string",
                },
              },
              required: ["query"],
            },
          },
        },
      ],
    });

    const assistantMessage = completion.choices[0].message;

    messages.push(assistantMessage);

    const toolCalls = assistantMessage.tool_calls;

    if (!toolCalls) {
      cache.set(threadId, messages);

      console.log("responce--->", assistantMessage.content);
      return assistantMessage.content;
    }

    for (const tool of toolCalls) {
      if (tool.function.name === "webSearch") {
        const result = await webSearch(JSON.parse(tool.function.arguments));

        messages.push({
          role: "tool",
          tool_call_id: tool.id,
          name: "webSearch",
          content: result,
        });
      }
    }
  }
};

async function webSearch({ query }) {
  const response = await tvly.search(query);

  return response.results.map((item) => item.content).join("\n\n");
}

module.exports = {
  generate,
};
