// Next Imports
import { NextResponse } from 'next/server'

// Third Party Imports
import { Types } from 'mongoose'

// Other Imports
import connect from '@/lib/db'
import Applicant from '@/lib/models/applicant'

const ObjectId = require('mongoose').Types.ObjectId

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    await connect()
    const applicants = await Applicant.findOne({ _id: id })
    return NextResponse.json(
      { message: 'Data successfully obtained', data: applicants },
      {
        status: 200
      }
    )
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error while obtain data', error: error.message },
      {
        status: 500
      }
    )
  }
}

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  const body = await req.json()
  const { id } = params

  try {
    await connect()
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 })
    }

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })
    }

    const updatedApplicant = await Applicant.findOneAndUpdate({ _id: new ObjectId(id) }, body, { new: true })

    if (!updatedApplicant) {
      return NextResponse.json({ message: 'Data not found' }, { status: 404 })
    }

    return NextResponse.json(
      { message: 'Data successfully updated', data: updatedApplicant },
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
  const { id } = params

  try {
    await connect()
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 })
    }

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })
    }

    const deletedApplicant = await Applicant.findOneAndDelete({ _id: new ObjectId(id) })

    if (!deletedApplicant) {
      return NextResponse.json({ message: 'Data not found' }, { status: 404 })
    }

    return NextResponse.json(
      { message: 'Data successfully deleted', data: deletedApplicant },
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
