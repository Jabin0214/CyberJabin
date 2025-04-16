import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';

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
    return NextResponse.json({ reply: '请输入问题内容。' });
  }

  try {
    // 1️⃣ 将用户问题转为 embedding
    const embeddingRes = await openai.embeddings.create({
      model: 'text-embedding-3-small',
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

    const context = matches.map((m) => m.metadata?.text).join('\n---\n');

    // 3️⃣ 用 ChatGPT 回答问题，基于简历上下文
    const chatRes = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `你是一位正在应聘的候选人，请根据以下简历内容回答问题：\n${context}`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
    });
    const reply = chatRes.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error('[Chat API Error]', err);
    return NextResponse.json({ reply: '服务器发生错误，请稍后再试。' });
  }
}