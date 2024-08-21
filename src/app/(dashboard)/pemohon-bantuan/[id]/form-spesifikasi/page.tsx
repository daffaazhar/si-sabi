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
import CreateOrEditFormSpesifikasi, {
  defaultValuesFormSpesifikasi,
  formSchemaSpesifikasi
} from '@/@core/components/forms/CreateOrEditFormSpesifikasi'
import { ApplicantFormSpesifikasiDataType } from '@/types/applicantTypes'

export default function Page({ params }: { params: { id: string } }) {
  // Hooks
  const { data: applicant, isFetching, isPending } = useFetchDetailApplicant(params.id)
  const { mutate: update, isPending: isUpdating } = useUpdateApplicant()
  const formHook = useForm<ApplicantFormSpesifikasiDataType>({
    resolver: zodResolver(formSchemaSpesifikasi),
    defaultValues: defaultValuesFormSpesifikasi
  })

  useMemo(() => {
    if (applicant && !isFetching && !isPending) {
      formHook.reset({
        specification_memo_number: applicant.specification_memo_number || '',
        specification_memo_regard: applicant.specification_memo_regard || '',
        specification_memo_date: applicant.specification_memo_date ? new Date(applicant.specification_memo_date) : null,
        specification_writed_by: applicant.specification_writed_by || '',
        specification_prepared_by: applicant.specification_prepared_by || '',
        specification_checked_by: applicant.specification_checked_by || '',
        specification_supported_by: applicant.specification_supported_by || '',
        specification_approved_by: applicant.specification_approved_by || '',
        vendor:
          applicant.vendor?.map((v: any) => ({
            ...v,
            letter_date: v.letter_date ? new Date(v.letter_date) : null
          })) || [],
        spk:
          applicant.spk?.map((s: any) => ({
            ...s,
            date: s.date ? new Date(s.date) : null
          })) || [],
        notification_letter_number: applicant.notification_letter_number || '',
        notification_letter_date: applicant.notification_letter_date
          ? new Date(applicant.notification_letter_date)
          : null,
        notification_letter_signatory: applicant.notification_letter_signatory || '',
        fund_nominal: applicant.fund_nominal || 0
      })
    }
  }, [applicant, isFetching, isPending, formHook])

  const onSubmit = (body: any) => {
    const mutationPromise = new Promise((resolve, reject) => {
      update(
        {
          id: params.id,
          specification_memo_date: !!body.specification_memo_date
            ? new Date(body.specification_memo_date).toISOString()
            : null,
          vendor: body.vendor.map((v: any) => ({
            ...v,
            letter_date: v.letter_date ? new Date(v.letter_date).toISOString() : null
          })),
          spk: body.spk.map((s: any) => ({
            ...s,
            date: s.date ? new Date(s.date).toISOString() : null
          })),
          ...body
        },
        {
          onSuccess: data => resolve(data),
          onError: error => reject(error)
        }
      )
    })
    toast.promise(mutationPromise, {
      loading: 'Mengirim data formulir spesifikasi...',
      success: 'Formulir spesifikasi berhasil dikirim',
      error: 'Terjadi kesalahan'
    })
  }

  return (
    <Card component='form' onSubmit={formHook.handleSubmit(onSubmit)}>
      <CardHeader title='Form Spesifikasi' subheader={`Form Spesifikasi untuk Pemohon ${params.id}`} />
      <Divider sx={{ m: '0 !important' }} />
      <CardContent>
        <FormProvider {...formHook}>
          <CreateOrEditFormSpesifikasi isLoading={isFetching || isPending} />
        </FormProvider>
      </CardContent>
      <Divider sx={{ m: '0 !important' }} />
      <CardActions sx={{ justifyContent: 'end' }}>
        <LoadingButton loading={isUpdating} type='submit' variant='contained' color='primary'>
          Simpan
        </LoadingButton>
        <Button variant='tonal' color='secondary' href={`/pemohon-bantuan/${params.id}/spesifikasi`}>
          Kembali
        </Button>
      </CardActions>
    </Card>
  )
}
