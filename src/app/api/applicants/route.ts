// Next Imports
import { NextResponse } from 'next/server'

// Other Imports
import connect from '@/lib/db'
import Applicant from '@/lib/models/applicant'
import path from 'path'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

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
    await connect()

    const generateRandomLetters = (length: number) => {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      return Array.from({ length }, () => letters.charAt(Math.floor(Math.random() * letters.length))).join('')
    }

    const formData = await req.formData()
    const body: any = {}

    formData.forEach((value, key) => {
      const arrayKeyMatch = key.match(/(.+)\[(\d+)\]/)

      if (arrayKeyMatch) {
        const arrayKey = arrayKeyMatch[1]
        const index = parseInt(arrayKeyMatch[2], 10)

        if (!body[arrayKey]) {
          body[arrayKey] = []
        }

        body[arrayKey][index] = value
      } else {
        body[key] = value
      }
    })

    const uploadFile = async (file: File | null): Promise<string | null> => {
      if (file instanceof File) {
        const uploadDir = path.join(process.cwd(), 'public')
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true })
        }

        const extension = path.extname(file.name)
        const filename = `${uuidv4()}${extension}`
        const filePath = path.join(uploadDir, filename)

        const fileStream = fs.createWriteStream(filePath)
        fileStream.write(Buffer.from(await file.arrayBuffer()))
        fileStream.end()

        return `/${filename}`
      }

      return null
    }

    const filePaths = {
      survey_photo_1: await uploadFile(formData.get('survey_photo_1') as File | null),
      survey_photo_2: await uploadFile(formData.get('survey_photo_2') as File | null),
      survey_photo_3: await uploadFile(formData.get('survey_photo_3') as File | null)
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
      is_distributed: false,
      survey_photo_1: filePaths.survey_photo_1,
      survey_photo_2: filePaths.survey_photo_2,
      survey_photo_3: filePaths.survey_photo_3,
      stage: 'SURVEY',
      status: 'DRAFT'
    })

    await applicant.save()
    return NextResponse.json({ message: 'Data successfully added', data: applicant }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ message: 'Error while adding data', error: error.message }, { status: 500 })
  }
}
