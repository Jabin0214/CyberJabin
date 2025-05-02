# 🧠 CyberJabin

**CyberJabin** is an AI-powered resume chatbot system built with **Next.js** that creates a digital representation of yourself. It allows users to store personal resume information and interact with an AI assistant that can answer questions based on that stored information.

---

## 🌟 Features

### 🤖 AI-Driven Chat System
- Interactive chat interface with the "Jabin" AI assistant  
- Contextual responses based on stored resume information  
- Real-time message display with visual distinction between user and AI  

### 📚 Memory Management
- Add personal resume information to the knowledge base  
- Store experiences, skills, and qualifications for the AI to reference  

### 📡 Vector Database Integration
- Uses **Pinecone** vector database for semantic search  
- Efficiently retrieves the most relevant resume information for each query  

---

## 🚀 Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS  
- **AI**: OpenAI API (GPT-4 for chat, `text-embedding-3-small` for vector embeddings)  
- **Vector DB**: Pinecone  
- **Deployment**: Vercel (recommended)  

---

## 📋 How It Works

### 📝 Adding Memories
1. Users add resume information through the memory interface  
2. Text is converted to vector embeddings using OpenAI  
3. Vectors are stored in Pinecone with the original text as metadata  

### 💬 Chat Interaction
1. Users ask questions through the chat interface  
2. Questions are embedded and compared semantically to stored memories  
3. The system retrieves top-k relevant memories from Pinecone  
4. GPT-4 generates a context-aware response  

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (latest LTS version recommended)  
- OpenAI API key  
- Pinecone API key and index  

### Environment Setup

Create a `.env.local` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key  
PINECONE_API_KEY=your_pinecone_api_key  
PINECONE_INDEX_NAME=your_pinecone_index_name  