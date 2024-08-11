import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import connect from '@/lib/db'
import User from '@/lib/models/user'

export async function GET(req: Request) {
  // Ambil token dari header Authorization
  const authHeader = req.headers.get('Authorization')
  const token = authHeader?.split(' ')[1]

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 })
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)

    // Sambungkan ke database
    await connect()

    // Ambil detail pengguna berdasarkan ID dari token
    const user = await User.findById((decoded as any).userId).select('-password')

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Kembalikan detail pengguna
    return NextResponse.json({ data: user })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}
