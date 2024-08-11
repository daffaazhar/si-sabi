// ** React & Next Imports
import { ReactNode } from 'react'

// ** MUI Component Imports
import { Box, SxProps, Tooltip, Typography, TypographyProps } from '@mui/material'

interface DefaultRenderedCellProps {
  text?: string
  innerComponent?: ReactNode
  textVariant?: TypographyProps['variant']
  textSx?: SxProps
  innerComponentSx?: SxProps
}
export default function DefaultRenderedCell(props: DefaultRenderedCellProps) {
  const { text, innerComponent, textVariant, textSx, innerComponentSx } = props

  if (!!innerComponent) return <Box sx={{ py: 2, height: '100%', width: '100%', ...innerComponentSx }}>{innerComponent}</Box>

  return (
    <Box sx={{ py: 2, overflowX: 'hidden', height: '100%' }}>
      <Tooltip
        title={
          <Typography fontSize={10} color={'inherit'}>
            {text}
          </Typography>
        }
        followCursor
        placement='right-start'
      >
        <Typography
          noWrap
          variant={textVariant ?? 'body2'}
          sx={{
            fontWeight: 500,
            textDecoration: 'none',
            color: 'text.secondary',
            overflow: 'hidden',
            ...textSx
          }}
        >
          {text}
        </Typography>
      </Tooltip>
    </Box>
  )
}
