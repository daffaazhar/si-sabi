'use client'

// React & Next Imports
import { useMemo } from 'react'

// MUI Imports
import { Button, Card, CardActions, CardContent, CardHeader, Divider } from '@mui/material'

// Third Party Imports
import toast from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

// Hook Imports
import { useUpdateApplicant } from '@/hooks/applicant/useUpdateApplicant'
import { useFetchDetailApplicant } from '@/hooks/applicant/useFetchDetailApplicant'
import { LoadingButton } from '@mui/lab'
import CreateOrEditFormPrinsip, {
  defaultValuesFormPrinsip,
  formSchemaPrinsip
} from '@/@core/components/forms/CreateOrEditFormPrinsip'
import { ApplicantFormPrinsipDataType, PsbiClassificationEnum, PsbiProposedFundEnum } from '@/types/applicantTypes'

export default function Page({ params }: { params: { id: string } }) {
  // Hooks
  const { data: applicant, isFetching, isPending } = useFetchDetailApplicant(params.id)
  const { mutate: update, isPending: isUpdating } = useUpdateApplicant()
  const formHook = useForm<ApplicantFormPrinsipDataType>({
    resolver: zodResolver(formSchemaPrinsip),
    defaultValues: defaultValuesFormPrinsip
  })

  useMemo(() => {
    if (applicant && !isFetching && !isPending) {
      formHook.reset({
        principle_memo_number: applicant.principle_memo_number || '',
        principle_memo_regard: applicant.principle_memo_regard || '',
        principle_memo_date: applicant.principle_memo_date ? new Date(applicant.principle_memo_date) : null,
        principle_writed_by: applicant.principle_writed_by || '',
        principle_prepared_by: applicant.principle_prepared_by || '',
        principle_checked_by: applicant.principle_checked_by || '',
        principle_supported_by: applicant.principle_supported_by || '',
        principle_approved_by: applicant.principle_approved_by || '',
        psbi_classification: applicant.psbi_classification || PsbiClassificationEnum.PEP,
        proposed_fund: applicant.proposed_fund || PsbiProposedFundEnum.DANA,
        proposed_fund_item: applicant.proposed_fund_item || [],
        proposed_fund_construction: applicant.proposed_fund_construction || [],
        proposed_fund_nominal: applicant.proposed_fund_nominal || 0
      })
    }
  }, [applicant, isFetching, isPending, formHook])

  const onSubmit = (body: any) => {
    const mutationPromise = new Promise((resolve, reject) => {
      update(
        {
          id: params.id,
          principle_memo_date: new Date(body.principle_memo_date).toISOString(),
          ...body
        },
        {
          onSuccess: data => resolve(data),
          onError: error => reject(error)
        }
      )
    })
    toast.promise(mutationPromise, {
      loading: 'Mengirim data formulir prinsip...',
      success: 'Formulir prinsip berhasil dikirim',
      error: 'Terjadi kesalahan'
    })
  }

  return (
    <Card component='form' onSubmit={formHook.handleSubmit(onSubmit)}>
      <CardHeader title='Form Prinsip' subheader={`Form Prinsip untuk Pemohon ${params.id}`} />
      <Divider sx={{ m: '0 !important' }} />
      <CardContent>
        <FormProvider {...formHook}>
          <CreateOrEditFormPrinsip isLoading={isFetching || isPending} />
        </FormProvider>
      </CardContent>
      <Divider sx={{ m: '0 !important' }} />
      <CardActions sx={{ justifyContent: 'end' }}>
        <LoadingButton loading={isUpdating} type='submit' variant='contained' color='primary'>
          Simpan
        </LoadingButton>
        <Button variant='tonal' color='secondary' href={`/pemohon-bantuan/${params.id}/prinsip`}>
          Kembali
        </Button>
      </CardActions>
    </Card>
  )
}
