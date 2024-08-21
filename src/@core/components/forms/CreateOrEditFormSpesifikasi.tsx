// React Imports
import React from 'react'

// MUI Imports
import { Box, Button, CircularProgress, Divider, Grid, IconButton, Typography } from '@mui/material'

// Third Party Imports
import * as z from 'zod'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'

// Custom Component Imports
import CustomTextField from '@/@core/components/mui/TextField'
import AppReactDatepicker from '@/@menu/styles/AppReactDatepicker'
import FormattedNumberTextField from '../mui/FormattedNumberTextField'
import Icon from '@core/components/icon'

// Type Imports
import { ApplicantFormSpesifikasiDataType } from '@/types/applicantTypes'

export const defaultValuesFormSpesifikasi = {
  specification_memo_number: '',
  specification_memo_regard: '',
  specification_memo_date: null,
  specification_writed_by: '',
  specification_prepared_by: '',
  specification_checked_by: '',
  specification_supported_by: '',
  specification_approved_by: '',
  vendor: [],
  spk: [],
  notification_letter_number: '',
  notification_letter_date: null,
  notification_letter_signatory: '',
  fund_nominal: 0
} as ApplicantFormSpesifikasiDataType

export const formSchemaSpesifikasi = z.object({
  specification_memo_number: z.string().optional(),
  specification_memo_date: z.coerce.date().optional(),
  specification_memo_regard: z.string().optional(),
  specification_writed_by: z.string().optional(),
  specification_prepared_by: z.string().optional(),
  specification_checked_by: z.string().optional(),
  specification_supported_by: z.string().optional(),
  specification_approved_by: z.string().optional(),
  vendor: z
    .array(
      z.object({
        vendor_name: z.string().optional(),
        letter_number: z.string().optional(),
        letter_date: z.coerce.date().optional()
      })
    )
    .optional(),
  spk: z
    .array(
      z.object({
        choosed_vendor: z.string().optional(),
        spk_number: z.string().optional(),
        date: z.coerce.date().optional(),
        approved_amount: z.coerce.number().min(0).optional(),
        address: z.string().optional(),
        phone_number_vendor: z.string().optional()
      })
    )
    .optional(),
  notification_letter_number: z.string().optional(),
  notification_letter_date: z.coerce.date().optional(),
  notification_letter_signatory: z.string().optional(),
  fund_nominal: z.coerce.number().min(0).optional()
})

