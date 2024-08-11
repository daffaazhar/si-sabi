import { useRouter } from 'next/navigation'

import { setCookie } from 'cookies-next'

import axios from 'axios'
import { useMutation } from '@tanstack/react-query'

import type { UserType } from '@/types/userTypes'
import toast from 'react-hot-toast'

export const useLogin = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async (body: UserType) => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, body)

        if (response.status === 200) {
          return response
        }
      } catch (e: any) {
        if (e.response.status === 401 || e.response.status === 404) {
          throw new Error('Email atau password salah')
        } else {
          throw new Error('Terjadi kesalahan')
        }
      }
    },
    onSuccess: data => {
      setCookie('token', data?.data.token, { maxAge: 3600 * 24 })
      router.push('/home')
    },
    onError: (error: Error) => {
      toast.error(error.message)
      console.error(error)
    }
  })
}
