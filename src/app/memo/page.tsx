'use client';

import { useState } from 'react';

export default function AddMemoryPage() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setStatus('loading');

    try {
      const res = await fetch('/api/memo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">📌 添加记忆到 Pinecone</h1>
      <textarea
        className="w-full border rounded p-2 min-h-[150px]"
        placeholder="请输入要记住的内容（如项目经验、成就、课程等）"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        提交到 Pinecone
      </button>
      {status === 'success' && <p className="text-green-600">✅ 添加成功！</p>}
      {status === 'error' && <p className="text-red-600">❌ 添加失败，请稍后再试</p>}
    </div>
  );
}
