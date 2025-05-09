import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { Pinecone } from "@pinecone-database/pinecone";

// 🔑 初始化 OpenAI 和 Pinecone 客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const INDEX_NAME = process.env.PINECONE_INDEX_NAME!;

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message) {
    return NextResponse.json({ reply: "Please Ask。" });
  }

  try {
    // 1️⃣ 将用户问题转为 embedding
    const embeddingRes = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: message,
    });
    const embedding = embeddingRes.data[0].embedding;

    // 2️⃣ 查询 Pinecone 中最相关的简历片段
    const index = pinecone.Index(INDEX_NAME);
    const queryRes = await index.query({
      vector: embedding,
      topK: 5,
      includeMetadata: true,
    });

    const matches = queryRes.matches || [];

    const context = matches.map((m) => m.metadata?.text).join("\n---\n");

    // 3️⃣ 用 ChatGPT 回答问题，基于简历上下文
    const chatRes = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `
          You are now playing the role of a candidate who is being interviewed. The following are relevant segments of your personal resume and experiences. Please read this information carefully and always base your answers on it when answering users' questions.
          Context：
          ${context}

          Question：
          ${message}

          Answer：
          `,  
        },
        {
          role: "user",
          content: message,
        },
      ],
    });
    const reply = chatRes.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("[Chat API Error]", err);
    return NextResponse.json({ reply: "服务器发生错误，请稍后再试。" });
  }
}
