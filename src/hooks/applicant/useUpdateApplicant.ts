import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ApplicantType } from '@/types/applicantTypes'

export const useUpdateApplicant = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: ApplicantType) => {
      try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/applicants/${body.id}`, body)

        if (response.status === 200) {
          return response.data
        }
      } catch (e: any) {
        throw new Error('Terjadi kesalahan')
      }
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['applicant', data?.data._id] })
    },
    onError: (error: Error) => {
      console.error(error)
    }
  })
}
