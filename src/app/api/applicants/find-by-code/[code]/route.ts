// Next Imports
import { NextResponse } from 'next/server'

// Other Imports
import connect from '@/lib/db'
import Applicant from '@/lib/models/applicant'

export async function GET(request: Request, { params }: { params: { code: string } }) {
  const { code } = params

  try {
    await connect()
    const applicants = await Applicant.findOne({ code })
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
