# cf_ai_resume_Agent
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3068B7?style=for-the-badge&logo=zod&logoColor=white)

Welcome to **Kartikay’s AI Chat Assistant**, an interactive chatbot powered by **Cloudflare's Agent Starter library**.  
This assistant is designed to answer questions about Kartikay’s **background, experience, skills, and projects**, and even provide a link to schedule meetings.

---

## 💬 How to Use

To explore what the assistant can do, simply type:" What tools are available?"

The assistant will list all the tools it can use — such as learning more about Kartikay, fetching his experience, projects, or sharing his meeting link.

---

## ⚙️ Available Tools

The chatbot is equipped with several AI-powered tools that can be invoked automatically by the model when relevant to your prompt.

| Tool Name | Description |
|------------|-------------|
| **getInformation** | Shares a short introduction about Kartikay and his professional values. |
| **getExperience** | Details Kartikay’s work experience, technologies he’s used, and major achievements. |
| **getProjects** | Lists Kartikay’s notable projects and open-source contributions. |
| **ScheduledameetingwithKartik** | Lists currently scheduled background tasks (for internal system use). |

---

## 🧩 Example Questions

You can interact with the assistant naturally. Try asking:

- “Who is Kartikay Luthra?”
- “Tell me about Kartikay’s work experience.”
- “What are Kartikay’s projects?”
- “Can I schedule a meeting with Kartikay?”
- “What tools are available?”

---

## 🏗️ Tech Stack

This project is built on:

- **TypeScript**
- **Cloudflare Workers**
- **AI SDK (`ai` package)**
- **OpenAI GPT-4o**
- **Zod** (for tool input validation)
- **Custom tools framework (`agents/ai-chat-agent`)**

---

## 🔑 Environment Variables

Before deploying, set the following environment variable:

```bash
OPENAI_API_KEY=your_openai_api_key_here
 ```
## Running Locally
1. Clone the repository
   ```bash
   git clone https://github.com/kartikxx07/cf_ai_resume_Agent.git
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. start the server
   ```bash
   npm start
   ```
For more information regarding running the application refer to Cloudfare's Agent Starter repository

## About Kartikay 
Kartikay Luthra is a software engineer passionate about AI, data systems, and scalable distributed architectures.
He has worked with technologies such as Kafka, RDBMS, NoSQL, NLP libraries, and enjoys building innovative systems that combine machine learning, backend engineering, and automation.
