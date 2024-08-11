// ** React Imports
import { useState, type MouseEvent, ReactNode } from 'react'

// ** MUI Imports
import { Menu, MenuItem, SxProps } from '@mui/material'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from '@core/components/icon'

export type RowOptionMenuItemProps = {
  onClick?: () => void
  icon?: string
  iconElement?: ReactNode
  label: string
  sx?: SxProps
  show?: boolean
}

type RowOptionProps = {
  menuItems?: RowOptionMenuItemProps[]
}

const RowOptions = (props: RowOptionProps) => {
  const { menuItems = [] } = props

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='tabler:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        {menuItems.map((item, index) =>
          item?.show === false ? null : (
            <MenuItem
              key={`@core-components-datagrid-rowoptions-menuitems-${index}`}
              onClick={() => {
                if (!!item.onClick) item.onClick()
                handleRowOptionsClose()
              }}
              sx={{ '& svg': { mr: 2 }, ...item.sx }}
            >
              {!!item.iconElement ? item.iconElement : <Icon icon={item.icon ?? 'tabler:edit'} fontSize={20} />}
              {item.label}
            </MenuItem>
          )
        )}
        {/* <MenuItem onClick={handleEditClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:edit' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteClose} sx={{ '& svg': { mr: 2 }, color: theme.palette.error.main }}>
          <Icon icon='tabler:trash' fontSize={20} />
          Delete
        </MenuItem> */}
      </Menu>
    </>
  )
}

export default RowOptions
