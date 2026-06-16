'use client'

import { useState } from 'react'
import type { Post } from '@/types/post'

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // TODO: 实现 fetchPosts 函数
  // 调用 GET /api/posts，把结果存入 posts state
  async function fetchPosts() {
    // 待实现
  }

  // TODO: 实现 handleSubmit 函数
  // 调用 POST /api/posts，提交标题和内容
  // 注意：提交成功后需要刷新帖子列表（这里预埋了一个 bug：
  // 提交成功后没有调用 fetchPosts，导致列表不自动刷新）
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      // 待实现：调用 POST /api/posts
      // Bug 预埋：成功后不调用 fetchPosts()
      setTitle('')
      setContent('')
      setMessage('发帖成功！')
    } catch {
      setMessage('发帖失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      {/* 发帖表单 */}
      <section style={{ marginBottom: '32px' }}>
        <h2>发表新帖</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="title" style={{ display: 'block', marginBottom: '4px' }}>
              标题
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              placeholder="请输入标题"
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="content" style={{ display: 'block', marginBottom: '4px' }}>
              内容
            </label>
            <textarea
              id="content"
              value={content}
              onChange={e => setContent(e.target.value)}
              required
              rows={4}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              placeholder="请输入内容"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ padding: '8px 24px', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? '提交中...' : '发帖'}
          </button>
          {message && (
            <span style={{ marginLeft: '12px', color: message.includes('成功') ? 'green' : 'red' }}>
              {message}
            </span>
          )}
        </form>
      </section>

      {/* 帖子列表 */}
      <section>
        <h2>帖子列表</h2>
        {/* TODO: 实现帖子列表展示 */}
        {/* 需要：页面加载时调用 fetchPosts，把 posts 渲染出来 */}
        {posts.length === 0 ? (
          <p style={{ color: '#999' }}>暂无帖子</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {posts.map(post => (
              <li
                key={post.id}
                style={{
                  border: '1px solid #eee',
                  borderRadius: '4px',
                  padding: '16px',
                  marginBottom: '12px'
                }}
              >
                <h3 style={{ margin: '0 0 8px' }}>{post.title}</h3>
                <p style={{ margin: '0 0 8px', color: '#333' }}>{post.content}</p>
                <small style={{ color: '#999' }}>{post.created_at}</small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
