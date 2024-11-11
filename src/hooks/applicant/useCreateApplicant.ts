import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { ApplicantType } from '@/types/applicantTypes'

export const useCreateApplicant = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      try {
        const formData = new FormData()

        Object.keys(data).forEach(key => {
          if (Array.isArray(data[key])) {
            data[key].forEach((value: any, index: number) => {
              formData.append(`${key}[${index}]`, value)
            })
          } else if (
            (key === 'survey_photo_1' || key === 'survey_photo_2' || key === 'survey_photo_3') &&
            data[key]?.[0]
          ) {
            formData.append(key, data[key][0])
          } else {
            formData.append(key, data[key])
          }
        })

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/applicants`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

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
