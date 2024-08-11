'use client'

// MUI Imports
import { Badge, IconButton } from '@mui/material'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import NavToggle from './NavToggle'
import NavSearch from '@components/layout/shared/search'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const NavbarContent = () => {
  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}>
      <div className='flex items-center gap-4'>
        <NavToggle />
        <NavSearch />
      </div>
      <div className='flex items-center'>
        <ModeDropdown />
        <IconButton className='text-textPrimary'>
          <Badge
            color='error'
            className='cursor-pointer'
            variant='dot'
            overlap='circular'
            sx={{
              '& .MuiBadge-dot': { top: 6, right: 5, boxShadow: 'var(--mui-palette-background-paper) 0px 0px 0px 2px' }
            }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <i className='tabler-bell' />
          </Badge>
        </IconButton>
        <UserDropdown />
      </div>
    </div>
  )
}

export default NavbarContent
