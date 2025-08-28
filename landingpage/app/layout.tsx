import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Claude Code講座 | AI開発の未来を学ぼう',
  description: 'Claude Codeを使って効率的なAI開発を学べる実践的な講座です。初心者から上級者まで、段階的にスキルアップできるカリキュラムを提供します。',
  keywords: 'Claude Code, AI開発, プログラミング講座, 人工知能, 開発効率化',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  )
}