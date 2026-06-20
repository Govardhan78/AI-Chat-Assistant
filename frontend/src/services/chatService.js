const API_URL = "http://localhost:5000/api/chat";

export const sendMessage = async (message) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      threadId: "chat-1",
    }),
  });

  const data = await response.json();

  return data.response;
};