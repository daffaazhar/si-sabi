// ** React Imports
import { forwardRef } from 'react'

// ** MUI Component Imports
import { TextFieldProps } from '@mui/material'

// ** Custom Component Import
import CustomTextField from '@/@core/components/mui/TextField'

interface PickerInputProps {
  label?: string
  readOnly?: boolean
  customtextfieldprops?: TextFieldProps
}

const PickerInput = forwardRef(({ ...props }: PickerInputProps, ref) => {
  // ** Props
  const { label, readOnly } = props

  return (
    <CustomTextField
      {...props}
      inputRef={ref}
      {...props.customtextfieldprops}
      label={label || ''}
      {...(readOnly && { inputProps: { readOnly: true } })}
    />
  )
})

export default PickerInput
