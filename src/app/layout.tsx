// Third-party Imports
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'react-hot-toast'
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { ChildrenType } from '@core/types'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

// Config Imports
import primaryColorConfig from '@/configs/primaryColorConfig'

export const metadata = {
  title: 'SI-SABI - System Information Social Program of Bank Indonesia',
  description: 'SI-SABI - System Information Social Program of Bank Indonesia.'
}

const RootLayout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'

  return (
    <html id='__next' lang='en' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <NextTopLoader showSpinner={false} color={primaryColorConfig[0].main} />
        {children}
        <Toaster />
      </body>
    </html>
  )
}

export default RootLayout
