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

    const generateRandomLetters = (length: number) => {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      let result = ''
      for (let i = 0; i < length; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length))
      }
      return result
    }

    const applicant = new Applicant({
      ...body,
      code: `PSBI2024-${generateRandomLetters(6)}`,
      invoice: false,
      non_pkp_tax_invoice: false,
      account_appointment_letter: false,
      saving_book: false,
      npwp: false,
      ktp: false,
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
