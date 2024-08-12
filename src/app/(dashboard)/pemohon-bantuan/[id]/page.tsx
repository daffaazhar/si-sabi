'use client'

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
  Typography,
  Skeleton,
  IconButton
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import CustomInputViewMode from '@/@menu/components/CustomInputViewMode'

// Third Party Imports
import dayjs from 'dayjs'
import toast from 'react-hot-toast'

// Hook Imports
import { useMe } from '@/hooks/auth/useMe'
import { useFetchDetailApplicant } from '@/hooks/applicant/useFetchDetailApplicant'
import { useSubmitApplicantToSupervisor } from '@/hooks/applicant/useSubmitApplicantToSupervisor'
import { useApproveApplicant } from '@/hooks/applicant/useApproveApplicant'
import { useRejectApplicant } from '@/hooks/applicant/useRejectApplicant'

// Type Imports
import { ApplicantStatusEnum } from '@/types/applicantTypes'

// Custom Component Imports
import OpenDialogOnElementClick from '@/@core/components/dialogs/OpenDialogOnElementClick'
import FormPrinsipDialog from '@/@core/components/dialogs/form-prinsip'
import FormSpesifikasiDialog from '@/@core/components/dialogs/form-spesifikasi'
import FormPencairanDialog from '@/@core/components/dialogs/form-pencairan'
import PemohonBantuan from '@/@core/components/dialogs/pemohon-bantuan'

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params

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
        title={`Informasi Detail`}
        subheader='Informasi Detail Pemohon Bantuan'
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
            user?.data.role === 'STAFF' && (
              <Stack spacing={2} useFlexGap flexDirection='row' alignItems='center'>
                {applicant?.status === 'SIAP_UNTUK_MENGISI_FORM_PRINSIP' && (
                  <OpenDialogOnElementClick
                    element={Button}
                    elementProps={{
                      startIcon: <i className='tabler-list-check' />,
                      variant: 'contained',
                      color: 'info',
                      children: 'Isi Formulir Prinsip'
                    }}
                    dialog={FormPrinsipDialog}
                    dialogProps={{ data: applicant }}
                  />
                )}
                {applicant?.status === 'SIAP_UNTUK_MENGISI_FORM_SPESIFIKASI' && (
                  <OpenDialogOnElementClick
                    element={Button}
                    elementProps={{
                      startIcon: <i className='tabler-list-check' />,
                      variant: 'contained',
                      color: 'info',
                      children: 'Isi Formulir Spesikasi'
                    }}
                    dialog={FormSpesifikasiDialog}
                    dialogProps={{ data: applicant }}
                  />
                )}
                {applicant?.status === 'SIAP_UNTUK_MENGISI_FORM_PENCAIRAN' && (
                  <OpenDialogOnElementClick
                    element={Button}
                    elementProps={{
                      startIcon: <i className='tabler-list-check' />,
                      variant: 'contained',
                      color: 'info',
                      children: 'Isi Formulir Pencairan'
                    }}
                    dialog={FormPencairanDialog}
                    dialogProps={{ data: applicant }}
                  />
                )}
                {applicant?.status !== 'MENUNGGU_KONFIRMASI_DARI_PENYELIA' &&
                  applicant?.status !== 'SELESAI' &&
                  applicant?.status !== 'DITOLAK' && (
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
              </Stack>
            )
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
          <>
            {/* Survey Section */}
            <Stack
              useFlexGap
              flexDirection='row'
              alignItems='center'
              justifyContent='space-between'
              sx={{ marginBottom: 4 }}
            >
              <Box>
                <Typography fontWeight={700} fontSize={16}>
                  A. Survey
                </Typography>
                <Typography fontSize={14}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Typography>
              </Box>
              {user?.data.role === 'PENYELIA' && (
                <OpenDialogOnElementClick
                  element={IconButton}
                  elementProps={{ children: <i className='tabler-pencil text-[22px] text-textSecondary' /> }}
                  dialog={PemohonBantuan}
                  dialogProps={{ data: applicant }}
                />
              )}
            </Stack>
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
            <Divider sx={{ marginY: 5 }} />

            {/* Principle Section */}
            <Stack
              useFlexGap
              flexDirection='row'
              alignItems='center'
              justifyContent='space-between'
              sx={{ marginBottom: 4 }}
            >
              <Box>
                <Typography fontWeight={700} fontSize={16}>
                  B. Prinsip
                </Typography>
                <Typography fontSize={14}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Typography>
              </Box>
              {user?.data.role === 'PENYELIA' && (
                <OpenDialogOnElementClick
                  element={IconButton}
                  elementProps={{ children: <i className='tabler-pencil text-[22px] text-textSecondary' /> }}
                  dialog={FormPrinsipDialog}
                  dialogProps={{ data: applicant }}
                />
              )}
            </Stack>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <CustomInputViewMode label='No. Dokumen' value={applicant?.document_number} />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInputViewMode
                  label='Tanggal'
                  value={!!applicant?.date ? dayjs(applicant?.date).format('D MMM YYYY') : undefined}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInputViewMode label='Perihal' value={applicant?.regarding} />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInputViewMode label='Penanggung Jawab Dokumen' value={applicant?.coordinator} />
              </Grid>
            </Grid>
            <Divider sx={{ marginY: 5 }} />

            {/* Specification Section */}
            <Stack
              useFlexGap
              flexDirection='row'
              alignItems='center'
              justifyContent='space-between'
              sx={{ marginBottom: 4 }}
            >
              <Box>
                <Typography fontWeight={700} fontSize={16}>
                  C. Spesifikasi
                </Typography>
                <Typography fontSize={14}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Typography>
              </Box>
              {user?.data.role === 'PENYELIA' && (
                <OpenDialogOnElementClick
                  element={IconButton}
                  elementProps={{ children: <i className='tabler-pencil text-[22px] text-textSecondary' /> }}
                  dialog={FormSpesifikasiDialog}
                  dialogProps={{ data: applicant }}
                />
              )}
            </Stack>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <CustomInputViewMode
                  label='Dokumen Penawaran Vendor'
                  value={applicant?.vendor_bid_documents ? 'Ya' : 'Tidak'}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInputViewMode label='SPK Vendor' value={applicant?.vendor_spk ? 'Ya' : 'Tidak'} />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInputViewMode
                  label='Surat Pemberitahuan kepada Penerima PSBI'
                  value={applicant?.notification_letter ? 'Ya' : 'Tidak'}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInputViewMode
                  label='Besaran dengan Nominal'
                  value={!!applicant?.nominal ? `Rp ${applicant?.nominal}` : undefined}
                />
              </Grid>
            </Grid>
            <Divider sx={{ marginY: 5 }} />

            {/* Liquefaction Section */}
            <Stack
              useFlexGap
              flexDirection='row'
              alignItems='center'
              justifyContent='space-between'
              sx={{ marginBottom: 4 }}
            >
              <Box>
                <Typography fontWeight={700} fontSize={16}>
                  D. Pencairan
                </Typography>
                <Typography fontSize={14}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Typography>
              </Box>
              {user?.data.role === 'PENYELIA' && (
                <OpenDialogOnElementClick
                  element={IconButton}
                  elementProps={{ children: <i className='tabler-pencil text-[22px] text-textSecondary' /> }}
                  dialog={FormPencairanDialog}
                  dialogProps={{ data: applicant }}
                />
              )}
            </Stack>
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
                  <CustomInputViewMode
                    label='Surat Pernyataan'
                    value={!!applicant?.statement_letter ? 'Ya' : 'Tidak'}
                  />
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
          </>
        )}
      </CardContent>
    </Card>
  )
}
