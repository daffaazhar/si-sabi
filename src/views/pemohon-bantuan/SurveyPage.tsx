'use client'

// MUI Imports
import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  Button,
  Divider,
  Grid,
  Chip,
  CircularProgress,
  Box,
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

// Type Imports
import { ApplicantStatusEnum } from '@/types/applicantTypes'
import PemohonBantuan from '@/@core/components/dialogs/pemohon-bantuan'

export default function SurveyPage({ id }: { id: string }) {
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
        title={`Informasi Detail Tahap Survey`}
        subheader='Informasi Detail Pemohon Bantuan pada Tahap Survey'
        action={
          isApplicantFetching || isApplicantPending ? (
            <Stack spacing={2} useFlexGap flexDirection='row' alignItems='center'>
              <Skeleton animation='wave' height={50} width={100} />
              <Skeleton animation='wave' height={50} width={100} />
            </Stack>
          ) : user?.data.role === 'PENYELIA' && applicant?.status === 'MENUNGGU_KONFIRMASI_DARI_PENYELIA' ? (
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
              {user?.data.role === 'PENYELIA' && (
                <OpenDialogOnElementClick
                  element={Button}
                  elementProps={{ variant: 'contained', color: 'secondary', children: 'Ubah' }}
                  dialog={PemohonBantuan}
                  dialogProps={{ data: applicant }}
                />
              )}
            </Stack>
          )
        }
      />
      <Divider sx={{ m: '0 !important' }} />
      <CardContent>
        {isApplicantPending || isApplicantFetching ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <CustomInputViewMode label='Kode SI-SABI' value={applicant?._id} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInputViewMode label='Nama Pemohon' value={applicant?.name} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInputViewMode label='Tahap' value={applicant?.stage} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomInputViewMode
                label='Status'
                valueComponent={
                  <Chip
                    color={
                      applicant?.status === 'MENUNGGU_KONFIRMASI_DARI_PENYELIA'
                        ? 'warning'
                        : applicant?.status === 'SIAP_UNTUK_MENGISI_FORM_PENCAIRAN' ||
                            applicant?.status === 'SIAP_UNTUK_MENGISI_FORM_PRINSIP' ||
                            applicant?.status === 'SIAP_UNTUK_MENGISI_FORM_SPESIFIKASI'
                          ? 'info'
                          : applicant?.status === 'DITOLAK'
                            ? 'error'
                            : 'primary'
                    }
                    size='small'
                    label={ApplicantStatusEnum[applicant?.status as keyof typeof ApplicantStatusEnum]}
                  />
                }
              />
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  )
}
