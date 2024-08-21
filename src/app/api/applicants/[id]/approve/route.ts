import { NextResponse } from 'next/server'
import connect from '@/lib/db'
import Applicant from '@/lib/models/applicant'
import { Types } from 'mongoose'

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const { id } = params

    await connect()

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 })
    }

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })
    }

    const applicant = await Applicant.findById(id)

    if (!applicant) {
      return NextResponse.json({ message: 'Data not found' }, { status: 404 })
    }

    // Urutan tahapan dan status
    const stages = ['SURVEY', 'PRINSIP', 'SPESIFIKASI', 'PENCAIRAN', 'PERTANGGUNGJAWABAN']
    const statuses = [
      'SIAP_UNTUK_MENGISI_FORM_PRINSIP',
      'SIAP_UNTUK_MENGISI_FORM_SPESIFIKASI',
      'SIAP_UNTUK_MENGISI_FORM_PENCAIRAN',
      'SIAP_UNTUK_MENGISI_FORM_PERTANGGUNGJAWABAN',
      'SELESAI'
    ]

    // Cari indeks tahapan saat ini
    const currentStageIndex = stages.indexOf(applicant.stage)

    // Tentukan tahapan dan status berikutnya
    let nextStage = applicant.stage
    let nextStatus = statuses[currentStageIndex]

    if (currentStageIndex < stages.length - 1) {
      nextStage = stages[currentStageIndex + 1]
    } else {
      nextStatus = 'SELESAI'
    }

    // Update applicant dengan tahapan dan status baru
    applicant.stage = nextStage
    applicant.status = nextStatus
    await applicant.save()

    return NextResponse.json(
      { message: 'Stage and status successfully updated', data: applicant },
      {
        status: 200
      }
    )
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error while updating stage and status', error: error.message },
      {
        status: 500
      }
    )
  }
}
