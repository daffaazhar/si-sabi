// React Imports
import React from 'react'

// MUI Imports
import { Box, Checkbox, CircularProgress, FormControlLabel, Grid } from '@mui/material'

// Third Party Imports
import * as z from 'zod'
import { Controller, useFormContext } from 'react-hook-form'

// Type Imports
import { ApplicantFormPertanggungjawabanDataType, ApplicantType } from '@/types/applicantTypes'

export const defaultValuesFormPertanggungjawaban = {
  bast: false,
  statement_letter: false,
  usage_report: false
} as ApplicantFormPertanggungjawabanDataType

export const formSchemaPertanggungjawaban = z.object({
  bast: z.boolean().optional(),
  statement_letter: z.boolean().optional(),
  usage_report: z.boolean().optional()
})

export default function CreateOrEditFormPertanggungjawaban({
  isLoading,
  applicant
}: {
  isLoading: boolean
  applicant: ApplicantType
}) {
  // ** Hooks
  const formHook = useFormContext<ApplicantFormPertanggungjawabanDataType>()

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  } else {
    return (
      <Grid container spacing={4}>
        {applicant?.fund_nominal > 0 && (
          <Grid item sm={12} md={4}>
            <Controller
              control={formHook.control}
              name='bast'
              render={({ field }) => (
                <FormControlLabel
                  label='BAST'
                  labelPlacement='end'
                  control={<Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} />}
                />
              )}
            />
          </Grid>
        )}
        {applicant?.fund_nominal > 25000000 && (
          <Grid item sm={12} md={4}>
            <Controller
              control={formHook.control}
              name='statement_letter'
              render={({ field }) => (
                <FormControlLabel
                  label='Surat Pernyataan'
                  labelPlacement='end'
                  control={<Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} />}
                />
              )}
            />
          </Grid>
        )}
        {applicant?.fund_nominal > 50000000 && (
          <Grid item sm={12} md={4}>
            <Controller
              control={formHook.control}
              name='usage_report'
              render={({ field }) => (
                <FormControlLabel
                  label='Laporan Penggunaan Bantuan'
                  labelPlacement='end'
                  control={<Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} />}
                />
              )}
            />
          </Grid>
        )}
      </Grid>
    )
  }
}
