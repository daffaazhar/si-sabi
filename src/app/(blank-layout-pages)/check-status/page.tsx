'use client'

// React & Next Imports
import { useState } from 'react'

// MUI Imports
import { Card, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Logo from '@/components/layout/shared/Logo'
import CustomTextField from '@/@core/components/mui/TextField'
import { LoadingButton } from '@mui/lab'
import MuiTimeline from '@mui/lab/Timeline'
import type { TimelineProps } from '@mui/lab/Timeline'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import { useFetchDetailApplicantByCode } from '@/hooks/applicant/useFetchDetailApplicantByCode'
import { ApplicantStageEnum, ApplicantStatusEnum } from '@/types/applicantTypes'

const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

export default function Page() {
  const [applicantCode, setApplicantCode] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const { data, isLoading } = useFetchDetailApplicantByCode(searchQuery)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApplicantCode(event.target.value)
  }

  const handleSearch = () => {
    setSearchQuery(applicantCode)
  }

  const getTimeline1Label = (stage: ApplicantStageEnum, status: ApplicantStatusEnum) => {
    if (stage === ApplicantStageEnum.SURVEY) {
      if (status === ApplicantStatusEnum.MENUNGGU_KONFIRMASI_DARI_PENYELIA) {
        return 'Pengusulan pada Pimpinan'
      } else if (status === ApplicantStatusEnum.DITOLAK) {
        return 'Pengusulan pada Pimpinan Ditolak'
      } else {
        return 'Pengusulan pada Pimpinan Disetujui'
      }
    }
    return 'Pengusulan pada Pimpinan Disetujui'
  }

  const isStageGreaterThan = (currentStage: ApplicantStageEnum, comparisonStage: ApplicantStageEnum) => {
    const stageOrder = [
      ApplicantStageEnum.SURVEY,
      ApplicantStageEnum.PRINSIP,
      ApplicantStageEnum.SPESIFIKASI,
      ApplicantStageEnum.PENCAIRAN,
      ApplicantStageEnum.PERTANGGUNGJAWABAN
    ]
    return stageOrder.indexOf(currentStage) > stageOrder.indexOf(comparisonStage)
  }

  return (
    <div className='flex justify-center items-center h-screen w-full bg-[#7367F0]'>
      <Card className='p-8 w-[480px]'>
        <div className='flex justify-between items-center gap-x-28'>
          <Logo />
        </div>
        <div className='mt-6'>
          <CustomTextField
            fullWidth
            autoComplete='off'
            placeholder='Masukkan kode unik SI-SABI'
            value={applicantCode}
            onChange={handleInputChange}
          />
        </div>
        <LoadingButton
          loading={isLoading}
          fullWidth
          variant='contained'
          color='primary'
          className='mt-4'
          onClick={handleSearch}
        >
          Cari
        </LoadingButton>
        {data === null && (
          <div className='bg-red-300 border border-red-500 rounded-sm p-4 text-center mt-6'>
            <Typography className='font-medium text-center text-red-500'>Data tidak ditemukan</Typography>
          </div>
        )}
        {data && (
          <Timeline className='mt-6'>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color='primary' />
                {isStageGreaterThan(data.stage, ApplicantStageEnum.SURVEY) && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <div>
                  <Typography className='font-medium' color='text.primary'>
                    {getTimeline1Label(data.stage, data.status)}
                  </Typography>
                </div>
              </TimelineContent>
            </TimelineItem>
            {isStageGreaterThan(data.stage, ApplicantStageEnum.SURVEY) && (
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color='primary' />
                  {isStageGreaterThan(data.stage, ApplicantStageEnum.SPESIFIKASI) && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <div>
                    <Typography className='font-medium' color='text.primary'>
                      Pengadaan Barang/Bantuan telah Diproses
                    </Typography>
                  </div>
                </TimelineContent>
              </TimelineItem>
            )}
            {isStageGreaterThan(data.stage, ApplicantStageEnum.SPESIFIKASI) && (
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color='primary' />
                </TimelineSeparator>
                <TimelineContent>
                  <div>
                    <Typography className='font-medium' color='text.primary'>
                      Bantuan Terrealisasi
                    </Typography>
                  </div>
                </TimelineContent>
              </TimelineItem>
            )}
          </Timeline>
        )}
      </Card>
    </div>
  )
}
