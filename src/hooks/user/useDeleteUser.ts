import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`)

        if (response.status === 200) {
          return response
        }
      } catch (e: any) {
        throw new Error('Terjadi kesalahan')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error: Error) => {
      console.error(error)
    }
  })
}
