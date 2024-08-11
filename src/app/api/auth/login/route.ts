import { NextResponse } from 'next/server'
import connect from '@/lib/db'
import User from '@/lib/models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
  await connect()

  const { email, password } = await req.json()

  const user = await User.findOne({ email })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1d' })

  return NextResponse.json({ data: user, token })
}
