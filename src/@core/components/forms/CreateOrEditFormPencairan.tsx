// React Imports
import React from 'react'

// MUI Imports
import { Box, Checkbox, CircularProgress, Divider, FormControlLabel, Grid, Typography } from '@mui/material'

// Third Party Imports
import * as z from 'zod'
import { Controller, useFormContext } from 'react-hook-form'

// Custom Component Imports
import CustomTextField from '@/@core/components/mui/TextField'
import AppReactDatepicker from '@/@menu/styles/AppReactDatepicker'

// Type Imports
import { ApplicantFormPencairanDataType } from '@/types/applicantTypes'

export const defaultValuesFormPencairan = {
  liquefaction_memo_number: '',
  liquefaction_memo_regard: '',
  liquefaction_memo_date: null,
  liquefaction_writed_by: '',
  liquefaction_prepared_by: '',
  liquefaction_checked_by: '',
  liquefaction_supported_by: '',
  liquefaction_approved_by: '',
  ld_bi_erp_number: '',
  ld_bi_erp_date: null,
  ld_bi_erp_regard: '',
  fund_recap_number: '',
  fund_recap_date: null,
  fund_recap_regard: '',
  invoice: false,
  non_pkp_tax_invoice: false,
  account_appointment_letter: false,
  saving_book: false,
  npwp: false,
  ktp: false
} as ApplicantFormPencairanDataType

export const formSchemaPencairan = z.object({
  liquefaction_memo_number: z.string().optional(),
  liquefaction_memo_date: z.coerce.date().optional(),
  liquefaction_memo_regard: z.string().optional(),
  liquefaction_writed_by: z.string().optional(),
  liquefaction_prepared_by: z.string().optional(),
  liquefaction_checked_by: z.string().optional(),
  liquefaction_supported_by: z.string().optional(),
  liquefaction_approved_by: z.string().optional(),
  ld_bi_erp_number: z.string().optional(),
  ld_bi_erp_date: z.coerce.date().optional(),
  ld_bi_erp_regard: z.string().optional(),
  fund_recap_number: z.string().optional(),
  fund_recap_date: z.coerce.date().optional(),
  fund_recap_regard: z.string().optional(),
  invoice: z.boolean().optional(),
  non_pkp_tax_invoice: z.boolean().optional(),
  account_appointment_letter: z.boolean().optional(),
  saving_book: z.boolean().optional(),
  npwp: z.boolean().optional(),
  ktp: z.boolean().optional()
})

