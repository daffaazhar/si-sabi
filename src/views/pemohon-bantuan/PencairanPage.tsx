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
  Skeleton
} from '@mui/material'
import { LoadingButton } from '@mui/lab'

// Third-party Imports
import toast from 'react-hot-toast'

// Hook Imports
import { useMe } from '@/hooks/auth/useMe'
import { useFetchDetailApplicant } from '@/hooks/applicant/useFetchDetailApplicant'
import { useApproveApplicant } from '@/hooks/applicant/useApproveApplicant'
import { useRejectApplicant } from '@/hooks/applicant/useRejectApplicant'
import { useSubmitApplicantToSupervisor } from '@/hooks/applicant/useSubmitApplicantToSupervisor'

// Custom Component Imports
import OpenDialogOnElementClick from '@/@core/components/dialogs/OpenDialogOnElementClick'
import CustomInputViewMode from '@/@menu/components/CustomInputViewMode'
import FormPencairanDialog from '@/@core/components/dialogs/form-pencairan'

export default function PencairanPage({ id }: { id: string }) {
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
        title={`Informasi Detail Tahap Pencairan`}
        subheader='Informasi Detail Pemohon Bantuan pada Tahap Pencairan'
        action={
          isApplicantFetching || isApplicantPending ? (
            <Stack spacing={2} useFlexGap flexDirection='row' alignItems='center'>
              <Skeleton animation='wave' height={50} width={100} />
              <Skeleton animation='wave' height={50} width={100} />
            </Stack>
          ) : user?.data.role === 'PENYELIA' &&
            applicant?.stage === 'PENCAIRAN' &&
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
                applicant?.stage === 'PENCAIRAN' &&
                applicant?.status === 'SIAP_UNTUK_MENGISI_FORM_PENCAIRAN' && (
                  <OpenDialogOnElementClick
                    element={Button}
                    elementProps={{ variant: 'contained', color: 'secondary', children: 'Isi Form Prinsip' }}
                    dialog={FormPencairanDialog}
                    dialogProps={{ data: applicant }}
                  />
                )}
              {user?.data.role === 'STAFF' &&
                applicant?.stage === 'PENCAIRAN' &&
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
              {user?.data.role === 'PENYELIA' && ['PENCAIRAN'].includes(applicant?.stage) && (
                <OpenDialogOnElementClick
                  element={Button}
                  elementProps={{ variant: 'contained', color: 'secondary', children: 'Ubah' }}
                  dialog={FormPencairanDialog}
                  dialogProps={{ data: applicant }}
                />
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
        ) : !['PENCAIRAN'].includes(applicant?.stage) ? (
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
                Hal ini dikarenakan data pemohon bantuan ini belum mencapai tahap Pencairan
              </Typography>
            </Box>
          </Stack>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <CustomInputViewMode label='Invoice Vendor' value={!!applicant?.vendor_invoice ? 'Ya' : 'Tidak'} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInputViewMode
                label='Surat Penunjukan Rekening Vendor'
                value={!!applicant?.vendor_account_appointment_letter ? 'Ya' : 'Tidak'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInputViewMode label='Copy Buku Tabungan' value={!!applicant?.saving_book ? 'Ya' : 'Tidak'} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInputViewMode label='BAST' value={!!applicant?.bast ? 'Ya' : 'Tidak'} />
            </Grid>
            {applicant.nominal > 25000000 && (
              <Grid item xs={12} md={6}>
                <CustomInputViewMode label='Surat Pernyataan' value={!!applicant?.statement_letter ? 'Ya' : 'Tidak'} />
              </Grid>
            )}
            {applicant.nominal > 50000000 && (
              <Grid item xs={12} md={6}>
                <CustomInputViewMode
                  label='Laporan Penggunaan Bantuan PSBI'
                  value={!!applicant?.usage_report ? 'Ya' : 'Tidak'}
                />
              </Grid>
            )}
          </Grid>
        )}
      </CardContent>
    </Card>
  )
}
