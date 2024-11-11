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
import CreateOrEditFormSurvey, {
  defaultValuesFormSurvey,
  formSchemaSurvey
} from '@/@core/components/forms/CreateOrEditFormSurvey'
import {
  ApplicantFormSurveyDataType,
  ApplicantOwnershipStatusEnum,
  ApplicantRequestedFundEnum,
  ApplicantSourceOfFundEnum
} from '@/types/applicantTypes'

export default function Page({ params }: { params: { id: string } }) {
  // Hooks
  const { data: applicant, isFetching, isPending } = useFetchDetailApplicant(params.id)
  const { mutate: update, isPending: isUpdating } = useUpdateApplicant()
  const formHook = useForm<ApplicantFormSurveyDataType>({
    resolver: zodResolver(formSchemaSurvey),
    defaultValues: defaultValuesFormSurvey
  })

  useMemo(() => {
    if (applicant && !isFetching && !isPending) {
      formHook.reset({
        name: applicant.name || '',
        activity_name: applicant.activity_name || '',
        province: applicant.province || '',
        city: applicant.city || '',
        subdistrict: applicant.subdistrict || '',
        village: applicant.village || '',
        address: applicant.address || '',
        contact: applicant.contact || '',
        institution_type: applicant.institution_type || [],
        other_institution_education_type: applicant.other_institution_education_type || '',
        other_institution_religion_type: applicant.other_institution_religion_type || '',
        other_institution_type: applicant.other_institution_type || '',
        psbi_scope: applicant.psbi_scope || [],
        year_founded: applicant.year_founded || 0,
        ownership_status: applicant.ownership_status || ApplicantOwnershipStatusEnum.BADAN_USAHA,
        have_committee: applicant.have_committee || false,
        carried_out_activities: applicant.carried_out_activities || '',
        number_of_members: applicant.number_of_members || 0,
        number_of_committee: applicant.number_of_committee || 0,
        source_of_fund: applicant.source_of_fund || ApplicantSourceOfFundEnum.IURAN,
        other_source_of_fund: applicant.other_source_of_fund || '',
        requested_fund: applicant.requested_fund || ApplicantRequestedFundEnum.SARANA_PRASARANA,
        requested_fund_priority: applicant.requested_fund_priority || '',
        activity_goals: applicant.activity_goals || '',
        number_of_beneficiaries: applicant.number_of_beneficiaries || 0,
        required_funds: applicant.required_funds || 0,
        required_funds_has_been_obtained_from: applicant.required_funds_has_been_obtained_from || [],
        is_approved_by_surveyor: applicant.is_approved_by_surveyor || false
      })
    }
  }, [applicant, isFetching, isPending, formHook])

  const onSubmit = (body: any) => {
    console.log(body)
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
      loading: 'Mengirim data formulir survey...',
      success: 'Formulir survey berhasil dikirim',
      error: 'Terjadi kesalahan'
    })
  }

  return (
    <Card component='form' onSubmit={formHook.handleSubmit(onSubmit)}>
      <CardHeader title='Form Survey' subheader={`Form Survey untuk Pemohon ${params.id}`} />
      <Divider sx={{ m: '0 !important' }} />
      <CardContent>
        <FormProvider {...formHook}>
          <CreateOrEditFormSurvey isLoading={isFetching || isPending} applicant={applicant} />
        </FormProvider>
      </CardContent>
      <Divider sx={{ m: '0 !important' }} />
      <CardActions sx={{ justifyContent: 'end' }}>
        <LoadingButton loading={isUpdating} type='submit' variant='contained' color='primary'>
          Simpan
        </LoadingButton>
        <Button variant='tonal' color='secondary' href={`/pemohon-bantuan/${params.id}/survey`}>
          Kembali
        </Button>
      </CardActions>
    </Card>
  )
}
