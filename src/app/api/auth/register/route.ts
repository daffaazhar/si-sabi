import { NextResponse } from 'next/server'
import connect from '@/lib/db'
import User from '@/lib/models/user'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  await connect()

  const { name, email, password, role } = await req.json()

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = new User({
    name,
    email,
    role,
    password: hashedPassword
  })

  await newUser.save()

  return NextResponse.json({ message: 'User registered successfully' }, { status: 201 })
}
