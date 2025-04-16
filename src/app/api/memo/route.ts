import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';
import { v4 as uuidv4 } from 'uuid';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

export async function POST(req: Request) {
  const { text } = await req.json();

  if (!text || typeof text !== 'string') {
    return NextResponse.json({ success: false, error: '无效内容' });
  }

  try {
    // 1. 生成 embedding
    const embeddingRes = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    const embedding = embeddingRes.data[0].embedding;

    // 2. 构建向量记录并上传到 Pinecone
    const record = {
      id: uuidv4(),
      values: embedding,
      metadata: { text },
    };

    await index.upsert([record]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Memory Add Error]', err);
    return NextResponse.json({ success: false, error: '添加失败' });
  }
}
