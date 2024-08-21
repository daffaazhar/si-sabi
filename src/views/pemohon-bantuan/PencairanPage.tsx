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
                  <Button variant='contained' color='secondary' href={`/pemohon-bantuan/${id}/form-pencairan`}>
                    Isi Form Pencairan
                  </Button>
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
              {user?.data.role === 'PENYELIA' && ['PENCAIRAN', 'PERTANGGUNGJAWABAN'].includes(applicant?.stage) && (
                <Button variant='contained' color='secondary' href={`/pemohon-bantuan/${id}/form-pencairan`}>
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
        ) : !['PENCAIRAN', 'PERTANGGUNGJAWABAN'].includes(applicant?.stage) ? (
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
          <>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography fontWeight={600} fontSize={16}>
                  Memorandum
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode label='Nomor' value={applicant?.liquefaction_memo_number} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode label='Perihal' value={applicant?.liquefaction_memo_regard} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode
                  label='Tanggal'
                  value={
                    !!applicant?.liquefaction_memo_date
                      ? dayjs(applicant?.liquefaction_memo_date).format('D MMM YYYY')
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
                <CustomInputViewMode label='Ditulis Oleh' value={applicant?.liquefaction_writed_by} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode label='Dipersiapkan Oleh' value={applicant?.liquefaction_prepared_by} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode label='Diperiksa Oleh' value={applicant?.liquefaction_checked_by} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode label='Didukung Oleh' value={applicant?.liquefaction_supported_by} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode label='Disetujui Oleh' value={applicant?.liquefaction_approved_by} />
              </Grid>
            </Grid>

            <Divider sx={{ marginY: 5 }} />

            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography fontWeight={600} fontSize={16}>
                  LD BI ERP
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode label='Nomor' value={applicant?.ld_bi_erp_number} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode label='Perihal' value={applicant?.ld_bi_erp_regard} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode
                  label='Tanggal'
                  value={
                    !!applicant?.ld_bi_erp_date ? dayjs(applicant?.ld_bi_erp_date).format('D MMM YYYY') : undefined
                  }
                />
              </Grid>
            </Grid>

            <Divider sx={{ marginY: 5 }} />

            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography fontWeight={600} fontSize={16}>
                  Rekap Bantuan PSBI
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode label='Nomor' value={applicant?.fund_recap_number} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode label='Perihal' value={applicant?.fund_recap_regard} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode
                  label='Tanggal'
                  value={
                    !!applicant?.fund_recap_date ? dayjs(applicant?.fund_recap_date).format('D MMM YYYY') : undefined
                  }
                />
              </Grid>
            </Grid>

            <Divider sx={{ marginY: 5 }} />

            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography fontWeight={600} fontSize={16}>
                  Kelengkapan Berkas Pembayaran
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  label='Invoice'
                  labelPlacement='end'
                  control={<Checkbox value={applicant?.invoice} checked={applicant?.invoice} />}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  label='Surat Pernyataan Non-PKP/Faktur Pajak'
                  labelPlacement='end'
                  control={<Checkbox value={applicant?.non_pkp_tax_invoice} checked={applicant?.non_pkp_tax_invoice} />}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  label='Surat Penunjukan Rekening'
                  labelPlacement='end'
                  control={
                    <Checkbox
                      value={applicant?.account_appointment_letter}
                      checked={applicant?.account_appointment_letter}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  label='Foto Buku Tabungan'
                  labelPlacement='end'
                  control={<Checkbox value={applicant?.saving_book} checked={applicant?.saving_book} />}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  label='NPWP Penunjukan Rekening'
                  labelPlacement='end'
                  control={<Checkbox value={applicant?.npwp} checked={applicant?.npwp} />}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  label='KTP'
                  labelPlacement='end'
                  control={<Checkbox value={applicant?.ktp} checked={applicant?.ktp} />}
                />
              </Grid>
            </Grid>
          </>
        )}
      </CardContent>
    </Card>
  )
}
