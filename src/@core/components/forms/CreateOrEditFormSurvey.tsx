// MUI Imports
import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'

// Third Party Imports
import * as z from 'zod'
import { Controller, useFormContext } from 'react-hook-form'

// Custom Component Imports
import CustomTextField from '@/@core/components/mui/TextField'
import FormattedNumberTextField from '@/@core/components/mui/FormattedNumberTextField'

// Type Imports
import {
  ApplicantFormSurveyDataType,
  ApplicantInstitutionTypeEnum,
  ApplicantOwnershipStatusEnum,
  ApplicantPsbiScopeEnum,
  ApplicantSourceOfFundEnum
} from '@/types/applicantTypes'

// Config Imports
import {
  applicantInstitutionType,
  applicantOwnershipStatusOptions,
  applicantPsbiScopeOptions,
  applicantSourceOfFundOptions
} from '@/configs/applicantConfig'

export const defaultValuesFormSurvey = {
  name: '',
  activity_name: '',
  province: '',
  city: '',
  subdistrict: '',
  village: '',
  address: '',
  contact: '',
  institution_type: [],
  other_institution_education_type: '',
  other_institution_religion_type: '',
  other_institution_type: '',
  year_founded: 0,
  ownership_status: ApplicantOwnershipStatusEnum.BADAN_USAHA,
  have_committee: false,
  carried_out_activities: '',
  number_of_members: 0,
  number_of_committee: 0,
  source_of_fund: 'IURAN',
  other_source_of_fund: '',
  activity_goals: '',
  number_of_beneficiaries: 0,
  required_funds: 0,
  psbi_scope: []
} as ApplicantFormSurveyDataType

export const formSchemaSurvey = z
  .object({
    name: z.string().min(1, { message: 'Nama lembaga/pemohon harus diisi' }),
    activity_name: z.string().min(1, { message: 'Nama kegiatan harus diisi' }),
    province: z.string().min(1, { message: 'Provinsi harus diisi' }),
    city: z.string().min(1, { message: 'Kota harus diisi' }),
    subdistrict: z.string().min(1, { message: 'Kecamatan harus diisi' }),
    village: z.string().min(1, { message: 'Desa harus diisi' }),
    address: z.string().min(1, { message: 'Alamat harus diisi' }),
    contact: z.string().min(1, { message: 'Kontak harus diisi' }),
    institution_type: z
      .array(z.nativeEnum(ApplicantInstitutionTypeEnum))
      .min(1, { message: 'Jenis lembaga harus dipilih' }),
    other_institution_education_type: z.string().optional(),
    other_institution_religion_type: z.string().optional(),
    other_institution_type: z.string().optional(),
    psbi_scope: z.array(z.nativeEnum(ApplicantPsbiScopeEnum)).min(1, { message: 'Ruang lingkup harus dipilih' }),
    year_founded: z.coerce
      .number()
      .min(1900, { message: 'Tahun berdiri tidak valid' })
      .max(new Date().getFullYear(), { message: 'Tahun berdiri tidak valid' }),
    ownership_status: z.nativeEnum(ApplicantOwnershipStatusEnum),
    have_committee: z.boolean(),
    carried_out_activities: z.string().min(1, { message: 'Kegiatan yang dilaksanakan harus diisi' }),
    number_of_members: z.coerce.number().min(0, { message: 'Jumlah anggota tidak valid' }),
    number_of_committee: z.coerce.number().min(0, { message: 'Jumlah panitia tidak valid' }),
    source_of_fund: z.nativeEnum(ApplicantSourceOfFundEnum),
    other_source_of_fund: z.string().optional(),
    activity_goals: z.string().min(1, { message: 'Tujuan kegiatan harus diisi' }),
    number_of_beneficiaries: z.coerce.number().min(0, { message: 'Jumlah penerima manfaat tidak valid' }),
    required_funds: z.coerce.number().min(0, { message: 'Jumlah dana yang diperlukan tidak valid' })
  })
  .refine(
    data => {
      if (data.institution_type.includes(ApplicantInstitutionTypeEnum.LAINNYA_PENDIDIKAN)) {
        return !!data.other_institution_education_type
      }
      return true
    },
    {
      message: 'Jenis lembaga harus diisi',
      path: ['other_institution_education_type']
    }
  )
  .refine(
    data => {
      if (data.institution_type.includes(ApplicantInstitutionTypeEnum.LAINNYA_KEAGAMAAN)) {
        return !!data.other_institution_religion_type
      }
      return true
    },
    {
      message: 'Jenis lembaga harus diisi',
      path: ['other.other_institution_religion_type']
    }
  )
  .refine(
    data => {
      if (data.institution_type.includes(ApplicantInstitutionTypeEnum.LAINNYA_LEMBAGA)) {
        return !!data.other_institution_type
      }
      return true
    },
    {
      message: 'Jenis lembaga harus diisi',
      path: ['other.other_institution_type']
    }
  )
  .refine(
    data => {
      if (data.source_of_fund.includes(ApplicantSourceOfFundEnum.LAINNYA)) {
        return !!data.other_source_of_fund
      }
      return true
    },
    {
      message: 'Sumber dana lembaga harus diisi',
      path: ['other.other_source_of_fund']
    }
  )

