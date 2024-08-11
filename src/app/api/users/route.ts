import { NextResponse } from 'next/server'
import connect from '@/lib/db'
import User from '@/lib/models/user'
import { Types } from 'mongoose'

const ObjectId = require('mongoose').Types.ObjectId

export async function GET(req: Request) {
  try {
    await connect()
    const users = await User.find().select('-password')
    return NextResponse.json({ data: users }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}
