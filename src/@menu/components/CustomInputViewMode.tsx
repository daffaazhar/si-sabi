// ** Next & React Imports
import { ReactNode } from 'react'

// ** MUI Component Imports
import { Box, SxProps, Typography } from '@mui/material'

interface CustomInputViewModeProps {
  label: string
  value?: string | null
  valueComponent?: ReactNode
  valueSx?: SxProps
}
export default function CustomInputViewMode(props: CustomInputViewModeProps) {
  const { label, value, valueComponent, valueSx } = props

  return (
    <Box>
      <Typography variant='body2'>{label}</Typography>
      {valueComponent ?? (
        <Typography sx={{ pl: 1, ...valueSx }}>{!!value && value.trim().length > 0 ? value : '-'}</Typography>
      )}
    </Box>
  )
}