export default function CreateOrEditFormSpesifikasi({ isLoading }: { isLoading: boolean }) {
  // ** Hooks
  const formHook = useFormContext<ApplicantFormSpesifikasiDataType>()
  const {
    fields: vendorFields,
    append: appendVendor,
    remove: removeVendor
  } = useFieldArray({
    name: 'vendor'
  })
  const {
    fields: spkFields,
    append: appendSpk,
    remove: removeSpk
  } = useFieldArray({
    name: 'spk'
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
              {...formHook.register('specification_memo_number')}
              error={!!formHook.formState.errors.specification_memo_number}
              helperText={formHook.formState.errors.specification_memo_number?.message}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <CustomTextField
              fullWidth
              label='Perihal'
              autoComplete='off'
              placeholder='Masukkan perihal'
              {...formHook.register('specification_memo_regard')}
              error={!!formHook.formState.errors.specification_memo_regard}
              helperText={formHook.formState.errors.specification_memo_regard?.message}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <Controller
              name='specification_memo_date'
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
                        error={!!formHook.formState.errors.specification_memo_date}
                        helperText={formHook.formState.errors.specification_memo_date?.message}
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
              {...formHook.register('specification_writed_by')}
              error={!!formHook.formState.errors.specification_writed_by}
              helperText={formHook.formState.errors.specification_writed_by?.message}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <CustomTextField
              fullWidth
              label='Dipersiapkan Oleh'
              autoComplete='off'
              placeholder='Masukkan nama penyiap'
              {...formHook.register('specification_prepared_by')}
              error={!!formHook.formState.errors.specification_prepared_by}
              helperText={formHook.formState.errors.specification_prepared_by?.message}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <CustomTextField
              fullWidth
              label='Diperiksa Oleh'
              autoComplete='off'
              placeholder='Masukkan nama pemeriksa'
              {...formHook.register('specification_checked_by')}
              error={!!formHook.formState.errors.specification_checked_by}
              helperText={formHook.formState.errors.specification_checked_by?.message}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <CustomTextField
              fullWidth
              label='Didukung Oleh'
              autoComplete='off'
              placeholder='Masukkan nama pendukung'
              {...formHook.register('specification_supported_by')}
              error={!!formHook.formState.errors.specification_supported_by}
              helperText={formHook.formState.errors.specification_supported_by?.message}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <CustomTextField
              fullWidth
              label='Disetujui Oleh'
              autoComplete='off'
              placeholder='Masukkan nama penyetuju'
              {...formHook.register('specification_approved_by')}
              error={!!formHook.formState.errors.specification_approved_by}
              helperText={formHook.formState.errors.specification_approved_by?.message}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 5 }} />

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography fontWeight={600} fontSize={16}>
              Surat Penawaran Vendor
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Grid container spacing={4}>
              {vendorFields.map((field, index) => (
                <React.Fragment key={field.id}>
                  <Grid item sm={4}>
                    <Controller
                      name={`vendor.${index}.vendor_name`}
                      control={formHook.control}
                      render={({ field, fieldState }) => (
                        <CustomTextField
                          fullWidth
                          label={`Nama Vendor ${index + 1}`}
                          placeholder={`Masukkan nama vendor ${index + 1}`}
                          {...field}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <Controller
                      name={`vendor.${index}.letter_number`}
                      control={formHook.control}
                      render={({ field, fieldState }) => (
                        <CustomTextField
                          fullWidth
                          label={`Nomor Surat`}
                          placeholder={`Masukkan nomor surat`}
                          {...field}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item sm={3}>
                    <Controller
                      name={`vendor.${index}.letter_date`}
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
                                error={!!formHook.formState.errors.specification_memo_date}
                                helperText={formHook.formState.errors.specification_memo_date?.message}
                              />
                            }
                          />
                        )
                      }}
                    />
                  </Grid>
                  <Grid item sm={1} alignSelf='self-end'>
                    <IconButton color='error' onClick={() => removeVendor(index)} aria-label='remove item'>
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
                  onClick={() => appendVendor({ vendor_name: '', letter_number: '', letter_date: null })}
                >
                  Tambah Vendor
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 5 }} />

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography fontWeight={600} fontSize={16}>
              SPK
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Grid container spacing={4}>
              {spkFields.map((field, index) => (
                <React.Fragment key={field.id}>
                  <Grid item sm={4}>
                    <Controller
                      name={`spk.${index}.choosed_vendor`}
                      control={formHook.control}
                      render={({ field, fieldState }) => (
                        <CustomTextField
                          fullWidth
                          label={`Nama Vendor Terpilih ${index + 1}`}
                          placeholder={`Masukkan nama vendor terpilih ${index + 1}`}
                          {...field}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <Controller
                      name={`spk.${index}.spk_number`}
                      control={formHook.control}
                      render={({ field, fieldState }) => (
                        <CustomTextField
                          fullWidth
                          label={`Nomor Surat`}
                          placeholder={`Masukkan nomor surat`}
                          {...field}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item sm={3}>
                    <Controller
                      name={`spk.${index}.date`}
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
                                error={!!formHook.formState.errors.specification_memo_date}
                                helperText={formHook.formState.errors.specification_memo_date?.message}
                              />
                            }
                          />
                        )
                      }}
                    />
                  </Grid>
                  <Grid item sm={1} alignSelf='self-end'>
                    <IconButton color='error' onClick={() => removeSpk(index)} aria-label='remove item'>
                      <Icon icon='tabler:trash' />
                    </IconButton>
                  </Grid>
                  <Grid item sm={4}>
                    <FormattedNumberTextField
                      hookFormName={`spk.${index}.approved_amount`}
                      control={formHook.control}
                      formatedOptions={{ prefix: 'Rp' }}
                      textFieldProps={{
                        label: 'Nominal Disetujui',
                        placeholder: '123.456'
                      }}
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <Controller
                      name={`spk.${index}.address`}
                      control={formHook.control}
                      render={({ field, fieldState }) => (
                        <CustomTextField
                          fullWidth
                          label={`Alamat Vendor`}
                          placeholder={`Masukkan Alamat vendor`}
                          {...field}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <Controller
                      name={`spk.${index}.phone_number_vendor`}
                      control={formHook.control}
                      render={({ field, fieldState }) => (
                        <CustomTextField
                          fullWidth
                          label={`Nomor HP`}
                          placeholder={`Masukkan nomor HP vendor`}
                          {...field}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  </Grid>
                  {index !== spkFields.length - 1 && (
                    <Grid item xs={12}>
                      <Divider sx={{ m: '0 !important' }} />
                    </Grid>
                  )}
                </React.Fragment>
              ))}
              <Grid item sm={12}>
                <Button
                  fullWidth
                  variant='outlined'
                  size='medium'
                  color='primary'
                  startIcon={<Icon icon='tabler:plus' />}
                  onClick={() =>
                    appendSpk({
                      choosed_vendor: '',
                      spk_number: '',
                      date: null,
                      approved_amount: 0,
                      address: '',
                      phone_number_vendor: ''
                    })
                  }
                >
                  Tambah SPK
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 5 }} />

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography fontWeight={600} fontSize={16}>
              Bantuan
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <FormattedNumberTextField
              hookFormName={`fund_nominal`}
              control={formHook.control}
              formatedOptions={{ prefix: 'Rp' }}
              textFieldProps={{
                label: 'Besaran Bantuan',
                placeholder: '123.456'
              }}
            />
          </Grid>
        </Grid>
      </>
    )
  }
}
