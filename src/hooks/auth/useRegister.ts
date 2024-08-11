import { useRouter } from 'next/navigation'

import { setCookie } from 'cookies-next'

import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { UserType } from '@/types/userTypes'

export const useRegister = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: UserType) => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, body)

        if (response.status === 201) {
          return response
        }
      } catch (e: any) {
        if (e.response.status === 409) {
          throw new Error('Email telah digunakan')
        } else {
          throw new Error('Terjadi kesalahan')
        }
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
