import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BBS 论坛',
  description: '一个简单的 BBS 论坛',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <header style={{ borderBottom: '1px solid #eee', paddingBottom: '16px', marginBottom: '24px' }}>
          <h1 style={{ margin: 0 }}>📋 BBS 论坛</h1>
        </header>
        {children}
      </body>
    </html>
  )
}
