# 🧠 CyberJabin

**CyberJabin** is an AI-powered resume chatbot system built with **Next.js** that creates a digital representation of yourself.  
It allows users to store personal resume information and interact with an AI assistant that can answer questions based on that stored information.

---

## 🌟 Features

### 🤖 AI-Driven Chat System
- Interactive chat interface with the **"Jabin"** AI assistant  
- Contextual responses based on stored resume information  
- Real-time message display with visual differentiation between user and AI messages  
  (_see `page.tsx:8-12`_)

### 📚 Memory Management
- Add personal resume information to the knowledge base  
- Store experiences, skills, and qualifications for the AI to reference  

### 📡 Vector Database Integration
- Uses **Pinecone** vector database for semantic search capabilities  
- Efficiently retrieves the most relevant resume information for each query  
  (_see `route.ts:10-14`_)

---

## 🚀 Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS  
- **AI**: OpenAI API (`GPT-4` for chat, `text-embedding-3-small` for vector embeddings)  
- **Vector Database**: Pinecone  
- **Deployment**: Vercel (recommended)

---

## 📋 How It Works

### 📝 Adding Memories
- Users add resume information through the memory interface  
- Text is converted to vector embeddings using OpenAI  
- Vectors are stored in Pinecone with the original text as metadata  
  (_see `route.ts:19-34`_)

### 💬 Chat Interaction
- Users ask questions through the chat interface  
- Questions are converted to vector embeddings  
- The system finds the most relevant resume information in Pinecone  
- GPT-4 generates responses based on the retrieved context  
  (_see `route.ts:24-57`_)

---

## 🛠️ Getting Started

### ✅ Prerequisites
- Node.js (latest LTS version recommended)  
- OpenAI API key  
- Pinecone API key and index  

### ⚙️ Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
OPENAI_API_KEY=your_openai_api_key  
PINECONE_API_KEY=your_pinecone_api_key  
PINECONE_INDEX_NAME=your_pinecone_index_name  
```

### 📦 Installation

```bash
git clone https://github.com/yourusername/CyberJabin.git
cd CyberJabin

# Install dependencies
npm install
# or
yarn install

# Run development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 Usage

### 🧠 Home Page
- Navigate to memory addition or chat functionality  
  (_see `page.tsx:5-17`_)

### ✍️ Adding Memories
- Go to the **"Add Memory"** page  
- Enter your resume information in the text area  
- Click **"Submit to Pinecone"** to store your information  

### 💬 Chatting with AI
- Go to the **"Chat"** page  
- Type your question in the input field  
- Press Enter or click the send button  
- Receive contextually relevant answers based on your stored resume information  

---

## 🔒 Privacy Considerations

- All resume data is stored in **your own Pinecone instance**  
- API keys should be kept secure and not exposed in client-side code  
- Consider implementing **authentication** if deploying publicly  

---

## 📄 License

MIT License

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org)  
- [OpenAI](https://platform.openai.com)  
- [Pinecone](https://www.pinecone.io)  
- [Tailwind CSS](https://tailwindcss.com)

---

## 📝 Notes

This README provides a comprehensive overview of the **CyberJabin** project, explaining its purpose, features, and implementation details.  
The project creates a personal AI assistant that can answer questions about your resume by leveraging **vector embeddings** and **semantic search** technology.

---

## 📚 Wiki Pages

- [Overview (Jabin0214/CyberJabin)](https://github.com/Jabin0214/CyberJabin/wiki/Overview)  
- [Chat System (Jabin0214/CyberJabin)](https://github.com/Jabin0214/CyberJabin/wiki/Chat-System)