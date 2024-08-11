import { useQuery } from '@tanstack/react-query'

import axios from '@/services/ApiService'

export const useFetchApplicant = (skip: number, take: number, search: string) => {
  return useQuery({
    queryFn: async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/applicants`, {
          params: { skip, take, search }
        })

        if (response.status === 200) {
          return response.data
        }
      } catch (e: any) {
        if (e.response.status === 401) {
          throw new Error('Silakan login terlebih dahulu!')
        } else if (e.response.status === 403) {
          throw new Error('Anda tidak memiliki akses terhadap resource ini')
        } else {
          throw new Error('Terjadi kesalahan')
        }
      }
    },
    queryKey: ['applicants']
  })
}
