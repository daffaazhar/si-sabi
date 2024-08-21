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
import CreateOrEditFormPencairan, {
  defaultValuesFormPencairan,
  formSchemaPencairan
} from '@/@core/components/forms/CreateOrEditFormPencairan'
import { ApplicantFormPencairanDataType } from '@/types/applicantTypes'

export default function Page({ params }: { params: { id: string } }) {
  // Hooks
  const { data: applicant, isFetching, isPending } = useFetchDetailApplicant(params.id)
  const { mutate: update, isPending: isUpdating } = useUpdateApplicant()
  const formHook = useForm<ApplicantFormPencairanDataType>({
    resolver: zodResolver(formSchemaPencairan),
    defaultValues: defaultValuesFormPencairan
  })

  useMemo(() => {
    if (applicant && !isFetching && !isPending) {
      formHook.reset({
        liquefaction_memo_number: applicant.liquefaction_memo_number || '',
        liquefaction_memo_regard: applicant.liquefaction_memo_regard || '',
        liquefaction_memo_date: applicant.liquefaction_memo_date ? new Date(applicant.liquefaction_memo_date) : null,
        liquefaction_writed_by: applicant.liquefaction_writed_by || '',
        liquefaction_prepared_by: applicant.liquefaction_prepared_by || '',
        liquefaction_checked_by: applicant.liquefaction_checked_by || '',
        liquefaction_supported_by: applicant.liquefaction_supported_by || '',
        liquefaction_approved_by: applicant.liquefaction_approved_by || '',
        ld_bi_erp_number: applicant.ld_bi_erp_number || '',
        ld_bi_erp_date: applicant.ld_bi_erp_date ? new Date(applicant.ld_bi_erp_date) : null,
        ld_bi_erp_regard: applicant.ld_bi_erp_regard || '',
        fund_recap_number: applicant.fund_recap_number || '',
        fund_recap_date: applicant.fund_recap_date ? new Date(applicant.fund_recap_date) : null,
        fund_recap_regard: applicant.fund_recap_regard || '',
        invoice: applicant.invoice,
        non_pkp_tax_invoice: applicant.non_pkp_tax_invoice,
        account_appointment_letter: applicant.account_appointment_letter,
        saving_book: applicant.saving_book,
        npwp: applicant.npwp,
        ktp: applicant.ktp
      })
    }
  }, [applicant, isFetching, isPending, formHook])

  const onSubmit = (body: any) => {
    const mutationPromise = new Promise((resolve, reject) => {
      update(
        {
          id: params.id,
          liquefaction_memo_date: !!body.liquefaction_memo_date
            ? new Date(body.liquefaction_memo_date).toISOString()
            : undefined,
          ld_bi_erp_date: !!body.ld_bi_erp_date ? new Date(body.ld_bi_erp_date).toISOString() : undefined,
          fund_recap_date: !!body.fund_recap_date ? new Date(body.fund_recap_date).toISOString() : undefined,
          ...body
        },
        {
          onSuccess: data => resolve(data),
          onError: error => reject(error)
        }
      )
    })
    toast.promise(mutationPromise, {
      loading: 'Mengirim data formulir pencairan...',
      success: 'Formulir pencairan berhasil dikirim',
      error: 'Terjadi kesalahan'
    })
  }

  return (
    <Card component='form' onSubmit={formHook.handleSubmit(onSubmit)}>
      <CardHeader title='Form Pencairan' subheader={`Form Pencairan untuk Pemohon ${params.id}`} />
      <Divider sx={{ m: '0 !important' }} />
      <CardContent>
        <FormProvider {...formHook}>
          <CreateOrEditFormPencairan isLoading={isFetching || isPending} />
        </FormProvider>
      </CardContent>
      <Divider sx={{ m: '0 !important' }} />
      <CardActions sx={{ justifyContent: 'end' }}>
        <LoadingButton loading={isUpdating} type='submit' variant='contained' color='primary'>
          Simpan
        </LoadingButton>
        <Button variant='tonal' color='secondary' href={`/pemohon-bantuan/${params.id}/pencairan`}>
          Kembali
        </Button>
      </CardActions>
    </Card>
  )
}
