// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'

const verticalMenuData = (data: any): VerticalMenuDataType[] => {
  const baseMenu = [
    {
      label: 'Home',
      href: '/home',
      icon: 'tabler-smart-home'
    },
    {
      label: 'Pemohon Bantuan',
      href: '/pemohon-bantuan',
      icon: 'tabler-info-circle'
    }
  ]

  if (data?.data.role === 'ADMIN') {
    baseMenu.push({
      label: 'Pengguna',
      href: '/pengguna',
      icon: 'tabler-users'
    })
  }

  return baseMenu
}

export default verticalMenuData
