// React Imports
import React from 'react'

// MUI Imports
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'

// Third Party Imports
import * as z from 'zod'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'

// Custom Component Imports
import CustomTextField from '@/@core/components/mui/TextField'
import AppReactDatepicker from '@/@menu/styles/AppReactDatepicker'
import FormattedNumberTextField from '../mui/FormattedNumberTextField'
import Icon from '@core/components/icon'

// Type Imports
import { ApplicantFormPrinsipDataType, PsbiClassificationEnum, PsbiProposedFundEnum } from '@/types/applicantTypes'

// Config Imports
import { psbiClassificationOptions, psbiProposedFundOptions } from '@/configs/applicantConfig'

export const defaultValuesFormPrinsip = {
  principle_memo_number: '',
  principle_memo_regard: '',
  principle_memo_date: null,
  principle_writed_by: '',
  principle_prepared_by: '',
  principle_checked_by: '',
  principle_supported_by: '',
  principle_approved_by: '',
  psbi_classification: PsbiClassificationEnum.PEP,
  proposed_fund: PsbiProposedFundEnum.DANA,
  proposed_fund_item: [],
  proposed_fund_construction: [],
  proposed_fund_nominal: 0
} as ApplicantFormPrinsipDataType

export const formSchemaPrinsip = z.object({
  principle_memo_number: z.string().optional(),
  principle_memo_date: z.coerce.date().optional(),
  principle_memo_regard: z.string().optional(),
  principle_writed_by: z.string().optional(),
  principle_prepared_by: z.string().optional(),
  principle_checked_by: z.string().optional(),
  principle_supported_by: z.string().optional(),
  principle_approved_by: z.string().optional(),
  psbi_classification: z.nativeEnum(PsbiClassificationEnum).optional(),
  proposed_fund: z.nativeEnum(PsbiProposedFundEnum).optional(),
  proposed_fund_item: z
    .array(
      z.object({
        item_name: z.string().optional(),
        item_quantity: z.coerce.number().min(1).optional()
      })
    )
    .optional(),
  proposed_fund_construction: z
    .array(
      z.object({
        service_name: z.string().optional()
      })
    )
    .optional(),
  proposed_fund_nominal: z.coerce.number().min(0).optional()
})

