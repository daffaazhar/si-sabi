import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useApproveApplicant = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/applicants/${id}/approve`)

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
