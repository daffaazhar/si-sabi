'use client'

// ** Next & React Imports
import { useRef } from 'react'

// ** MUI Component Inports
import { TextFieldProps, Typography } from '@mui/material'

// ** Custom Component Imports
import CustomTextField from './TextField'

// ** Third Party Imports
import { Controller, useFormContext } from 'react-hook-form'

const decimalSeparator = ','

export function convertViewNumberToCountableNumber(value?: number | string) {
  let newValue = value !== undefined && value !== null ? `${value}` : '0'
  newValue = newValue.replace('.', '').replace(',', '.').trim()

  return Number(newValue)
}

interface Props {
  hookFormName: string
  control: any
  formatedOptions?: {
    prefix?: string
    suffix?: string
  }
  textFieldProps?: TextFieldProps
  thousandsSeparator?: string
  maxDigitsAfterComma?: number
  disabled?: boolean
}
export default function FormattedNumberTextField(props: Props) {
  // ** Env Variables
  const {
    hookFormName,
    control,
    textFieldProps,
    formatedOptions,
    thousandsSeparator = '.',
    maxDigitsAfterComma = 2,
    disabled
  } = props
  const inputRef = useRef<HTMLInputElement>(null)

  // // ** Form Hooks
  // const formHook = useFormContext()

  // ** Format Number
  const formatNumberWithDotsAndComma = (num: string) => {
    if (!num) return ''
    if (num.includes(decimalSeparator)) {
      const [integerPart, decimalPart] = num.split(decimalSeparator)
      const formattedInteger = integerPart.replace(/^0+(?!$)/, '').replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator)
      const limitedDecimalPart = decimalPart ? decimalPart.slice(0, maxDigitsAfterComma) : ''

      return `${formattedInteger},${limitedDecimalPart}`
    } else return num.replace(/^0+(?!$)/, '').replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator)
  }

  // ** Function to calculate the new caret position
  const calculateCaretPosition = (
    rawValue: string,
    formattedValue: string,
    caretPosition: number,
    oldValue: string
  ) => {
    let newCaretPosition = caretPosition

    // Adjust for added or removed dots
    const dotsBeforeCaret = (formattedValue.slice(0, caretPosition).match(/\./g) || []).length
    const oldDotsBeforeCaret = (oldValue.slice(0, caretPosition).match(/\./g) || []).length

    newCaretPosition += dotsBeforeCaret - oldDotsBeforeCaret

    return newCaretPosition
  }

  return (
    <Controller
      name={hookFormName}
      control={control}
      render={({ field, fieldState }) => (
        <CustomTextField
          ref={inputRef}
          error={!!fieldState.error}
          helperText={fieldState.error?.message ?? undefined}
          autoComplete='off'
          {...textFieldProps}
          value={formatNumberWithDotsAndComma(!!field.value ? `${field.value}` : '')}
          onChange={e => {
            let newValue = e.target.value ?? ''
            const caretPosition = e.target.selectionStart
            const oldValue = formatNumberWithDotsAndComma(!!field.value ? `${field.value}` : '')
            newValue = newValue.replace(/[^\d,]/g, '')

            if (newValue.split(decimalSeparator).length > 2)
              newValue = newValue.substring(0, newValue.lastIndexOf(decimalSeparator))

            field.onChange(newValue)

            const formattedValue = formatNumberWithDotsAndComma(newValue)

            const newCaretPosition = calculateCaretPosition(newValue, formattedValue, caretPosition ?? 0, oldValue)

            setTimeout(() => {
              if (inputRef.current) inputRef.current.setSelectionRange(newCaretPosition, newCaretPosition)
            }, 0)
          }}
          disabled={!!disabled ? disabled : false}
          fullWidth
          InputProps={{
            startAdornment: formatedOptions?.prefix ? (
              <Typography mr={2}>{formatedOptions?.prefix}</Typography>
            ) : undefined,
            endAdornment: formatedOptions?.suffix ? (
              <Typography ml={2}>{formatedOptions?.suffix}</Typography>
            ) : undefined
          }}
          sx={{ ...textFieldProps?.sx }}
        />
      )}
    />
  )
}
