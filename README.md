# 🤖 AI Chat Assistant

A full-stack AI chat application powered by Groq's Llama 3.3 model with real-time web search capabilities via Tavily.

---

## ✨ Features

- 💬 Conversational AI using **Llama 3.3 70B** via Groq
- 🌐 **Web search** tool — AI automatically searches the web when needed (Tavily)
- 🧠 **Per-session memory** — conversation history cached per thread
- 🎨 **ChatGPT-style UI** — dark theme, centered layout, message bubbles
- ⌨️ **Typing indicator** with animated dots while AI is responding
- 📋 **Suggestion chips** on empty state for quick prompts
- ↩️ Send with `Enter`, new line with `Shift+Enter`
- 📱 Responsive design

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS v4 | Styling |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| Groq SDK | LLM inference (Llama 3.3 70B) |
| Tavily | Web search tool |
| node-cache | In-memory conversation history |
| dotenv | Environment variable management |

---

## 📁 Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatBox.jsx      # Main chat UI with input & message list
│   │   │   └── Message.jsx      # Individual message bubble component
│   │   ├── services/
│   │   │   └── chatService.js   # API calls to backend
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── controllers/
│   │   └── chat.controller.js   # Request handler
│   ├── routes/
│   │   └── chat.routes.js       # Express routes
│   ├── services/
│   │   └── ai.service.js        # Groq + Tavily agentic loop
│   ├── server.js
│   ├── .env.example             # Environment variable template
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [Groq API key](https://console.groq.com/) (free)
- A [Tavily API key](https://tavily.com/) (free tier available)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-chat-assistant.git
cd ai-chat-assistant
```

### 2. Setup the Backend

```bash
cd backend
npm install
cp .env.example .env
```

Fill in your API keys in `backend/.env`:

```env
PORT=5000
GROQ_API_KEY=your_groq_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

Start the backend:

```bash
npm run dev
```

### 3. Setup the Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔄 How It Works

```
User types message
       ↓
React frontend sends POST /api/chat
       ↓
Express backend receives { message, threadId }
       ↓
ai.service.js calls Groq (Llama 3.3 70B)
       ↓
If AI needs current info → calls webSearch tool (Tavily)
       ↓
Tavily returns web results → sent back to Groq
       ↓
Groq generates final response
       ↓
Response returned to frontend & displayed
```

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Backend server port (default: 5000) |
| `GROQ_API_KEY` | API key from [console.groq.com](https://console.groq.com/) |
| `TAVILY_API_KEY` | API key from [tavily.com](https://tavily.com/) |

---

## 📌 Notes

- Conversation history is stored in-memory and resets on server restart
- The AI uses `chat-1` as the default thread ID (single session)
- Web search is triggered automatically by the AI when it needs real-time data
