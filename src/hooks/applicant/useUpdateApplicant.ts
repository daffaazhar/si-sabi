import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateApplicant = () => {
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
            data[key] &&
            data[key][0]
          ) {
            formData.append(key, data[key][0])
          } else if (data[key] !== undefined && data[key] !== null) {
            formData.append(key, data[key])
          }
        })

        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/applicants/${formData.get('id')}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )

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
