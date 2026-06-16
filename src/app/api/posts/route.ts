import { NextRequest, NextResponse } from 'next/server'

// TODO: 实现 GET /api/posts
// 从数据库读取所有帖子，按 created_at 倒序排列，返回 JSON 数组
export async function GET() {
  return NextResponse.json({ message: '待实现' }, { status: 501 })
}

// TODO: 实现 POST /api/posts
// 从请求体读取 title 和 content，保存到数据库，返回新帖子
export async function POST(request: NextRequest) {
  return NextResponse.json({ message: '待实现' }, { status: 501 })
}
