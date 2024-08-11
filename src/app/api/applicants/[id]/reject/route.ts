// Next Imports
import { NextResponse } from 'next/server'

// Third Party Imports
import { Types } from 'mongoose'

// Lib Imports
import connect from '@/lib/db'
import Applicant from '@/lib/models/applicant'

const ObjectId = Types.ObjectId

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })
    }

    await connect()

    const updatedApplicant = await Applicant.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { status: 'DITOLAK' },
      { new: true }
    )

    if (!updatedApplicant) {
      return NextResponse.json({ message: 'Data not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Data successfully rejected', data: updatedApplicant }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error while rejecting data', error: error.message },
      {
        status: 500
      }
    )
  }
}
