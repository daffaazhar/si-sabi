// Next Imports
import { NextResponse } from 'next/server'

// Other Imports
import connect from '@/lib/db'
import User from '@/lib/models/user'
import { Types } from 'mongoose'

const ObjectId = require('mongoose').Types.ObjectId

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const body = await req.json()
    const { id } = params

    await connect()
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 })
    }

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })
    }

    const updatedUser = await User.findOneAndUpdate({ _id: new ObjectId(id) }, body, { new: true })

    if (!updatedUser) {
      return NextResponse.json({ message: 'Data not found' }, { status: 404 })
    }

    return NextResponse.json(
      { message: 'Data successfully updated', data: updatedUser },
      {
        status: 200
      }
    )
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error while updating data', error: error.message },
      {
        status: 500
      }
    )
  }
}

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const { id } = params

    await connect()
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 })
    }

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })
    }

    const deletedUser = await User.findOneAndDelete({ _id: new ObjectId(id) })

    if (!deletedUser) {
      return NextResponse.json({ message: 'Data not found' }, { status: 404 })
    }

    return NextResponse.json(
      { message: 'Data successfully deleted', data: deletedUser },
      {
        status: 200
      }
    )
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error while deleting data', error: error.message },
      {
        status: 500
      }
    )
  }
}