export default function CreateOrEditFormSurvey() {
  const formHook = useFormContext<ApplicantFormSurveyDataType>()

  return (
    <>
      <Grid container spacing={4}>
        <Grid item sm={12} md={6}>
          <CustomTextField
            fullWidth
            label='Nama Lembaga/Pemohon'
            autoComplete='off'
            placeholder='Masukkan nama pemohon'
            {...formHook.register('name')}
            error={!!formHook.formState.errors.name}
            helperText={formHook.formState.errors.name?.message}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <CustomTextField
            fullWidth
            label='Kegiatan Permohonan'
            autoComplete='off'
            placeholder='Masukkan kegiatan permohonan'
            {...formHook.register('activity_name')}
            error={!!formHook.formState.errors.activity_name}
            helperText={formHook.formState.errors.activity_name?.message}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <CustomTextField
            fullWidth
            label='Provinsi'
            autoComplete='off'
            placeholder='Masukkan provinsi'
            {...formHook.register('province')}
            error={!!formHook.formState.errors.province}
            helperText={formHook.formState.errors.province?.message}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <CustomTextField
            fullWidth
            label='Kabupaten/Kota'
            autoComplete='off'
            placeholder='Masukkan kabupaten/kota'
            {...formHook.register('city')}
            error={!!formHook.formState.errors.city}
            helperText={formHook.formState.errors.city?.message}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <CustomTextField
            fullWidth
            label='Kecamatan'
            autoComplete='off'
            placeholder='Masukkan kecamatan'
            {...formHook.register('subdistrict')}
            error={!!formHook.formState.errors.subdistrict}
            helperText={formHook.formState.errors.subdistrict?.message}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <CustomTextField
            fullWidth
            label='Desa/Kelurahan'
            autoComplete='off'
            placeholder='Masukkan desa/kelurahan'
            {...formHook.register('village')}
            error={!!formHook.formState.errors.village}
            helperText={formHook.formState.errors.village?.message}
          />
        </Grid>
        <Grid item sm={12}>
          <CustomTextField
            fullWidth
            multiline
            minRows={2}
            label='Alamat'
            autoComplete='off'
            placeholder='Masukkan alamat'
            {...formHook.register('address')}
            error={!!formHook.formState.errors.address}
            helperText={formHook.formState.errors.address?.message}
          />
        </Grid>
        <Grid item sm={12}>
          <CustomTextField
            fullWidth
            label='Kontak Lembaga Pemohon'
            autoComplete='off'
            placeholder='Masukkan kontak lembaga pemohon'
            {...formHook.register('contact')}
            error={!!formHook.formState.errors.contact}
            helperText={formHook.formState.errors.contact?.message}
          />
        </Grid>
        <Grid item sm={12}>
          <div>
            <FormLabel sx={{ color: 'var(--mui-palette-text-primary)', fontSize: 13 }}>Jenis Lembaga</FormLabel>
            <FormGroup sx={{ marginTop: 2 }}>
              <Grid container>
                <Grid item xs={2}>
                  <Typography sx={{ color: 'var(--mui-palette-text-primary)', fontSize: 13 }}>Pendidikan</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Grid container>
                    {applicantInstitutionType
                      .filter(x => x.category === 'PENDIDIKAN')
                      .map(item => (
                        <Grid key={item.value} item xs={4}>
                          <Controller
                            key={item.value}
                            name='institution_type'
                            control={formHook.control}
                            render={({ field }) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    value={item.value}
                                    checked={field.value.includes(item.value)}
                                    onChange={e => {
                                      const checked = e.target.checked
                                      field.onChange(
                                        checked
                                          ? [...field.value, item.value]
                                          : field.value.filter(v => v !== item.value)
                                      )
                                    }}
                                  />
                                }
                                label={
                                  item.value !== ApplicantInstitutionTypeEnum.LAINNYA_PENDIDIKAN ? (
                                    item.label
                                  ) : (
                                    <CustomTextField
                                      fullWidth
                                      autoComplete='off'
                                      disabled={!field.value.includes(ApplicantInstitutionTypeEnum.LAINNYA_PENDIDIKAN)}
                                      placeholder='Lainnya'
                                      {...formHook.register('other_institution_education_type')}
                                      error={!!formHook.formState.errors.other_institution_education_type}
                                      helperText={formHook.formState.errors.other_institution_education_type?.message}
                                    />
                                  )
                                }
                              />
                            )}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2}>
                  <Typography sx={{ color: 'var(--mui-palette-text-primary)', fontSize: 13 }}>Keagamaan</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Grid container>
                    {applicantInstitutionType
                      .filter(x => x.category === 'KEAGAMAAN')
                      .map(item => (
                        <Grid key={item.value} item xs={4}>
                          <Controller
                            name='institution_type'
                            control={formHook.control}
                            render={({ field }) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    value={item.value}
                                    checked={field.value.includes(item.value)}
                                    onChange={e => {
                                      const checked = e.target.checked
                                      field.onChange(
                                        checked
                                          ? [...field.value, item.value]
                                          : field.value.filter(v => v !== item.value)
                                      )
                                    }}
                                  />
                                }
                                label={
                                  item.value !== ApplicantInstitutionTypeEnum.LAINNYA_KEAGAMAAN ? (
                                    item.label
                                  ) : (
                                    <CustomTextField
                                      fullWidth
                                      autoComplete='off'
                                      disabled={!field.value.includes(ApplicantInstitutionTypeEnum.LAINNYA_KEAGAMAAN)}
                                      placeholder='Lainnya'
                                      {...formHook.register('other_institution_religion_type')}
                                      error={!!formHook.formState.errors.other_institution_religion_type}
                                      helperText={formHook.formState.errors.other_institution_religion_type?.message}
                                    />
                                  )
                                }
                              />
                            )}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2}>
                  <Typography sx={{ color: 'var(--mui-palette-text-primary)', fontSize: 13 }}>Lembaga</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Grid container>
                    {applicantInstitutionType
                      .filter(x => x.category === 'LEMBAGA')
                      .map(item => (
                        <Grid key={item.value} item xs={4}>
                          <Controller
                            name='institution_type'
                            control={formHook.control}
                            render={({ field }) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    value={item.value}
                                    checked={field.value.includes(item.value)}
                                    onChange={e => {
                                      const checked = e.target.checked
                                      field.onChange(
                                        checked
                                          ? [...field.value, item.value]
                                          : field.value.filter(v => v !== item.value)
                                      )
                                    }}
                                  />
                                }
                                label={
                                  item.value !== ApplicantInstitutionTypeEnum.LAINNYA_LEMBAGA ? (
                                    item.label
                                  ) : (
                                    <CustomTextField
                                      fullWidth
                                      autoComplete='off'
                                      disabled={!field.value.includes(ApplicantInstitutionTypeEnum.LAINNYA_LEMBAGA)}
                                      placeholder='Lainnya'
                                      {...formHook.register('other_institution_type')}
                                      error={!!formHook.formState.errors.other_institution_type}
                                      helperText={formHook.formState.errors.other_institution_type?.message}
                                    />
                                  )
                                }
                              />
                            )}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </Grid>
              </Grid>
            </FormGroup>
          </div>
          <Typography
            sx={{
              lineHeight: 1.154,
              color: 'var(--mui-palette-error-main)',
              fontSize: '13px'
            }}
          >
            {formHook.formState.errors.institution_type?.message}
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <div>
            <FormLabel sx={{ color: 'var(--mui-palette-text-primary)', fontSize: 13 }}>Ruang Lingkup PSBI</FormLabel>
            <FormGroup>
              <Grid container columnSpacing={6}>
                {applicantPsbiScopeOptions.map(item => (
                  <Grid key={item.value} item xs={12} md={4}>
                    <Controller
                      name='psbi_scope'
                      control={formHook.control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={item.value}
                              checked={field.value.includes(item.value)}
                              onChange={e => {
                                const checked = e.target.checked
                                field.onChange(
                                  checked ? [...field.value, item.value] : field.value.filter(v => v !== item.value)
                                )
                              }}
                            />
                          }
                          label={item.label}
                        />
                      )}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>
            <Typography
              sx={{
                lineHeight: 1.154,
                color: 'var(--mui-palette-error-main)',
                fontSize: '13px'
              }}
            >
              {formHook.formState.errors.psbi_scope?.message}
            </Typography>
          </div>
        </Grid>
      </Grid>

      <Divider sx={{ marginY: 5 }} />

      <Typography fontWeight={600} fontSize={16} marginBottom={3}>
        Gambaran Umum Kelembagaan
      </Typography>
      <Grid container spacing={4}>
        <Grid item sm={12}>
          <CustomTextField
            fullWidth
            label='Tahun Berdirinya Lembaga'
            autoComplete='off'
            placeholder='Masukkan tahun berdirinya lembaga, Mis: 2018'
            {...formHook.register('year_founded')}
            error={!!formHook.formState.errors.year_founded}
            helperText={formHook.formState.errors.year_founded?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <div>
            <FormLabel sx={{ color: 'var(--mui-palette-text-primary)', fontSize: 13 }}>Jenis Kelembagaan</FormLabel>
            <Controller
              name='ownership_status'
              control={formHook.control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <Grid container columnSpacing={6}>
                    {applicantOwnershipStatusOptions.map(item => (
                      <Grid key={item.value} item xs={12} md={3}>
                        <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
                      </Grid>
                    ))}
                  </Grid>
                </RadioGroup>
              )}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <FormLabel sx={{ color: 'var(--mui-palette-text-primary)', fontSize: 13 }}>
              Lembaga Memiliki Kepengurusan/Kepanitiaan
            </FormLabel>
            <Controller
              name='have_committee'
              control={formHook.control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <Grid container columnSpacing={6}>
                    <Grid item xs={12} md={3}>
                      <FormControlLabel value={false} control={<Radio />} label={'Tidak Ada'} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <FormControlLabel value={true} control={<Radio />} label={'Ada'} />
                    </Grid>
                  </Grid>
                </RadioGroup>
              )}
            />
          </div>
        </Grid>
        <Grid item sm={12}>
          <CustomTextField
            fullWidth
            multiline
            minRows={4}
            label='Kegiatan Apa yang Pernah Dilaksanakan oleh Lembaga?'
            autoComplete='off'
            placeholder='Jelaskan kegiatan-kegiatan yang pernah dilaksanakan oleh lembaga disini'
            {...formHook.register('carried_out_activities')}
            error={!!formHook.formState.errors.carried_out_activities}
            helperText={formHook.formState.errors.carried_out_activities?.message}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <FormattedNumberTextField
            hookFormName='number_of_members'
            control={formHook.control}
            formatedOptions={{ suffix: 'Orang' }}
            textFieldProps={{
              label: 'Jumlah Anggota pada Lembaga',
              placeholder: 'Misal: 56'
            }}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <FormattedNumberTextField
            hookFormName='number_of_committee'
            control={formHook.control}
            formatedOptions={{ suffix: 'Orang' }}
            textFieldProps={{
              label: 'Jumlah Pengurus/Panitia pada Lembaga',
              placeholder: 'Misal: 56'
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <div>
            <FormLabel sx={{ color: 'var(--mui-palette-text-primary)', fontSize: 13 }}>Sumber Dana Lembaga</FormLabel>
            <Controller
              name='source_of_fund'
              control={formHook.control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <Grid container columnSpacing={6}>
                    {applicantSourceOfFundOptions.map(item => (
                      <Grid key={item.value} item xs={12} md={3}>
                        <FormControlLabel
                          value={item.value}
                          control={<Radio />}
                          label={
                            item.value !== ApplicantSourceOfFundEnum.LAINNYA ? (
                              item.label
                            ) : (
                              <CustomTextField
                                fullWidth
                                autoComplete='off'
                                disabled={field.value !== ApplicantSourceOfFundEnum.LAINNYA}
                                placeholder='Lainnya'
                                {...formHook.register('other_source_of_fund')}
                                error={!!formHook.formState.errors.other_source_of_fund}
                                helperText={formHook.formState.errors.other_source_of_fund?.message}
                              />
                            )
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                </RadioGroup>
              )}
            />
          </div>
        </Grid>
      </Grid>

      <Divider sx={{ marginY: 5 }} />

      <Typography fontWeight={600} fontSize={16} marginBottom={3}>
        Kegiatan
      </Typography>
      <Grid container spacing={4}>
        <Grid item sm={12}>
          <CustomTextField
            fullWidth
            multiline
            minRows={4}
            label='Tujuan/Manfaat Kegiatan'
            autoComplete='off'
            placeholder='Masukkan tujuan/manfaat kegiatan'
            {...formHook.register('activity_goals')}
            error={!!formHook.formState.errors.activity_goals}
            helperText={formHook.formState.errors.activity_goals?.message}
          />
        </Grid>
        <Grid item sm={12}>
          <FormattedNumberTextField
            hookFormName='number_of_beneficiaries'
            control={formHook.control}
            formatedOptions={{ suffix: 'Orang' }}
            textFieldProps={{
              label: 'Jumlah Penerima Manfaat'
            }}
          />
        </Grid>
        <Grid item sm={12}>
          <FormattedNumberTextField
            hookFormName='required_funds'
            control={formHook.control}
            formatedOptions={{ prefix: 'Rp ' }}
            textFieldProps={{
              label: 'Dana yang Dibutuhkan'
            }}
          />
        </Grid>
      </Grid>
    </>
  )
}
