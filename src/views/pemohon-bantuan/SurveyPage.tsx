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
  Skeleton,
  FormLabel,
  FormGroup,
  Typography,
  FormControlLabel,
  Checkbox
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
import CustomInputViewMode from '@/@menu/components/CustomInputViewMode'

// Type Imports
import { ApplicantInstitutionTypeEnum, ApplicantStatusEnum } from '@/types/applicantTypes'

// Config Imports
import {
  applicantInstitutionType,
  applicantOwnershipStatusOptions,
  applicantPsbiScopeOptions,
  applicantRequestedFundOptions,
  applicantRequiredFundHasBeenObtainedFromOptions,
  applicantSourceOfFundOptions,
  applicantStatusOptions
} from '@/configs/applicantConfig'

export default function SurveyPage({ id }: { id: string }) {
  const { data: user } = useMe()
  const {
    data: applicant,
    isPending: isApplicantPending,
    isFetching: isApplicantFetching
  } = useFetchDetailApplicant(id)
  const { mutate: approve, isPending: isApproving } = useApproveApplicant()
  const { mutate: reject, isPending: isRejecting } = useRejectApplicant()

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
          ) : (
            user?.data.role === 'PENYELIA' &&
            applicant?.status === 'MENUNGGU_KONFIRMASI_DARI_PENYELIA' && (
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
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <CustomInputViewMode label='Kode SI-SABI' value={applicant?.code} />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInputViewMode
                  label='Status'
                  valueComponent={
                    <Chip
                      color={
                        applicant?.status === ApplicantStatusEnum.MENUNGGU_KONFIRMASI_DARI_PENYELIA
                          ? 'warning'
                          : applicant?.status === ApplicantStatusEnum.SIAP_UNTUK_MENGISI_FORM_PENCAIRAN ||
                              applicant?.status === ApplicantStatusEnum.SIAP_UNTUK_MENGISI_FORM_PRINSIP ||
                              applicant?.status === ApplicantStatusEnum.SIAP_UNTUK_MENGISI_FORM_SPESIFIKASI ||
                              applicant?.status === ApplicantStatusEnum.SIAP_UNTUK_MENGISI_FORM_PERTANGGUNGJAWABAN
                            ? 'info'
                            : applicant?.status === ApplicantStatusEnum.DITOLAK
                              ? 'error'
                              : 'primary'
                      }
                      size='small'
                      label={applicantStatusOptions.find(option => option.value === applicant?.status)?.label}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInputViewMode label='Nama Pemohon' value={applicant?.name} />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInputViewMode label='Kegiatan Permohonan' value={applicant?.activity_name} />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInputViewMode label='Provinsi' value={applicant?.province} />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInputViewMode label='Kabupaten/Kota' value={applicant?.city} />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInputViewMode label='Kecamatan' value={applicant?.subdistrict} />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInputViewMode label='Desa/Kelurahan' value={applicant?.village} />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInputViewMode label='Alamat' value={applicant?.address} />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInputViewMode label='Kontak Lembaga Pemohon' value={applicant?.contact} />
              </Grid>
              <Grid item sm={12}>
                <div>
                  <FormLabel sx={{ fontSize: 13 }}>Jenis Lembaga</FormLabel>
                  <FormGroup sx={{ marginTop: 2 }}>
                    <Grid container>
                      <Grid item xs={2}>
                        <Typography sx={{ fontSize: 13 }}>Pendidikan</Typography>
                      </Grid>
                      <Grid item xs={10}>
                        <Grid container>
                          {applicantInstitutionType
                            .filter(x => x.category === 'PENDIDIKAN')
                            .map(item => (
                              <Grid key={item.value} item xs={4}>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      value={item.value}
                                      checked={applicant?.institution_type.includes(item.value)}
                                    />
                                  }
                                  label={
                                    <Typography>
                                      {item.value !== ApplicantInstitutionTypeEnum.LAINNYA_PENDIDIKAN
                                        ? item.label
                                        : applicant?.other_institution_education_type || 'Lainnya'}
                                    </Typography>
                                  }
                                />
                              </Grid>
                            ))}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={2}>
                        <Typography sx={{ fontSize: 13 }}>Keagamaan</Typography>
                      </Grid>
                      <Grid item xs={10}>
                        <Grid container>
                          {applicantInstitutionType
                            .filter(x => x.category === 'KEAGAMAAN')
                            .map(item => (
                              <Grid key={item.value} item xs={4}>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      value={item.value}
                                      checked={applicant?.institution_type.includes(item.value)}
                                    />
                                  }
                                  label={
                                    <Typography>
                                      {item.value !== ApplicantInstitutionTypeEnum.LAINNYA_KEAGAMAAN
                                        ? item.label
                                        : applicant?.other_institution_religion_type || 'Lainnya'}
                                    </Typography>
                                  }
                                />
                              </Grid>
                            ))}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={2}>
                        <Typography sx={{ fontSize: 13 }}>Lembaga</Typography>
                      </Grid>
                      <Grid item xs={10}>
                        <Grid container>
                          {applicantInstitutionType
                            .filter(x => x.category === 'LEMBAGA')
                            .map(item => (
                              <Grid key={item.value} item xs={4}>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      value={item.value}
                                      checked={applicant?.institution_type.includes(item.value)}
                                    />
                                  }
                                  label={
                                    <Typography>
                                      {item.value !== ApplicantInstitutionTypeEnum.LAINNYA_LEMBAGA
                                        ? item.label
                                        : applicant?.other_institution_type || 'Lainnya'}
                                    </Typography>
                                  }
                                />
                              </Grid>
                            ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </FormGroup>
                </div>
              </Grid>
              <Grid item sm={12}>
                <div>
                  <FormLabel sx={{ fontSize: 13 }}>Ruang Lingkup PSBI</FormLabel>
                  <FormGroup>
                    <Grid container columnSpacing={6}>
                      {applicantPsbiScopeOptions.map(item => (
                        <Grid key={item.value} item xs={12} md={4}>
                          <FormControlLabel
                            control={
                              <Checkbox value={item.value} checked={applicant?.psbi_scope.includes(item.value)} />
                            }
                            label={<Typography>{item.label}</Typography>}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </FormGroup>
                </div>
              </Grid>
            </Grid>

            <Divider sx={{ marginY: 5 }} />

            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography fontWeight={600} fontSize={16}>
                  Gambaran Umum Kelembagaan
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode label='Tahun Berdirinya Lembaga' value={applicant?.year_founded.toString()} />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode
                  label='Jenis Kelembagaan'
                  value={
                    applicantOwnershipStatusOptions.find(item => item.value === applicant?.ownership_status)?.label
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode
                  label='Lembaga Memiliki Kepengurusan/Kepanitiaan'
                  value={!!applicant?.have_committee ? 'Ya' : 'Tidak'}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode
                  label='Jumlah Anggota pada Lembaga'
                  value={applicant?.number_of_members.toString()}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode
                  label='Jumlah Pengurus/Panitia pada Lembaga'
                  value={applicant?.number_of_committee.toString()}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomInputViewMode
                  label='Sumber Dana Lembaga'
                  value={applicantSourceOfFundOptions.find(item => item.value === applicant?.source_of_fund)?.label}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomInputViewMode
                  label='Kegiatan Apa yang Pernah Dilaksanakan oleh Lembaga?'
                  value={applicant?.carried_out_activities}
                />
              </Grid>
            </Grid>

            <Divider sx={{ marginY: 5 }} />

            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography fontWeight={600} fontSize={16}>
                  Kegiatan
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <CustomInputViewMode
                  label='Permohonan Bantuan yang Diajukan'
                  value={applicantRequestedFundOptions.find(item => item.value === applicant?.requested_fund)?.label}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomInputViewMode label='Dengan Prioritas' value={applicant?.requested_fund_priority} />
              </Grid>
              <Grid item xs={12}>
                <CustomInputViewMode label='Tujuan/Manfaat Kegiatan' value={applicant?.activity_goals} />
              </Grid>
              <Grid item xs={12}>
                <CustomInputViewMode
                  label='Jumlah Penerima Manfaat'
                  value={`${applicant?.number_of_beneficiaries.toString()} Orang`}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomInputViewMode
                  label='Dana yang Dibutuhkan'
                  value={`Rp ${applicant?.required_funds.toString()}`}
                />
              </Grid>
              <Grid item xs={12}>
                <div>
                  <FormLabel sx={{ fontSize: 13 }}>Sumber Dana untuk Kegiatan Tersebut Telah Diperoleh Dari</FormLabel>
                  <FormGroup>
                    <Grid container columnSpacing={6}>
                      {applicantRequiredFundHasBeenObtainedFromOptions.map(item => (
                        <Grid key={item.value} item xs={12} md={4}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                value={item.value}
                                checked={applicant?.required_funds_has_been_obtained_from.includes(item.value)}
                              />
                            }
                            label={<Typography>{item.label}</Typography>}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </FormGroup>
                </div>
              </Grid>
            </Grid>
          </>
        )}
      </CardContent>
    </Card>
  )
}
