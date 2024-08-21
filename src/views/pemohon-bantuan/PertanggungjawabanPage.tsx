'use client'

// Next & React Imports
import Image from 'next/image'

// MUI Imports
import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  Button,
  Divider,
  Grid,
  CircularProgress,
  Box,
  Typography,
  Skeleton,
  FormControlLabel,
  Checkbox
} from '@mui/material'
import { LoadingButton } from '@mui/lab'

// Third-party Imports
import toast from 'react-hot-toast'
import dayjs from 'dayjs'

// Hook Imports
import { useMe } from '@/hooks/auth/useMe'
import { useFetchDetailApplicant } from '@/hooks/applicant/useFetchDetailApplicant'
import { useApproveApplicant } from '@/hooks/applicant/useApproveApplicant'
import { useRejectApplicant } from '@/hooks/applicant/useRejectApplicant'
import { useSubmitApplicantToSupervisor } from '@/hooks/applicant/useSubmitApplicantToSupervisor'

// Custom Component Imports
import CustomInputViewMode from '@/@menu/components/CustomInputViewMode'

export default function PertanggungjawabanPage({ id }: { id: string }) {
  const { data: user } = useMe()
  const {
    data: applicant,
    isPending: isApplicantPending,
    isFetching: isApplicantFetching
  } = useFetchDetailApplicant(id)
  const { mutate: approve, isPending: isApproving } = useApproveApplicant()
  const { mutate: reject, isPending: isRejecting } = useRejectApplicant()
  const { mutate: submitToSupervisor, isPending: isSubmittingToSupervisor } = useSubmitApplicantToSupervisor()

  const handleApproval = () => {
    const mutationPromise = new Promise((resolve, reject) => {
      approve(id, {
        onSuccess: data => resolve(data),
        onError: error => reject(error)
      })
    })
    toast.promise(mutationPromise, {
      loading: 'Menyetujui data pemohon...',
      success: 'Data pemohon berhasil disetujui',
      error: 'Terjadi kesalahan'
    })
  }

  const handleReject = () => {
    const mutationPromise = new Promise((resolve, _) => {
      reject(id, {
        onSuccess: data => resolve(data),
        onError: error => _(error)
      })
    })
    toast.promise(mutationPromise, {
      loading: 'Menolak data pemohon...',
      success: 'Data pemohon berhasil ditolak',
      error: 'Terjadi kesalahan'
    })
  }

  const handleSubmitToSupervisor = () => {
    const mutationPromise = new Promise((resolve, reject) => {
      submitToSupervisor(id, {
        onSuccess: data => resolve(data),
        onError: error => reject(error)
      })
    })
    toast.promise(mutationPromise, {
      loading: 'Mengajukan data ke penyelia...',
      success: 'Data pemohon berhasil diajukan ke penyelia',
      error: 'Terjadi kesalahan'
    })
  }

  return (
    <Card>
      <CardHeader
        title={`Informasi Detail Pertanggungjawaban`}
        subheader='Informasi Detail Pemohon Bantuan pada Pertanggungjawaban'
        action={
          isApplicantFetching || isApplicantPending ? (
            <Stack spacing={2} useFlexGap flexDirection='row' alignItems='center'>
              <Skeleton animation='wave' height={50} width={100} />
              <Skeleton animation='wave' height={50} width={100} />
            </Stack>
          ) : user?.data.role === 'PENYELIA' &&
            applicant?.stage === 'PERTANGGUNGJAWABAN' &&
            applicant?.status === 'MENUNGGU_KONFIRMASI_DARI_PENYELIA' ? (
            <Stack spacing={2} useFlexGap flexDirection='row' alignItems='center'>
              <LoadingButton loading={isApproving} type='submit' variant='contained' onClick={handleApproval}>
                Setujui
              </LoadingButton>
              <LoadingButton
                loading={isRejecting}
                type='submit'
                variant='contained'
                color='error'
                onClick={handleReject}
              >
                Tolak
              </LoadingButton>
            </Stack>
          ) : (
            <Stack spacing={2} useFlexGap flexDirection='row' alignItems='center'>
              {user?.data.role === 'STAFF' &&
                applicant?.stage === 'PERTANGGUNGJAWABAN' &&
                applicant?.status === 'SIAP_UNTUK_MENGISI_FORM_PERTANGGUNGJAWABAN' && (
                  <Button variant='contained' color='secondary' href={`/pemohon-bantuan/${id}/form-pertanggungjawaban`}>
                    Isi Form Pertanggungjawaban
                  </Button>
                )}
              {user?.data.role === 'STAFF' &&
                applicant?.stage === 'PERTANGGUNGJAWABAN' &&
                !['MENUNGGU_KONFIRMASI_DARI_PENYELIA', 'SELESAI', 'DITOLAK'].includes(applicant?.status) && (
                  <LoadingButton
                    loading={isSubmittingToSupervisor}
                    type='submit'
                    variant='contained'
                    color='primary'
                    onClick={handleSubmitToSupervisor}
                  >
                    Ajukan ke Penyelia
                  </LoadingButton>
                )}
              {user?.data.role === 'PENYELIA' && ['PERTANGGUNGJAWABAN'].includes(applicant?.stage) && (
                <Button variant='contained' color='secondary' href={`/pemohon-bantuan/${id}/form-pertanggungjawaban`}>
                  Ubah
                </Button>
              )}
            </Stack>
          )
        }
      />
      <Divider sx={{ m: '0 !important' }} />
      <CardContent>
        {isApplicantFetching || isApplicantPending ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : !['PERTANGGUNGJAWABAN'].includes(applicant?.stage) ? (
          <Stack sx={{ p: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Image
              width={150}
              height={200}
              src='/images/illustrations/characters/1.png'
              className='w-32 h-auto mb-8'
              alt='Illustration'
            />
            <Box>
              <Typography variant='h2' fontSize={22} sx={{ mb: 1.5 }}>
                Oops! Anda Tidak Dapat Mengakses Halaman Ini 😖
              </Typography>
              <Typography sx={{ mb: 6, color: 'text.secondary' }}>
                Hal ini dikarenakan data pemohon bantuan ini belum mencapai tahap pertanggungjawaban
              </Typography>
            </Box>
          </Stack>
        ) : (
          <>
            <Grid container spacing={4}>
              {applicant?.fund_nominal > 0 && (
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    label='BAST'
                    labelPlacement='end'
                    control={<Checkbox value={applicant?.bast} checked={applicant?.bast} />}
                  />
                </Grid>
              )}
              {applicant?.fund_nominal > 25000000 && (
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    label='Surat Pernyataan'
                    labelPlacement='end'
                    control={<Checkbox value={applicant?.statement_letter} checked={applicant?.statement_letter} />}
                  />
                </Grid>
              )}
              {applicant?.fund_nominal > 50000000 && (
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    label='Laporan Penggunaan Bantuan'
                    labelPlacement='end'
                    control={<Checkbox value={applicant?.usage_report} checked={applicant?.usage_report} />}
                  />
                </Grid>
              )}
            </Grid>
          </>
        )}
      </CardContent>
    </Card>
  )
}
