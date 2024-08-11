import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { ApplicantType } from '@/types/applicantTypes'

export const useCreateApplicant = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: ApplicantType) => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/applicants`, body)

        if (response.status === 201) {
          return response
        }
      } catch (e: any) {
        throw new Error('Terjadi kesalahan')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applicants'] })
    },
    onError: (error: Error) => {
      console.error(error)
    }
  })
}