export default function CreateOrEditFormPrinsip({ isLoading }: { isLoading: boolean }) {
  // ** Hooks
  const formHook = useFormContext<ApplicantFormPrinsipDataType>()
  const {
    fields: fundItemFields,
    append: appendFundItem,
    remove: removeFundItem,
    replace: replaceFundItem
  } = useFieldArray({
    name: 'proposed_fund_item'
  })
  const {
    fields: fundConstructionFields,
    append: appendFundConstruction,
    remove: removeFundConstruction,
    replace: replaceFundConstruction
  } = useFieldArray({
    name: 'proposed_fund_construction'
  })

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  } else {
    return (
      <>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography fontWeight={600} fontSize={16}>
              Memorandum
            </Typography>
          </Grid>
          <Grid item sm={12} md={4}>
            <CustomTextField
              fullWidth
              label='Nomor'
              autoComplete='off'
              placeholder='Masukkan nomor'
              {...formHook.register('principle_memo_number')}
              error={!!formHook.formState.errors.principle_memo_number}
              helperText={formHook.formState.errors.principle_memo_number?.message}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <CustomTextField
              fullWidth
              label='Perihal'
              autoComplete='off'
              placeholder='Masukkan perihal'
              {...formHook.register('principle_memo_regard')}
              error={!!formHook.formState.errors.principle_memo_regard}
              helperText={formHook.formState.errors.principle_memo_regard?.message}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <Controller
              name='principle_memo_date'
              control={formHook.control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => {
                return (
                  <AppReactDatepicker
                    selected={value}
                    showYearDropdown
                    showMonthDropdown
                    onChange={onChange}
                    placeholderText='DD/MM/YYYY'
                    dateFormat={'dd/MM/YYYY'}
                    customInput={
                      <CustomTextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        autoComplete='off'
                        label='Tanggal'
                        error={!!formHook.formState.errors.principle_memo_date}
                        helperText={formHook.formState.errors.principle_memo_date?.message}
                      />
                    }
                  />
                )
              }}
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
          <Grid item sm={12} md={4}>
            <CustomTextField
              fullWidth
              label='Ditulis Oleh'
              autoComplete='off'
              placeholder='Masukkan nama penulis'
              {...formHook.register('principle_writed_by')}
              error={!!formHook.formState.errors.principle_writed_by}
              helperText={formHook.formState.errors.principle_writed_by?.message}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <CustomTextField
              fullWidth
              label='Dipersiapkan Oleh'
              autoComplete='off'
              placeholder='Masukkan nama penyiap'
              {...formHook.register('principle_prepared_by')}
              error={!!formHook.formState.errors.principle_prepared_by}
              helperText={formHook.formState.errors.principle_prepared_by?.message}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <CustomTextField
              fullWidth
              label='Diperiksa Oleh'
              autoComplete='off'
              placeholder='Masukkan nama pemeriksa'
              {...formHook.register('principle_checked_by')}
              error={!!formHook.formState.errors.principle_checked_by}
              helperText={formHook.formState.errors.principle_checked_by?.message}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <CustomTextField
              fullWidth
              label='Didukung Oleh'
              autoComplete='off'
              placeholder='Masukkan nama pendukung'
              {...formHook.register('principle_supported_by')}
              error={!!formHook.formState.errors.principle_supported_by}
              helperText={formHook.formState.errors.principle_supported_by?.message}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <CustomTextField
              fullWidth
              label='Disetujui Oleh'
              autoComplete='off'
              placeholder='Masukkan nama penyetuju'
              {...formHook.register('principle_approved_by')}
              error={!!formHook.formState.errors.principle_approved_by}
              helperText={formHook.formState.errors.principle_approved_by?.message}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 5 }} />

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography fontWeight={600} fontSize={16}>
              Bantuan
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <Controller
              name='psbi_classification'
              control={formHook.control}
              render={({ field }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Klasifikasi PSBI'
                  {...field}
                  error={!!formHook.formState.errors.psbi_classification}
                  helperText={formHook.formState.errors.psbi_classification?.message}
                >
                  {psbiClassificationOptions.map(item => (
                    <MenuItem value={item.value}>{item.label}</MenuItem>
                  ))}
                </CustomTextField>
              )}
            />
          </Grid>
          <Grid item sm={12} md={6}>
            <div>
              <FormLabel sx={{ color: 'var(--mui-palette-text-primary)', fontSize: 13 }}>Usulan Bantuan</FormLabel>
              <Controller
                name='proposed_fund'
                control={formHook.control}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    onChange={e => {
                      const selectedValue = e.target.value as PsbiProposedFundEnum

                      if (selectedValue === PsbiProposedFundEnum.BARANG) {
                        replaceFundConstruction([])
                      } else if (selectedValue === PsbiProposedFundEnum.KONSTRUKSI) {
                        replaceFundItem([])
                      } else {
                        replaceFundItem([])
                        replaceFundConstruction([])
                      }

                      field.onChange(e)
                    }}
                  >
                    <Grid container columnSpacing={6}>
                      {psbiProposedFundOptions.map(item => (
                        <Grid item xs={12} md={3}>
                          <FormControlLabel value={item.value} control={<Radio />} label={item.label} />
                        </Grid>
                      ))}
                    </Grid>
                  </RadioGroup>
                )}
              />
            </div>
          </Grid>
          {formHook.watch('proposed_fund') === PsbiProposedFundEnum.BARANG && (
            <Grid item sm={12}>
              <Grid container spacing={4}>
                {fundItemFields.map((field, index) => (
                  <React.Fragment key={field.id}>
                    <Grid item sm={6}>
                      <Controller
                        name={`proposed_fund_item.${index}.item_name`}
                        control={formHook.control}
                        render={({ field, fieldState }) => (
                          <CustomTextField
                            fullWidth
                            label={`Nama Barang ${index + 1}`}
                            placeholder={`Masukkan nama barang ${index + 1}`}
                            {...field}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item sm={5}>
                      <FormattedNumberTextField
                        hookFormName={`proposed_fund_item.${index}.item_quantity`}
                        control={formHook.control}
                        textFieldProps={{
                          label: `Jumlah Barang ${index + 1}`,
                          placeholder: `123.456`
                        }}
                      />
                    </Grid>
                    <Grid item sm={1} alignSelf='self-end'>
                      <IconButton color='error' onClick={() => removeFundItem(index)} aria-label='remove item'>
                        <Icon icon='tabler:trash' />
                      </IconButton>
                    </Grid>
                  </React.Fragment>
                ))}
                <Grid item sm={12}>
                  <Button
                    fullWidth
                    variant='outlined'
                    size='medium'
                    color='primary'
                    startIcon={<Icon icon='tabler:plus' />}
                    onClick={() => appendFundItem({ item_name: '', item_quantity: 0 })}
                  >
                    Tambah Barang
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
          {formHook.watch('proposed_fund') === PsbiProposedFundEnum.KONSTRUKSI && (
            <Grid item sm={12}>
              <Grid container spacing={4}>
                {fundConstructionFields.map((field, index) => (
                  <React.Fragment key={field.id}>
                    <Grid item sm={11}>
                      <Controller
                        name={`proposed_fund_construction.${index}.service_name`}
                        control={formHook.control}
                        render={({ field, fieldState }) => (
                          <CustomTextField
                            fullWidth
                            label={`Nama Jasa ${index + 1}`}
                            placeholder={`Masukkan nama jasa ${index + 1}`}
                            {...field}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item sm={1} alignSelf='self-end'>
                      <IconButton color='error' onClick={() => removeFundConstruction(index)} aria-label='remove item'>
                        <Icon icon='tabler:trash' />
                      </IconButton>
                    </Grid>
                  </React.Fragment>
                ))}
                <Grid item sm={12}>
                  <Button
                    fullWidth
                    variant='outlined'
                    size='medium'
                    color='primary'
                    startIcon={<Icon icon='tabler:plus' />}
                    onClick={() => appendFundConstruction({ service_name: '' })}
                  >
                    Tambah Jasa
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
          <Grid item sm={12}>
            <FormattedNumberTextField
              hookFormName='proposed_fund_nominal'
              control={formHook.control}
              formatedOptions={{ prefix: 'Rp' }}
              textFieldProps={{
                label: 'Usulan Besaran',
                placeholder: '123.456'
              }}
            />
          </Grid>
        </Grid>
      </>
    )
  }
}
