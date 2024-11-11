// Next Imports
import { NextResponse } from 'next/server'

// Third Party Imports
import { Types } from 'mongoose'
import path from 'path'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

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
  const { id } = params

  try {
    await connect()
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 })
    }

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })
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
      survey_photo_1: formData.get('survey_photo_1')
        ? await uploadFile(formData.get('survey_photo_1') as File | null)
        : undefined,
      survey_photo_2: formData.get('survey_photo_2')
        ? await uploadFile(formData.get('survey_photo_2') as File | null)
        : undefined,
      survey_photo_3: formData.get('survey_photo_3')
        ? await uploadFile(formData.get('survey_photo_3') as File | null)
        : undefined
    }

    const updatedApplicant = await Applicant.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        ...body,
        ...(filePaths.survey_photo_1 !== undefined ? { survey_photo_1: filePaths.survey_photo_1 } : {}),
        ...(filePaths.survey_photo_2 !== undefined ? { survey_photo_2: filePaths.survey_photo_2 } : {}),
        ...(filePaths.survey_photo_3 !== undefined ? { survey_photo_3: filePaths.survey_photo_3 } : {})
      },
      { new: true }
    )

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
