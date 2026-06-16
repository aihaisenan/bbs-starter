import { getDb } from '@/lib/db'

// 每次测试前清空数据库，保持测试独立
beforeEach(() => {
  const db = getDb()
  db.exec('DELETE FROM posts')
})

describe('GET /api/posts', () => {
  it('没有帖子时返回空数组', async () => {
    const response = await fetch('http://localhost:3000/api/posts')
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBe(0)
  })

  it('有帖子时返回帖子列表', async () => {
    // 先插入一条数据
    const db = getDb()
    db.prepare(
      'INSERT INTO posts (title, content) VALUES (?, ?)'
    ).run('测试标题', '测试内容')

    const response = await fetch('http://localhost:3000/api/posts')
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.length).toBe(1)
    expect(data[0].title).toBe('测试标题')
    expect(data[0].content).toBe('测试内容')
  })

  it('帖子按时间倒序排列', async () => {
    const db = getDb()
    db.prepare(
      'INSERT INTO posts (title, content) VALUES (?, ?)'
    ).run('第一帖', '内容一')
    db.prepare(
      'INSERT INTO posts (title, content) VALUES (?, ?)'
    ).run('第二帖', '内容二')

    const response = await fetch('http://localhost:3000/api/posts')
    const data = await response.json()

    expect(data[0].title).toBe('第二帖')
    expect(data[1].title).toBe('第一帖')
  })
})

describe('POST /api/posts', () => {
  it('成功创建帖子并返回 201', async () => {
    const response = await fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: '新帖子', content: '帖子内容' })
    })
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.title).toBe('新帖子')
    expect(data.content).toBe('帖子内容')
    expect(data.id).toBeDefined()
  })

  it('缺少 title 时返回 400', async () => {
    const response = await fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: '没有标题' })
    })

    expect(response.status).toBe(400)
  })

  it('缺少 content 时返回 400', async () => {
    const response = await fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: '没有内容' })
    })

    expect(response.status).toBe(400)
  })
})
