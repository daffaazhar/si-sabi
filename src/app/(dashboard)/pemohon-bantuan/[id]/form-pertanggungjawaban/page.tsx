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
import CreateOrEditFormPertanggungjawaban, {
  defaultValuesFormPertanggungjawaban,
  formSchemaPertanggungjawaban
} from '@/@core/components/forms/CreateOrEditFormPertanggungjawaban'
import { ApplicantFormPertanggungjawabanDataType } from '@/types/applicantTypes'

export default function Page({ params }: { params: { id: string } }) {
  // Hooks
  const { data: applicant, isFetching, isPending } = useFetchDetailApplicant(params.id)
  const { mutate: update, isPending: isUpdating } = useUpdateApplicant()
  const formHook = useForm<ApplicantFormPertanggungjawabanDataType>({
    resolver: zodResolver(formSchemaPertanggungjawaban),
    defaultValues: defaultValuesFormPertanggungjawaban
  })

  useMemo(() => {
    if (applicant && !isFetching && !isPending) {
      formHook.reset({
        bast: applicant.bast,
        statement_letter: applicant.statement_letter,
        usage_report: applicant.usage_report
      })
    }
  }, [applicant, isFetching, isPending, formHook])

  const onSubmit = (body: any) => {
    const mutationPromise = new Promise((resolve, reject) => {
      update(
        {
          id: params.id,
          ...body
        },
        {
          onSuccess: data => resolve(data),
          onError: error => reject(error)
        }
      )
    })
    toast.promise(mutationPromise, {
      loading: 'Mengirim data formulir pertanggungjawaban...',
      success: 'Formulir pertanggungjawaban berhasil dikirim',
      error: 'Terjadi kesalahan'
    })
  }

  return (
    <Card component='form' onSubmit={formHook.handleSubmit(onSubmit)}>
      <CardHeader title='Form Pertanggungjawaban' subheader={`Form Pertanggungjawaban untuk Pemohon ${params.id}`} />
      <Divider sx={{ m: '0 !important' }} />
      <CardContent>
        <FormProvider {...formHook}>
          <CreateOrEditFormPertanggungjawaban isLoading={isFetching || isPending} applicant={applicant} />
        </FormProvider>
      </CardContent>
      <Divider sx={{ m: '0 !important' }} />
      <CardActions sx={{ justifyContent: 'end' }}>
        <LoadingButton loading={isUpdating} type='submit' variant='contained' color='primary'>
          Simpan
        </LoadingButton>
        <Button variant='tonal' color='secondary' href={`/pemohon-bantuan/${params.id}/pertanggungjawaban`}>
          Kembali
        </Button>
      </CardActions>
    </Card>
  )
}
