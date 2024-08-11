import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { UserType } from '@/types/userTypes'

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: UserType) => {
      try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${body.id}`, body)

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
