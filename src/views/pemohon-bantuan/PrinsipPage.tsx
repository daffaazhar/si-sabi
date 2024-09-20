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
import dayjs from 'dayjs'

// Hook Imports
import { useMe } from '@/hooks/auth/useMe'
import { useFetchDetailApplicant } from '@/hooks/applicant/useFetchDetailApplicant'
import { useApproveApplicant } from '@/hooks/applicant/useApproveApplicant'
import { useRejectApplicant } from '@/hooks/applicant/useRejectApplicant'
import { useSubmitApplicantToSupervisor } from '@/hooks/applicant/useSubmitApplicantToSupervisor'

// Custom Component Imports
import OpenDialogOnElementClick from '@/@core/components/dialogs/OpenDialogOnElementClick'
import CustomInputViewMode from '@/@menu/components/CustomInputViewMode'
import React from 'react'

export default function PrinsipPage({ id }: { id: string }) {
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
        title={`Informasi Detail Tahap Prinsip`}
        subheader='Informasi Detail Pemohon Bantuan pada Tahap Prinsip'
        action={
          isApplicantFetching || isApplicantPending ? (
            <Stack spacing={2} useFlexGap flexDirection='row' alignItems='center'>
              <Skeleton animation='wave' height={50} width={100} />
              <Skeleton animation='wave' height={50} width={100} />
            </Stack>
          ) : user?.data.role === 'PENYELIA' &&
            applicant?.stage === 'PRINSIP' &&
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
                applicant?.stage === 'PRINSIP' &&
                applicant?.status === 'SIAP_UNTUK_MENGISI_FORM_PRINSIP' && (
                  <Button variant='contained' color='secondary' href={`/pemohon-bantuan/${id}/form-prinsip`}>
                    Isi Form Prinsip
                  </Button>
                )}
              {user?.data.role === 'STAFF' &&
                applicant?.stage === 'PRINSIP' &&
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
              {user?.data.role === 'PENYELIA' &&
                ['PRINSIP', 'SPESIFIKASI', 'PENCAIRAN', 'PERTANGGUNGJAWABAN'].includes(applicant?.stage) && (
                  <Button variant='contained' color='secondary' href={`/pemohon-bantuan/${id}/form-prinsip`}>
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
        ) : !['PRINSIP', 'SPESIFIKASI', 'PENCAIRAN', 'PERTANGGUNGJAWABAN'].includes(applicant?.stage) ? (
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
                Hal ini dikarenakan data pemohon bantuan ini belum mencapai tahap Prinsip
              </Typography>
            </Box>
          </Stack>
        ) : (
          <>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography fontWeight={600} fontSize={16}>
                  Memorandum
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode label='Nomor' value={applicant?.principle_memo_number} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode label='Perihal' value={applicant?.principle_memo_regard} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode
                  label='Tanggal'
                  value={
                    !!applicant?.principle_memo_date
                      ? dayjs(applicant?.principle_memo_date).format('D MMM YYYY')
                      : undefined
                  }
                />
              </Grid>
            </Grid>

            <Divider sx={{ marginY: 5 }} />

            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography fontWeight={600} fontSize={16}>
                  Penanggungjawab
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode label='Ditulis Oleh' value={applicant?.principle_writed_by} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode label='Dipersiapkan Oleh' value={applicant?.principle_prepared_by} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode label='Diperiksa Oleh' value={applicant?.principle_checked_by} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode label='Didukung Oleh' value={applicant?.principle_supported_by} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode label='Disetujui Oleh' value={applicant?.principle_approved_by} />
              </Grid>
            </Grid>

            <Divider sx={{ marginY: 5 }} />

            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography fontWeight={600} fontSize={16}>
                  Bantuan
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInputViewMode label='Klasifikasi PSBI' value={applicant?.psbi_classification} />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInputViewMode label='Usulan Bantuan' value={applicant?.proposed_fund} />
              </Grid>
              {applicant?.proposed_fund_item.map((item: any, index: number) => (
                <React.Fragment key={`item-${index}`}>
                  <Grid item xs={12} md={6}>
                    <CustomInputViewMode label={`Nama Barang ${index + 1}`} value={item.item_name} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomInputViewMode label={`Jumlah Barang ${index + 1}`} value={item.item_quantity.toString()} />
                  </Grid>
                </React.Fragment>
              ))}
              {applicant?.proposed_fund_construction.map((item: any, index: number) => (
                <React.Fragment key={`item-${index}`}>
                  <Grid item xs={12} md={6} key={`construction-${index}`}>
                    <CustomInputViewMode label={`Nama Jasa ${index + 1}`} value={item.service_name} />
                  </Grid>
                  <Grid item xs={12} md={6} key={`construction-${index}`}>
                    <CustomInputViewMode label={`Volume ${index + 1}`} value={item.volume.toString()} />
                  </Grid>
                </React.Fragment>
              ))}
              <Grid item xs={12} md={6}>
                <CustomInputViewMode
                  label='Usulan Besaran'
                  value={
                    !!applicant?.proposed_fund_nominal
                      ? `Rp ${applicant?.proposed_fund_nominal?.toString()}`
                      : undefined
                  }
                />
              </Grid>
            </Grid>
          </>
        )}
      </CardContent>
    </Card>
  )
}