export default function CreateOrEditFormPencairan({ isLoading }: { isLoading: boolean }) {
  // ** Hooks
  const formHook = useFormContext<ApplicantFormPencairanDataType>()

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
              {...formHook.register('liquefaction_memo_number')}
              error={!!formHook.formState.errors.liquefaction_memo_number}
              helperText={formHook.formState.errors.liquefaction_memo_number?.message}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <CustomTextField
              fullWidth
              label='Perihal'
              autoComplete='off'
              placeholder='Masukkan perihal'
              {...formHook.register('liquefaction_memo_regard')}
              error={!!formHook.formState.errors.liquefaction_memo_regard}
              helperText={formHook.formState.errors.liquefaction_memo_regard?.message}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <Controller
              name='liquefaction_memo_date'
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
                        error={!!formHook.formState.errors.liquefaction_memo_date}
                        helperText={formHook.formState.errors.liquefaction_memo_date?.message}
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
              {...formHook.register('liquefaction_writed_by')}
              error={!!formHook.formState.errors.liquefaction_writed_by}
              helperText={formHook.formState.errors.liquefaction_writed_by?.message}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <CustomTextField
              fullWidth
              label='Dipersiapkan Oleh'
              autoComplete='off'
              placeholder='Masukkan nama penyiap'
              {...formHook.register('liquefaction_prepared_by')}
              error={!!formHook.formState.errors.liquefaction_prepared_by}
              helperText={formHook.formState.errors.liquefaction_prepared_by?.message}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <CustomTextField
              fullWidth
              label='Diperiksa Oleh'
              autoComplete='off'
              placeholder='Masukkan nama pemeriksa'
              {...formHook.register('liquefaction_checked_by')}
              error={!!formHook.formState.errors.liquefaction_checked_by}
              helperText={formHook.formState.errors.liquefaction_checked_by?.message}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <CustomTextField
              fullWidth
              label='Didukung Oleh'
              autoComplete='off'
              placeholder='Masukkan nama pendukung'
              {...formHook.register('liquefaction_supported_by')}
              error={!!formHook.formState.errors.liquefaction_supported_by}
              helperText={formHook.formState.errors.liquefaction_supported_by?.message}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <CustomTextField
              fullWidth
              label='Disetujui Oleh'
              autoComplete='off'
              placeholder='Masukkan nama penyetuju'
              {...formHook.register('liquefaction_approved_by')}
              error={!!formHook.formState.errors.liquefaction_approved_by}
              helperText={formHook.formState.errors.liquefaction_approved_by?.message}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 5 }} />

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography fontWeight={600} fontSize={16}>
              LD BI ERP
            </Typography>
          </Grid>
          <Grid item sm={12} md={4}>
            <CustomTextField
              fullWidth
              label='Nomor'
              autoComplete='off'
              placeholder='Masukkan nomor'
              {...formHook.register('ld_bi_erp_number')}
              error={!!formHook.formState.errors.ld_bi_erp_number}
              helperText={formHook.formState.errors.ld_bi_erp_number?.message}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <CustomTextField
              fullWidth
              label='Perihal'
              autoComplete='off'
              placeholder='Masukkan perihal'
              {...formHook.register('ld_bi_erp_regard')}
              error={!!formHook.formState.errors.ld_bi_erp_regard}
              helperText={formHook.formState.errors.ld_bi_erp_regard?.message}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <Controller
              name='ld_bi_erp_date'
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
                        error={!!formHook.formState.errors.ld_bi_erp_date}
                        helperText={formHook.formState.errors.ld_bi_erp_date?.message}
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
              Rekap Bantuan PSBI
            </Typography>
          </Grid>
          <Grid item sm={12} md={4}>
            <CustomTextField
              fullWidth
              label='Nomor'
              autoComplete='off'
              placeholder='Masukkan nomor'
              {...formHook.register('fund_recap_number')}
              error={!!formHook.formState.errors.fund_recap_number}
              helperText={formHook.formState.errors.fund_recap_number?.message}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <CustomTextField
              fullWidth
              label='Perihal'
              autoComplete='off'
              placeholder='Masukkan perihal'
              {...formHook.register('fund_recap_regard')}
              error={!!formHook.formState.errors.fund_recap_regard}
              helperText={formHook.formState.errors.fund_recap_regard?.message}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <Controller
              name='fund_recap_date'
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
                        error={!!formHook.formState.errors.fund_recap_date}
                        helperText={formHook.formState.errors.fund_recap_date?.message}
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
              Kelengkapan Berkas Pembayaran
            </Typography>
          </Grid>

          <Grid item sm={12} md={4}>
            <Controller
              control={formHook.control}
              name='invoice'
              render={({ field }) => (
                <FormControlLabel
                  label='Invoice'
                  labelPlacement='end'
                  control={<Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} />}
                />
              )}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <Controller
              control={formHook.control}
              name='non_pkp_tax_invoice'
              render={({ field }) => (
                <FormControlLabel
                  label='Surat Pernyataan Non-PKP/Faktur Pajak'
                  labelPlacement='end'
                  control={<Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} />}
                />
              )}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <Controller
              control={formHook.control}
              name='account_appointment_letter'
              render={({ field }) => (
                <FormControlLabel
                  label='Surat Penunjukan Rekening'
                  labelPlacement='end'
                  control={<Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} />}
                />
              )}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <Controller
              control={formHook.control}
              name='saving_book'
              render={({ field }) => (
                <FormControlLabel
                  label='Foto Buku Tabungan'
                  labelPlacement='end'
                  control={<Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} />}
                />
              )}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <Controller
              control={formHook.control}
              name='npwp'
              render={({ field }) => (
                <FormControlLabel
                  label='NPWP Penunjukan Rekening'
                  labelPlacement='end'
                  control={<Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} />}
                />
              )}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <Controller
              control={formHook.control}
              name='ktp'
              render={({ field }) => (
                <FormControlLabel
                  label='KTP'
                  labelPlacement='end'
                  control={<Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} />}
                />
              )}
            />
          </Grid>
        </Grid>
      </>
    )
  }
}
