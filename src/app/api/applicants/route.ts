// Next Imports
import { NextResponse } from 'next/server'

// Other Imports
import connect from '@/lib/db'
import Applicant from '@/lib/models/applicant'

export const GET = async () => {
  try {
    await connect()
    const applicants = await Applicant.find()
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

export const POST = async (req: Request) => {
  try {
    const body = await req.json()
    await connect()
    const applicant = new Applicant({
      name: body.name,
      document_number: null,
      date: null,
      regarding: null,
      coordinator: null,
      vendor_bid_documents: false,
      vendor_spk: false,
      notification_letter: false,
      nominal: null,
      vendor_invoice: false,
      vendor_account_appointment_letter: false,
      saving_book: false,
      bast: false,
      statement_letter: false,
      usage_report: false,
      stage: 'SURVEY',
      status: 'MENUNGGU_KONFIRMASI_DARI_PENYELIA'
    })
    await applicant.save()
    return NextResponse.json({ message: 'Data successfully added', data: applicant }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error while adding data', error: error.message },
      {
        status: 500
      }
    )
  }
}
