// 比如放在 app/page.tsx（首页）或 Navbar.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">欢迎来到简历机器人</h1>
      <Link href="/memo" className="text-blue-600 underline">
        ➕ 添加记忆
      </Link>
      <Link href="/chat" className="text-blue-600 underline">
        💬 开始聊天
      </Link>
    </main>
  );
}