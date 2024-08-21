'use client'

// React & Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import { Button, Card, CardActions, CardContent, CardHeader, Divider } from '@mui/material'
import { LoadingButton } from '@mui/lab'

// Third Party Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

// Hook Imports
import { useCreateApplicant } from '@/hooks/applicant/useCreateApplicant'

// Custom Component Imports
import CreateOrEditFormSurvey, {
  defaultValuesFormSurvey,
  formSchemaSurvey
} from '@/@core/components/forms/CreateOrEditFormSurvey'

export default function Page() {
  // Env Vars
  const router = useRouter()

  // Hooks
  const { mutate: create, isPending: isCreating } = useCreateApplicant()
  const formHook = useForm({
    resolver: zodResolver(formSchemaSurvey),
    defaultValues: defaultValuesFormSurvey
  })

  const onSubmit = (data: any) => {
    const mutationPromise = new Promise((resolve, reject) => {
      create(data, {
        onSuccess: data => resolve(data),
        onError: error => reject(error)
      })
    })
    toast.promise(mutationPromise, {
      loading: 'Menyimpan data pemohon...',
      success: 'Data pemohon berhasil disimpan!',
      error: 'Terjadi kesalahan'
    })
    formHook.reset()

    mutationPromise.then(() => {
      setTimeout(() => {
        router.push('/pemohon-bantuan')
      }, 1000)
    })
  }

  return (
    <Card component='form' onSubmit={formHook.handleSubmit(onSubmit)}>
      <CardHeader title='Form Survey' subheader={'Isi form survey berikut untuk menambahkan pemohon'} />
      <Divider sx={{ m: '0 !important' }} />
      <CardContent>
        <FormProvider {...formHook}>
          <CreateOrEditFormSurvey />
        </FormProvider>
      </CardContent>
      <Divider sx={{ m: '0 !important' }} />
      <CardActions sx={{ justifyContent: 'end' }}>
        <LoadingButton loading={isCreating} type='submit' variant='contained' color='primary'>
          Simpan
        </LoadingButton>
        <Button variant='tonal' color='secondary' href='/pemohon-bantuan'>
          Kembali
        </Button>
      </CardActions>
    </Card>
  )
}
